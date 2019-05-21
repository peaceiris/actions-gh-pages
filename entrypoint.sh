#!/bin/sh

# setup ssh
if [[ -z "${ACTIONS_DEPLOY_KEY}" ]]; then
    echo "error: not found ACTIONS_DEPLOY_KEY"
    exit 1
fi
mkdir /root/.ssh
ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts
echo "${ACTIONS_DEPLOY_KEY}" > /root/.ssh/id_rsa
chmod 400 /root/.ssh/id_rsa

# push to gh-pages branch
if [[ -z "${PUBLISH_DIR}" ]]; then
    echo "error: not found PUBLISH_DIR"
    exit 1
fi
cd ${PUBLISH_DIR}
if [[ -z "${PUBLISH_BRANCH}" ]]; then
    echo "error: not found PUBLISH_BRANCH"
    exit 1
fi
remote_repo="git@github.com:${GITHUB_REPOSITORY}.git"
remote_branch="${PUBLISH_BRANCH}"
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote add origin "${remote_repo}"
git checkout "${remote_branch}" || git checkout --orphan "${remote_branch}"
git add --all
timestamp=$(date -u)
git commit -m "Automated deployment: ${timestamp} ${GITHUB_SHA}"
git push origin "${remote_branch}" --force
