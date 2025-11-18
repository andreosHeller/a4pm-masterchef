#!/usr/bin/env bash
set -euo pipefail
URL="$1"; TIMEOUT="${2:-60}"
for i in $(seq 1 "$TIMEOUT"); do
  if curl -sf "$URL" >/dev/null; then exit 0; fi
  sleep 1
done
echo "Timeout waiting for $URL" >&2
exit 1