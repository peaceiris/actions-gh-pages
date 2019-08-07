#!/bin/sh

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
cd "${PUBLISH_DIR}" || exit 1

# initialize git
remote_repo="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_branch="${PUBLISH_BRANCH}"
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote add origin "${remote_repo}"

# push to publishing branch
git checkout "${remote_branch}" || git checkout --orphan "${remote_branch}"
git add --all
timestamp=$(date -u)
git commit -m "Automated deployment: ${timestamp} ${GITHUB_SHA}"
git push origin "${remote_branch}" --force
