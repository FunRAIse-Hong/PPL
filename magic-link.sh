#!/bin/sh
# Generate a Supabase magic link without sending email.
# Usage:   SUPABASE_SERVICE_KEY=xxx ./magic-link.sh you@example.com
# The service key is read from env only — never hardcode it here (repo is public).

set -eu

EMAIL="${1:?usage: SUPABASE_SERVICE_KEY=xxx $0 <email> [redirect_url]}"
REDIRECT="${2:-https://funraise-hong.github.io/PPL/}"
KEY="${SUPABASE_SERVICE_KEY:?set SUPABASE_SERVICE_KEY env var (Dashboard → Project Settings → API Keys → service_role)}"
URL="https://yxhumjdrutbizlltrdom.supabase.co"

curl -sf "$URL/auth/v1/admin/generate_link" \
  -H "apikey: $KEY" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"magiclink\",\"email\":\"$EMAIL\",\"redirect_to\":\"$REDIRECT\"}" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['action_link'])"
