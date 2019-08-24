#!/bin/bash

set -e
# set -ex

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

local_dir="${HOME}/$(tr -cd 'a-f0-9' < /dev/urandom | head -c 32)"
if git clone --depth=1 --single-branch --branch "${remote_branch}" "${remote_repo}" "${local_dir}"; then
    cd "${local_dir}"
    git rm -r '*'
    cp -rf $(find "${GITHUB_WORKSPACE}/${PUBLISH_DIR}" -maxdepth 1 | tail -n +2) "${local_dir}/"
else
    cd "${PUBLISH_DIR}"
    git init
    git checkout --orphan "${remote_branch}"
fi

# push to publishing branch
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote rm origin || true
git remote add origin "${remote_repo}"
git add --all
git commit -m "Automated deployment: $(date -u) ${GITHUB_SHA}"
git push origin "${remote_branch}"
