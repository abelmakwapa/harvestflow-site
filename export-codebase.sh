#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════
# Export entire codebase to one unified text file for AI context
# ═══════════════════════════════════════════════════════════════

OUTPUT="harvestflow-codebase-export.txt"

echo "📦 Exporting codebase → $OUTPUT"

# Start fresh
> "$OUTPUT"

# Header
cat >> "$OUTPUT" << 'HEADER'
═══════════════════════════════════════════════════════════════
HARVESTFLOW SITE — FULL CODEBASE EXPORT
Stack: Next.js 15 (static export) + TypeScript + React 19
Generated: $(date -u +"%Y-%m-%d %H:%M UTC")
═══════════════════════════════════════════════════════════════

HEADER

# Replace the date placeholder
sed -i "s/\$(date -u +\"%Y-%m-%d %H:%M UTC\")/$(date -u +'%Y-%m-%d %H:%M UTC')/" "$OUTPUT"

# File counter
COUNT=0

# Export each matching file with a clear separator
export_file() {
  local filepath="$1"
  COUNT=$((COUNT + 1))
  echo "" >> "$OUTPUT"
  echo "───────────────────────────────────────────────────────────────" >> "$OUTPUT"
  echo "FILE [$COUNT]: $filepath" >> "$OUTPUT"
  echo "───────────────────────────────────────────────────────────────" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
  cat "$filepath" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
}

# ─── Config files ──────────────────────────────────────────────
for f in package.json tsconfig.json next.config.ts .gitignore; do
  [ -f "$f" ] && export_file "$f"
done

# ─── App directory (all .ts, .tsx, .css) ───────────────────────
find app -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" \) | sort | while read -r f; do
  export_file "$f"
done

# ─── Public assets (list only, don't dump binaries) ────────────
echo "" >> "$OUTPUT"
echo "───────────────────────────────────────────────────────────────" >> "$OUTPUT"
echo "BINARY ASSETS (not exported, listed for reference):" >> "$OUTPUT"
echo "───────────────────────────────────────────────────────────────" >> "$OUTPUT"
find public -type f 2>/dev/null | sort >> "$OUTPUT" || true

# ─── Summary ───────────────────────────────────────────────────
echo "" >> "$OUTPUT"
echo "═══════════════════════════════════════════════════════════════" >> "$OUTPUT"
echo "END OF EXPORT — $COUNT files exported" >> "$OUTPUT"
echo "═══════════════════════════════════════════════════════════════" >> "$OUTPUT"

SIZE=$(du -h "$OUTPUT" | cut -f1)
echo "✅ Done: $OUTPUT ($SIZE, $COUNT files)"
