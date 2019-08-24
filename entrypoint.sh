#!/bin/sh

set -e

# check values
if [ -z "${GITHUB_TOKEN}" ]; then
    echo "error: not found GITHUB_TOKEN"
    exit 1
fi

if [ -z "${PUBLISH_BRANCH}" ]; then
    echo "error: not found PUBLISH_BRANCH"
    exit 1
fi

if [ -z "${PUBLISH_DIR}" ]; then
    echo "error: not found PUBLISH_DIR"
    exit 1
fi

remote_repo="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_branch="${PUBLISH_BRANCH}"

local_dir="$(cat /dev/urandom | tr -cd 'a-f0-9' | head -c 32)"
if git clone --single-branch --branch "${remote_branch}" "${remote_repo}" "${local_dir}"; then
    cd "${local_dir}"
    git rm -r '*'
    cp -rf "${PUBLISH_DIR}"/* "${PUBLISH_DIR}"/.* .
else
    cd "${PUBLISH_DIR}"
    git init
    git remote add origin "${remote_repo}"
    git checkout --orphan "${remote_branch}"
fi

# push to publishing branch
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add --all
git commit -m "Automated deployment: $(date -u) ${GITHUB_SHA}"
git push origin "${remote_branch}" --force
