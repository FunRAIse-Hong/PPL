#!/bin/sh
# Generate a Supabase magic link without sending email.
# Usage:   SUPABASE_SERVICE_KEY=xxx ./magic-link.sh you@example.com
# The service key is read from env only — never hardcode it here (repo is public).

set -eu

if [ -z "${1:-}" ]; then
  echo "用法: make link you@example.com [redirect_url]" >&2
  exit 1
fi
if [ -z "${SUPABASE_SERVICE_KEY:-}" ]; then
  echo "缺少金鑰，請先執行: export SUPABASE_SERVICE_KEY=..." >&2
  echo "（Supabase Dashboard → Project Settings → API Keys → service_role）" >&2
  exit 1
fi
EMAIL="$1"
REDIRECT="${2:-https://funraise-hong.github.io/PPL/}"
KEY="$SUPABASE_SERVICE_KEY"
URL="https://yxhumjdrutbizlltrdom.supabase.co"

curl -sf "$URL/auth/v1/admin/generate_link" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"magiclink\",\"email\":\"$EMAIL\",\"redirect_to\":\"$REDIRECT\"}" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['action_link'])"
