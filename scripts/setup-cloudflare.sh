#!/usr/bin/env bash
# One-shot Cloudflare Pages setup + deploy for godelpromo.com.
#
# Safe to re-run: creating an existing project is treated as success, and each
# run just publishes a new deployment.
#
# Auth, in order of preference:
#   1. CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID in the environment
#   2. An existing `wrangler login` session
#
# IMPORTANT: verify the account first. `wrangler whoami` may list several
# accounts, and Pages will silently deploy into whichever one it resolves.
# Set CLOUDFLARE_ACCOUNT_ID explicitly so this cannot go to the wrong place.
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT="${PROJECT:-godelpromo}"
BRANCH="${BRANCH:-main}"

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }

if [ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  cat >&2 <<'MSG'
CLOUDFLARE_ACCOUNT_ID is not set.

This is deliberately required. `wrangler whoami` can list multiple accounts,
and without this set, Pages picks one for you — which is how a personal site
ends up deployed into a client's account.

Find your personal account ID:
  Cloudflare dashboard -> Workers & Pages -> right sidebar "Account ID"
  (or run: npx wrangler whoami)

Then:
  export CLOUDFLARE_ACCOUNT_ID=<id>
  ./scripts/setup-cloudflare.sh
MSG
  exit 1
fi

say "Account: $CLOUDFLARE_ACCOUNT_ID"
npx wrangler whoami 2>&1 | grep -A2 "$CLOUDFLARE_ACCOUNT_ID" || true

say "Building"
node build.mjs

say "Validating"
node scripts/check.mjs

say "Creating Pages project '$PROJECT' (ok if it already exists)"
npx wrangler pages project create "$PROJECT" \
  --production-branch "$BRANCH" 2>&1 | tail -5 \
  || echo "project already exists — continuing"

say "Deploying"
npx wrangler pages deploy dist \
  --project-name "$PROJECT" \
  --branch "$BRANCH" \
  --commit-dirty=true 2>&1 | tail -15

cat <<MSG

------------------------------------------------------------------
Deployed. Verify on the *.pages.dev URL above before touching DNS:

  /                        renders, copy button works
  /llms.txt                machine-readable summary
  /robots.txt              names the AI crawlers
  /index.html              301s to /
  /godel-terminal-commands/  the 17-command reference

Then connect the domain — see docs/cloudflare-cutover.md
------------------------------------------------------------------
MSG
