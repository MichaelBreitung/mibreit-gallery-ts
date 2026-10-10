#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <release-tag>" >&2
  exit 1
fi

release_tag="$1"
asset="lib-iife/mibreitGalleryTs.min.js"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: GitHub CLI (gh) is required." >&2
  exit 1
fi

npm run build

if [[ ! -f "$asset" ]]; then
  echo "Error: Build did not create $asset." >&2
  exit 1
fi

gh release upload "$release_tag" "$asset"
