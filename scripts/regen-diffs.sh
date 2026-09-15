#!/usr/bin/env sh
# Regenerate diff.txt in every findings/*/ folder.
# Run from the repo root in WSL, Git Bash, or any POSIX shell:
#   sh scripts/regen-diffs.sh
# git diff --no-index exits 1 when the files differ; that is normal.
set -u
cd "$(dirname "$0")/.." || exit 1
for dir in findings/*/; do
  [ -f "$dir/before.html" ] && [ -f "$dir/after.html" ] || continue
  ( cd "$dir" && git diff --no-index before.html after.html > diff.txt )
  if [ -s "$dir/diff.txt" ]; then
    echo "$dir: diff.txt regenerated"
  else
    echo "$dir: no differences (diff.txt is empty)"
  fi
done
