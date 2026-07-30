#!/usr/bin/env bash
# Generates the 1200x630 Open Graph card at assets/og-cover.png.
#
# The previous build shipped a 1024x1024, 1.4MB PNG while declaring
# width="1200" height="630" in the markup — wrong aspect ratio, wrong
# dimensions, and a guaranteed layout shift. This produces a correctly sized
# card at a fraction of the weight.
#
# Requires ImageMagick 7 (`brew install imagemagick`).
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=assets/og-cover.png
BG='#070b14'
ACCENT='#4ea1ff'
TEAL='#2dd4bf'

magick -size 1200x630 "xc:${BG}" \
  \( -size 1200x630 radial-gradient:"rgba(78,161,255,0.30)"-none -resize 200% -gravity northwest -crop 1200x630+0+0 +repage \) \
    -compose over -composite \
  \( -size 1200x630 radial-gradient:"rgba(45,212,191,0.20)"-none -resize 180% -gravity southeast -crop 1200x630+0+0 +repage \) \
    -compose over -composite \
  -font Helvetica-Bold -pointsize 30 -fill "rgba(255,255,255,0.62)" \
    -gravity northwest -annotate +72+92 'GODELPROMO' \
  -font Courier-Bold -pointsize 148 -fill "$ACCENT" \
    -gravity northwest -annotate +68+168 'TAKE30' \
  -font Helvetica-Bold -pointsize 44 -fill "rgba(255,255,255,0.94)" \
    -gravity northwest -annotate +72+352 '30% off your first month' \
  -font Helvetica -pointsize 36 -fill "rgba(255,255,255,0.70)" \
    -gravity northwest -annotate +72+416 'of Godel Terminal' \
  -font Helvetica -pointsize 26 -fill "rgba(255,255,255,0.50)" \
    -gravity northwest -annotate +72+512 'Pricing - 17 documented commands - honest comparisons' \
  -fill "$TEAL" -draw "roundrectangle 72,570 132,578 4,4" \
  -strip -quality 92 "$OUT"

# Keep it well under the 300KB most scrapers will happily fetch.
magick "$OUT" -strip -colors 220 "$OUT"

printf 'wrote %s (%s bytes)\n' "$OUT" "$(wc -c < "$OUT" | tr -d ' ')"
