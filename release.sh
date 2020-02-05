#!/usr/bin/env bash

# fail on unset variables and command errors
set -eu -o pipefail # -x: is for debugging

if [ "$(git branch --show-current)" != "master" ]; then
  echo "$0: Current branch is not master" 1>&2
  exit 1
fi

RELEASE_TYPE_LIST="prerelease prepatch patch preminor minor major premajor"
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
git pull origin master
git tag -d v3 || true
git pull origin --tags

npm ci

mkdir ./lib
npm run build
git add ./lib/index.js
git commit -m "chore(release): Add build assets"

npm run release -- --release-as "${RELEASE_TYPE}" --preset eslint

git rm ./lib/index.js
rm -rf ./lib
git commit -m "chore(release): Remove build assets [skip ci]"

TAG_NAME="v$(jq -r '.version' ./package.json)"
git push origin master
git push origin "${TAG_NAME}"
