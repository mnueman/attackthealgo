#!/usr/bin/env bash
# publish.sh — commit, push, deploy in one go.
# Usage: ./publish.sh "post: AI security article"
set -e

MSG="${1:-}"
if [ -z "$MSG" ]; then
  read -rp "Commit message: " MSG
fi
if [ -z "$MSG" ]; then
  echo "Aborted: no commit message."; exit 1
fi

git add .
git commit -m "$MSG" || { echo "Nothing to commit."; exit 0; }
git push
echo ""
echo "✓ Pushed. Cloudflare Pages will rebuild in ~30 seconds."
echo "  Watch the deploy: https://dash.cloudflare.com → Workers & Pages"
