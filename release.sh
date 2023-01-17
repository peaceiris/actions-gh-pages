#!/usr/bin/env bash

# fail on unset variables and command errors
set -eu -o pipefail # -x: is for debugging

DEFAULT_BRANCH="main"

CURRENT_BRANCH="$(git branch --show-current)"
if [ "${CURRENT_BRANCH}" != "${DEFAULT_BRANCH}" ]; then
  echo "$0: Current branch ${CURRENT_BRANCH} is not ${DEFAULT_BRANCH}, continue? (y/n)"
  read -r res
  if [ "${res}" = "n" ]; then
    echo "$0: Stop script"
    exit 0
  fi
fi

PRERELEASE_TYPE_LIST="prerelease prepatch preminor premajor"
if [ "${CURRENT_BRANCH}" != "${DEFAULT_BRANCH}" ]; then
  RELEASE_TYPE_LIST="${PRERELEASE_TYPE_LIST}"
else
  RELEASE_TYPE_LIST="${PRERELEASE_TYPE_LIST} patch minor major"
fi

if command -v fzf; then
  RELEASE_TYPE=$(echo "${RELEASE_TYPE_LIST}" | tr ' ' '\n' | fzf --layout=reverse)
else
  select sel in ${RELEASE_TYPE_LIST}; do
    RELEASE_TYPE="${sel}"
    break
  done
fi

echo "$0: Create ${RELEASE_TYPE} release, continue? (y/n)"
read -r res
if [ "${res}" = "n" ]; then
  echo "$0: Stop script"
  exit 0
fi

git fetch origin
if [ "${CURRENT_BRANCH}" != "${DEFAULT_BRANCH}" ]; then
  git pull origin "${CURRENT_BRANCH}"
else
  git pull origin ${DEFAULT_BRANCH}
  git tag -d v3 || true
  git pull origin --tags
fi

npm install

mkdir ./lib
npm run build
git add ./lib/index.js
git commit -m "chore(release): Add build assets"

npm run release -- --release-as "${RELEASE_TYPE}" --preset eslint

git rm ./lib/index.js
rm -rf ./lib
git commit -m "chore(release): Remove build assets [skip ci]"

if [ "${CURRENT_BRANCH}" != "${DEFAULT_BRANCH}" ]; then
  git push origin "${CURRENT_BRANCH}"
else
  git push origin ${DEFAULT_BRANCH}
fi

TAG_NAME="v$(jq -r '.version' ./package.json)"
git push origin "${TAG_NAME}"
