/* ═══════════════════════════════════════════════════════════════
   HARVESTFLOW — LIVE PIXEL ART ENGINE  (pixel-art.js)

   Renders live, interactive, agriculture-themed pixel art scenes
   on a 64×64 logical grid, in the spirit of the Henry Northington
   services pages.

   Scenes
   ──────
   Brand logo variants (loader + profile rail):
     "classic" · "night" · "harvest" · "loader"
   Solution identities (the //Pixel Harvest showcase):
     "app"       — smartphone dashboard, growing wheat in-screen
     "market"    — farmer stall matched to buyer crate by a bid token
     "forecast"  — crop rows, forecast chart, weather cycle + scan beam
     "logistics" — truck rolling field → depot, produce in transit
     "quality"   — inspection conveyor; scan turns crop into grade + credit
     "ussd"      — feature phone, USSD menu lines + signal waves
     "vault"     — local offline vault, weak signal towers + encrypted sync

   Usage
   ─────
     <canvas data-pixel="forecast" data-scale="4"></canvas>
     <script src="pixel-art.js"></script>
     HFPixelArt.scan();      // mount any new [data-pixel] canvases

   Interaction
   ───────────
   Each canvas binds to its closest [data-pixel-hover] ancestor.
   While hovered, `boost` eases 0 → 1 (GSAP when present, lerp
   fallback otherwise): animations run ~2-3× faster, glows widen
   and brighten, and pixel-quantised spark particles rise.

   Performance
   ───────────
   · One shared requestAnimationFrame loop for every canvas.
   · IntersectionObserver skips off-screen canvases;
     document.hidden pauses all drawing.
   · One frame is painted synchronously at mount, so a tile is
     never blank even in throttled background tabs.
   · prefers-reduced-motion: a single static frame, no particles.
═══════════════════════════════════════════════════════════════ */

window.HFPixelArt = (function () {
  'use strict';

  var GRID = 64;
  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HAS_GSAP = typeof gsap !== 'undefined';

  /* ── brand palette ────────────────────────────────────────── */
  var MINT   = '#6EE7B7', MINT2 = '#34d399', GREEN = '#059669',
      FOREST = '#065f46', TERRA = '#EA580C', AMBER = '#F59E0B',
      CREAM  = '#FDFBF7', INK   = '#1C1917', INK0  = '#131110',
      DEEP   = '#022c22', SCREEN= '#06251d';

  /* ═════════════════ shared drawing helpers ════════════════ */

  /* Diamond-ish wheat grain blob centred on (bx, by). */
  function grain(px, bx, by, size, color, alpha) {
    for (var dy = -size; dy <= size; dy++) {
      var half = Math.max(0, size - Math.abs(dy) - 1);
      for (var dx = -half; dx <= half; dx++) px(bx + dx, by + dy, color, alpha);
    }
  }

  function rectFill(px, x0, y0, x1, y1, c, a) {
    for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) px(x, y, c, a);
  }

  function rectLine(px, x0, y0, x1, y1, c, a) {
    for (var x = x0; x <= x1; x++) { px(x, y0, c, a); px(x, y1, c, a); }
    for (var y = y0; y <= y1; y++) { px(x0, y, c, a); px(x1, y, c, a); }
  }

  /* Circle / ellipse outline sampled onto the grid. */
  function ring(px, cx, cy, rx, ry, c, a) {
    var steps = Math.max(20, (rx + ry) * 4);
    for (var i = 0; i < steps; i++) {
      var t = (i / steps) * Math.PI * 2;
      px(Math.round(cx + Math.cos(t) * rx), Math.round(cy + Math.sin(t) * ry), c, a);
    }
  }

  /* Pre-sampled flow wave (54 columns wide). */
  var WAVE = [];
  for (var wx = 0; wx < 54; wx++) {
    WAVE.push(Math.max(-4, Math.min(0, Math.round(-2 - 2 * Math.sin(wx * 0.32)))));
  }

  /* ═════════════════ scene: brand logo ══════════════════════ */

  function makeLogoScene(th) {
    return {
      bg: th.bg,
      sparks: [[22, 18], [17, 24], [27, 24]],
      sparkColors: th.spark,
      draw: function (px, inst, f) {
        var boost = inst.boost, WAVE_Y = 53, STEM_X = 22, GRAIN_Y = 22;
        var stemTop = GRAIN_Y + 10;
        if (th.growStem && !REDUCED) {
          var growK = (Math.sin(f * 0.015 + inst.seed) + 1) / 2;
          stemTop = Math.round(GRAIN_Y + 10 + (1 - growK) * 6);
        }
        for (var sy = stemTop; sy <= WAVE_Y - 1; sy++) px(STEM_X, sy, th.grain);

        var amp = 1.5 * (1 + boost * 1.2), t = f * 0.055 + inst.seed;
        grain(px, STEM_X,     GRAIN_Y     + Math.round(Math.sin(t)       * amp),        2, th.grain);
        grain(px, STEM_X - 5, GRAIN_Y + 4 + Math.round(Math.sin(t + .9)  * amp * .85),  2, th.grain2);
        grain(px, STEM_X + 5, GRAIN_Y + 4 + Math.round(Math.sin(t + 1.8) * amp * .85),  2, th.grain2);

        inst.s1 = (inst.s1 || 0) + (1 / th.speed) * (1 + boost * 2.2);
        var off = Math.floor(inst.s1) % 54;
        for (var i = 0; i < 54; i++) {
          var dx = ((i - off + 108) % 54) + 5;
          if (dx >= 5 && dx <= 59) {
            px(dx, WAVE_Y + WAVE[i], th.flow);
            px(dx, WAVE_Y + WAVE[i] + 1, th.flow, .4);
          }
        }
        px(STEM_X, WAVE_Y, th.grain);

        pulseDot(px, 57, 50, th.dot, f, boost);
      }
    };
  }

  /* Pulsing 2×2 amber dot with a boost-aware glow halo. */
  function pulseDot(px, x, y, color, f, boost) {
    var pulse = (Math.sin(f * (0.08 + boost * 0.06)) + 1) / 2;
    var core = 0.4 + pulse * 0.6 * (1 + boost * 0.4);
    px(x, y, color, core); px(x + 1, y, color, core);
    px(x, y + 1, color, core); px(x + 1, y + 1, color, core);
    var halo = 0.08 + pulse * 0.14 + boost * 0.3;
    ring(px, x, y, 2, 2, color, halo);
    if (boost > 0.15) ring(px, x, y, 3, 3, color, halo * 0.45);
  }

  /* ═════════════════ scene 1: farmer app ════════════════════ */
  /* Smartphone showing a farm dashboard — animated yield bars and
     wheat stalks growing inside the screen.                      */

  var sceneApp = {
    bg: INK,
    sparks: [[28, 14], [32, 12], [36, 14]],
    sparkColors: [MINT, AMBER],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      /* body + bezel */
      rectFill(px, 23, 7, 41, 56, '#262220');
      rectLine(px, 22, 6, 42, 57, MINT, .55 + boost * .35);
      for (var sx = 30; sx <= 34; sx++) px(sx, 8, MINT, .35);       /* speaker */
      rectFill(px, 31, 52, 33, 54, AMBER, .5 + boost * .4);          /* home key */
      /* screen */
      rectFill(px, 25, 10, 39, 49, SCREEN);
      for (var hx = 26; hx <= 38; hx++) px(hx, 12, MINT, .3);        /* header rule */
      /* yield bars */
      var speed = 0.045 * (1 + boost * 1.6);
      for (var b = 0; b < 4; b++) {
        var bx = 27 + b * 3;
        var h = 4 + Math.round(((Math.sin(f * speed + b * 1.4 + inst.seed) + 1) / 2) * (7 + boost * 3));
        for (var by = 0; by < h; by++)
          px(bx, 31 - by, b === 3 ? AMBER : MINT, .5 + (by / h) * .5);
      }
      for (var gx = 26; gx <= 38; gx++) px(gx, 32, FOREST, .8);      /* chart baseline */
      /* wheat growing at the foot of the screen */
      var t = f * 0.05 * (1 + boost) + inst.seed;
      [[28, 0], [32, 1.1], [36, 2.2]].forEach(function (w) {
        var sway = Math.round(Math.sin(t + w[1]) * (1 + boost));
        for (var wy = 44; wy <= 48; wy++) px(w[0], wy, GREEN);
        grain(px, w[0] + sway, 42, 1, MINT);
        px(w[0] + sway, 41, MINT, .6);
      });
      /* status dot */
      pulseDot(px, 37, 14, AMBER, f, boost);
    }
  };

  /* ═════════════════ scene 2: marketplace ═══════════════════ */
  /* Farmer stall to buyer crate: a bid tag travels across the
     route and both sides pulse when the match completes.          */

  var sceneMarket = {
    bg: INK0,
    sparks: [[12, 31], [52, 34], [32, 35]],
    sparkColors: [MINT, AMBER, TERRA],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      var t = f * 0.06 + inst.seed;
      var bob = Math.round(Math.sin(t) * (1 + boost));

      /* farmer stall: canopy, counter, crop crate */
      rectFill(px, 6, 25, 22, 28, TERRA, .8);
      for (var aw = 0; aw < 4; aw++) rectFill(px, 7 + aw * 4, 22, 9 + aw * 4, 24, aw % 2 ? AMBER : MINT, .85);
      rectLine(px, 6, 29, 22, 44, MINT, .65 + boost * .25);
      rectFill(px, 8, 35, 20, 42, FOREST, .82);
      [[10, 0], [14, .8], [18, 1.5]].forEach(function (w) {
        for (var wy = 35; wy <= 40; wy++) px(w[0], wy, GREEN);
        grain(px, w[0], 32 + bob + Math.round(Math.sin(t + w[1])), 1, MINT);
      });

      /* buyer side: warehouse crate and receiving bay */
      rectLine(px, 46, 28, 59, 45, AMBER, .8 + boost * .15);
      rectFill(px, 48, 34, 57, 43, '#78350f', .78);
      rectLine(px, 48, 34, 57, 43, TERRA, .8);
      rectFill(px, 51, 37, 54, 40, AMBER, .35);
      for (var by = 28; by <= 33; by++) px(52, by, MINT2, .45);
      rectFill(px, 49, 26, 55, 27, MINT2, .5);

      /* lit marketplace route */
      inst.s1 = (inst.s1 || 0) + 0.28 * (1 + boost * 2);
      var routePulse = Math.floor(inst.s1) % 8;
      for (var x = 22; x <= 45; x++) {
        var y = 38 + Math.round(Math.sin((x + f * .08) * .32) * 2);
        px(x, y, TERRA, .32);
        if ((x + routePulse) % 6 === 0) px(x, y, MINT, .55 + boost * .35);
      }

      /* bid tag travels from buyer to farmer and confirms the match */
      inst.s2 = (inst.s2 || 0) + 0.2 * (1 + boost * 2.5);
      var k = (inst.s2 % 72) / 72;
      if (k < .78) {
        var tx = Math.round(47 - (k / .78) * 26);
        var ty = 35 + Math.round(Math.sin(k * Math.PI) * -4);
        rectFill(px, tx - 2, ty - 2, tx + 2, ty + 2, AMBER, .92);
        px(tx + 2, ty - 2, CREAM, .8);
        px(tx - 1, ty, '#78350f', .85); px(tx + 1, ty, '#78350f', .85);
        px(tx + 4, ty + 1, AMBER, .45); px(tx + 6, ty + 2, AMBER, .18);
      } else {
        var flash = 1 - (k - .78) / .22;
        ring(px, 32, 34, 7, 5, MINT, flash * (.45 + boost * .4));
        rectFill(px, 29, 33, 35, 35, AMBER, flash);
        px(31, 36, MINT, flash); px(32, 37, MINT, flash); px(34, 35, MINT, flash); px(35, 34, MINT, flash);
      }
    }
  };

  /* ═════════════════ scene 3: forecast dashboard ════════════ */
  /* Crop rows under a predictive dashboard: weather cycles, a
     chart draws forward, and a scan beam marks the best harvest. */

  var sceneForecast = {
    bg: DEEP,
    sparks: [[21, 42], [42, 18], [32, 32]],
    sparkColors: [MINT, AMBER, CREAM],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      var t = f * 0.045 * (1 + boost) + inst.seed;

      /* dashboard frame */
      rectFill(px, 10, 8, 54, 30, '#04322a', .78);
      rectLine(px, 9, 7, 55, 31, MINT, .55 + boost * .25);
      for (var gx = 13; gx <= 52; gx += 6) for (var gy = 12; gy <= 27; gy += 5) px(gx, gy, MINT, .12);

      /* weather glyph cycles: sun, rain, cloud */
      var mode = Math.floor((f * .012 + inst.seed) % 3);
      if (mode === 0) {
        ring(px, 18, 17, 4, 4, AMBER, .8);
        [[18, 10], [18, 24], [11, 17], [25, 17], [13, 12], [23, 12], [13, 22], [23, 22]].forEach(function (p) {
          px(p[0], p[1], AMBER, .55 + boost * .25);
        });
      } else if (mode === 1) {
        rectFill(px, 13, 16, 24, 19, MINT2, .5);
        ring(px, 16, 15, 3, 3, MINT2, .45); ring(px, 21, 15, 3, 3, MINT2, .45);
        [14, 18, 22].forEach(function (rx, i) { px(rx, 23 + ((f >> (i + 3)) % 2), AMBER, .7); });
      } else {
        rectFill(px, 13, 17, 25, 20, CREAM, .42);
        ring(px, 16, 15, 3, 3, CREAM, .36); ring(px, 21, 15, 4, 3, CREAM, .36);
      }

      /* predictive line chart */
      var pts = [[29, 25], [34, 22], [39, 23], [44, 17], [50, 13]];
      var drawK = (f * .015 * (1 + boost * 1.5) + inst.seed) % 1;
      for (var i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], steps = 6;
        for (var s = 0; s <= steps; s++) {
          var globalK = (i + s / steps) / (pts.length - 1);
          if (globalK > drawK && drawK < .94) continue;
          var lx = Math.round(a[0] + (b[0] - a[0]) * s / steps);
          var ly = Math.round(a[1] + (b[1] - a[1]) * s / steps);
          px(lx, ly, AMBER, .62 + boost * .28);
        }
      }
      pts.forEach(function (p, i) {
        var pulse = (Math.sin(t + i * .9) + 1) / 2;
        px(p[0], p[1], i === 3 ? MINT : CREAM, .35 + pulse * .55);
      });

      /* crop rows below dashboard; future-best row glows */
      for (var base = 0; base < 4; base++) {
        var bx = 15 + base * 11;
        var h = 5 + base * 2 + Math.round(((Math.sin(t + base) + 1) / 2) * (2 + boost * 3));
        for (var yy = 50; yy >= 50 - h; yy--) px(bx, yy, GREEN, .85);
        grain(px, bx + Math.round(Math.sin(t + base) * (base === 3 ? 1 + boost : 1)), 48 - h, base === 3 ? 2 : 1, base === 3 ? AMBER : MINT);
        for (var dirt = bx - 4; dirt <= bx + 4; dirt++) px(dirt, 52, TERRA, .35);
      }

      /* prediction scan beam over the chosen crop */
      var sx = 13 + Math.round(((f * .11 * (1 + boost * 1.8)) % 42));
      for (var sy = 34; sy <= 54; sy++) px(sx, sy, MINT, .28 + boost * .22);
      px(sx, 32, AMBER, .8); px(sx, 33, AMBER, .45);
    }
  };

  /* ═════════════════ scene 4: logistics ═════════════════════ */
  /* A truck rolls from the field to the depot while produce dots
     stream along above the road — no black holes in between.     */

  var sceneLogistics = {
    bg: INK,
    sparks: [[8, 34], [11, 34], [54, 32]],
    sparkColors: [MINT, AMBER],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      /* field (left) */
      [[5, 0], [8, 1], [11, 2]].forEach(function (w) {
        for (var wy = 41; wy <= 45; wy++) px(w[0], wy, GREEN);
        grain(px, w[0], 39 + Math.round(Math.sin(f * .05 + w[1]) * 1), 1, MINT);
      });
      /* depot (right) */
      rectLine(px, 49, 34, 59, 45, MINT2, .8);
      rectFill(px, 53, 40, 55, 45, FOREST);
      px(54, 37, AMBER, .5 + (Math.sin(f * .07) + 1) * .25);
      /* road */
      for (var rx2 = 0; rx2 < 64; rx2++) px(rx2, 46, '#3f3a36');
      inst.s1 = (inst.s1 || 0) + 0.3 * (1 + boost * 2.2);
      for (var d = 0; d < 8; d++) {
        var dxx = (d * 8 + 64 - Math.floor(inst.s1) % 8) % 64;
        px(dxx, 48, CREAM, .25);
      }
      /* truck */
      inst.s2 = (inst.s2 || 0) + 0.22 * (1 + boost * 2.2);
      var tx = Math.floor(inst.s2 % 84) - 18;
      rectFill(px, tx, 37, tx + 10, 44, FOREST);            /* trailer */
      rectLine(px, tx, 37, tx + 10, 44, MINT, .9);
      grain(px, tx + 5, 40, 2, MINT, .8);                   /* cargo mark */
      rectFill(px, tx + 12, 40, tx + 15, 44, MINT2);        /* cab */
      px(tx + 14, 41, SCREEN); px(tx + 15, 41, SCREEN);     /* window */
      var w1 = ((f >> 2) % 2), w2 = 1 - w1;                 /* wheel spin */
      px(tx + 2, 45, CREAM, .5 + w1 * .5); px(tx + 8, 45, CREAM, .5 + w2 * .5);
      px(tx + 14, 45, CREAM, .5 + w1 * .5);
      /* produce dots streaming to the depot */
      for (var p = 0; p < 3; p++) {
        var pxx = Math.floor((f * (0.32 + boost * .5) + p * 21) % 64);
        px(pxx, 33 + (p % 2), AMBER, .35 + boost * .4);
      }
    }
  };

  /* ═════════════════ scene 5: quality + finance ═════════════ */
  /* Inspection conveyor: produce rolls through a scanner gate,
     earns a grade badge, then unlocks credit.                    */

  var sceneQuality = {
    bg: INK0,
    sparks: [[30, 23], [49, 21], [52, 43]],
    sparkColors: [MINT, AMBER, CREAM],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      /* conveyor belt */
      rectFill(px, 6, 42, 58, 47, '#3f3a36', .95);
      for (var cx = 7; cx <= 57; cx += 7) {
        var roll = (cx + Math.floor(f * .08 * (1 + boost))) % 2;
        px(cx, 48, CREAM, .25 + roll * .28);
      }

      /* scanner gate */
      rectLine(px, 25, 15, 39, 44, MINT, .65 + boost * .25);
      rectFill(px, 27, 17, 37, 21, '#04322a', .9);
      rectFill(px, 30, 18, 34, 19, AMBER, .6 + boost * .25);
      for (var gy = 22; gy <= 42; gy++) {
        px(27, gy, MINT2, .35); px(37, gy, MINT2, .35);
      }

      /* produce moves under the scanner */
      inst.s1 = (inst.s1 || 0) + 0.24 * (1 + boost * 2.2);
      var cyc = (inst.s1 % 78) / 78;
      var px0 = Math.round(8 + cyc * 33);
      grain(px, px0, 38, 3, MINT);
      grain(px, px0 + 4, 39, 2, AMBER, .8);
      if (px0 > 24 && px0 < 40) {
        var scanX = 27 + Math.round(((f * .22 * (1 + boost * 1.7)) % 11));
        for (var sy2 = 23; sy2 <= 41; sy2++) px(scanX, sy2, TERRA, .55);
        px(scanX - 1, 38, CREAM, .45); px(scanX + 1, 38, CREAM, .45);
      }

      /* pass complete: A grade badge and credit token unlock */
      var flash = cyc > .72 ? (cyc - .72) / .28 : 0;
      if (flash > .02) {
        rectLine(px, 46, 11, 58, 25, MINT, .55 + flash * .45);
        rectFill(px, 48, 13, 56, 23, '#04322a', .75);
        /* chunky A+ */
        [[50, 20], [50, 19], [51, 18], [52, 17], [53, 18], [54, 19], [54, 20], [51, 19], [52, 19], [53, 19]].forEach(function (p) {
          px(p[0], p[1], MINT, flash);
        });
        px(56, 15, AMBER, flash); px(56, 16, AMBER, flash); px(55, 16, AMBER, flash); px(57, 16, AMBER, flash);
        ring(px, 52, 18, 8, 7, MINT, flash * .22);
      }

      /* credit card / coin */
      rectLine(px, 45, 36, 59, 46, AMBER, .62 + flash * .35);
      rectFill(px, 47, 39, 55, 40, AMBER, .28 + flash * .38 + boost * .12);
      rectFill(px, 48, 43, 51, 44, MINT, .45 + flash * .4);
      ring(px, 56, 41, 3, 3, AMBER, .7 + flash * .25);
      px(56, 41, '#78350f', .9);
    }
  };

  /* ═════════════════ scene 6: ussd channel ══════════════════ */
  /* A trusty feature phone: USSD menu lines type themselves out,
     keys flash in sequence, signal waves ripple from the antenna. */

  var USSD_LINES = [11, 8, 10, 6, 9];

  var sceneUssd = {
    bg: DEEP,
    sparks: [[24, 6], [40, 10], [32, 8]],
    sparkColors: [MINT, AMBER],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      /* antenna + body */
      for (var ay = 4; ay <= 9; ay++) px(25, ay, MINT2);
      px(25, 3, AMBER, .6 + (Math.sin(f * .1) + 1) * .2);
      rectFill(px, 23, 10, 41, 56, '#0a3a2e');
      rectLine(px, 22, 9, 42, 57, MINT, .55 + boost * .35);
      /* screen with USSD menu typing out */
      rectFill(px, 25, 12, 39, 30, SCREEN);
      inst.s1 = (inst.s1 || 0) + 0.05 * (1 + boost * 1.6);
      var shown = Math.floor(inst.s1) % (USSD_LINES.length + 3);   /* pause at end */
      for (var li = 0; li < Math.min(shown, USSD_LINES.length); li++) {
        for (var lx = 27; lx < 27 + USSD_LINES[li]; lx++) px(lx, 14 + li * 3, MINT, .85);
      }
      /* blinking cursor */
      if ((f >> 4) % 2 && shown < USSD_LINES.length)
        px(27 + USSD_LINES[Math.min(shown, USSD_LINES.length - 1)], 14 + Math.min(shown, USSD_LINES.length - 1) * 3, AMBER);
      /* keypad, keys flash in sequence */
      var active = Math.floor(f * 0.06 * (1 + boost)) % 12;
      for (var r = 0; r < 4; r++) for (var c = 0; c < 3; c++) {
        var on = (r * 3 + c) === active;
        rectFill(px, 26 + c * 5, 34 + r * 5, 28 + c * 5, 36 + r * 5, on ? AMBER : MINT2, on ? 1 : .35);
      }
      /* signal waves from the antenna */
      var wl = Math.floor(f * 0.05 * (1 + boost)) % 4;
      for (var wv = 0; wv <= wl; wv++)
        ring(px, 25, 3, 3 + wv * 3, 2 + wv * 2, AMBER, .5 - wv * .12);
    }
  };

  /* ═════════════════ scene 7: secure vault ══════════════════ */
  /* Local ledger blocks save into the shield while signal is weak;
     when connectivity returns, an encrypted packet syncs out.     */

  var sceneVault = {
    bg: INK,
    sparks: [[22, 45], [32, 25], [51, 16]],
    sparkColors: [MINT, GREEN, AMBER],
    draw: function (px, inst, f) {
      var boost = inst.boost;
      var t = f * 0.04 * (1 + boost) + inst.seed;

      /* weak / broken towers outside the secure zone */
      rectFill(px, 6, 16, 8, 36, '#3f3a36', .7);
      rectFill(px, 55, 18, 57, 37, '#3f3a36', .7);
      for (var tw = 0; tw < 4; tw++) {
        px(5 + tw, 15 + tw, TERRA, .35); px(59 - tw, 17 + tw, TERRA, .35);
      }
      ring(px, 7, 15, 5, 4, TERRA, .12 + boost * .05);
      ring(px, 56, 17, 5, 4, TERRA, .12 + boost * .05);

      /* local phone/database saving while offline */
      rectLine(px, 12, 39, 25, 56, MINT, .55 + boost * .2);
      rectFill(px, 14, 42, 23, 52, SCREEN, .9);
      for (var db = 0; db < 3; db++) {
        var a = .35 + ((Math.sin(t * 2 + db) + 1) / 2) * .45;
        rectFill(px, 16, 44 + db * 3, 21, 45 + db * 3, db === 2 ? AMBER : MINT, a);
      }

      /* central secure vault / shield */
      for (var y = 12; y <= 50; y++) {
        var w = y < 29 ? 9 : Math.max(0, Math.round(9 * (50 - y) / 21));
        px(33 - w, y, MINT, .78 + boost * .22);
        px(33 + w, y, MINT, .78 + boost * .22);
        if (y === 12) for (var tx = 33 - w; tx <= 33 + w; tx++) px(tx, y, MINT, .8);
        else for (var ix = 33 - w + 1; ix <= 33 + w - 1; ix++) px(ix, y, '#0c1f18', .9);
      }
      rectLine(px, 27, 25, 39, 40, AMBER, .72);             /* vault door */
      ring(px, 33, 32, 3, 3, AMBER, .82 + boost * .15);
      px(33, 32, '#78350f', .9);
      for (var sy = 25; sy <= 35; sy++) px(33, sy, GREEN, .75);
      grain(px, 33 + Math.round(Math.sin(t) * 1), 23, 2, MINT);

      /* ledger packets stack into the shield */
      inst.s1 = (inst.s1 || 0) + 0.22 * (1 + boost * 2);
      var k = (inst.s1 % 54) / 54;
      var px1 = Math.round(23 + k * 10);
      var py1 = Math.round(46 - k * 16);
      rectFill(px, px1 - 1, py1 - 1, px1 + 2, py1 + 1, MINT, .75);
      px(px1 + 3, py1, AMBER, .45);

      /* cloud sync stays dim, then receives an encrypted packet */
      rectFill(px, 46, 10, 58, 14, CREAM, .18 + boost * .14);
      ring(px, 49, 9, 3, 3, CREAM, .16 + boost * .12);
      ring(px, 55, 9, 3, 3, CREAM, .16 + boost * .12);
      inst.s2 = (inst.s2 || 0) + 0.16 * (1 + boost * 2.4);
      var sk = (inst.s2 % 80) / 80;
      if (sk > .38) {
        var kk = (sk - .38) / .62;
        var sx2 = Math.round(39 + kk * 13);
        var sy2 = Math.round(24 - kk * 11);
        for (var tail = 0; tail < 3; tail++) px(sx2 - tail * 2, sy2 + tail, tail ? MINT : AMBER, .65 - tail * .18);
        if (kk > .82) ring(px, 52, 13, 5, 4, MINT, (.18 + boost * .18) * kk);
      }
      pulseDot(px, 31, 18, AMBER, f, boost);
    }
  };

  /* ═════════════════ scene registry ═════════════════════════ */

  var SCENES = {
    classic: makeLogoScene({ bg: CREAM, grain: GREEN, grain2: FOREST, flow: TERRA, dot: AMBER, spark: [AMBER, TERRA, GREEN], speed: 3 }),
    night:   makeLogoScene({ bg: INK,   grain: MINT,  grain2: MINT2,  flow: TERRA, dot: AMBER, spark: [MINT, AMBER, CREAM],  speed: 4 }),
    harvest: makeLogoScene({ bg: DEEP,  grain: MINT,  grain2: GREEN,  flow: AMBER, dot: AMBER, spark: [AMBER, MINT, TERRA],  speed: 2, growStem: true }),
    loader:  makeLogoScene({ bg: INK0,  grain: MINT,  grain2: MINT2,  flow: TERRA, dot: AMBER, spark: [MINT, AMBER],         speed: 3 }),
    app:       sceneApp,
    market:    sceneMarket,
    forecast:  sceneForecast,
    logistics: sceneLogistics,
    quality:   sceneQuality,
    ussd:      sceneUssd,
    vault:     sceneVault
  };

  /* ═════════════════ engine core ════════════════════════════ */

  var instances = [];
  var frame = 0;
  var loopRunning = false;

  var visIO = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var inst = instances.find(function (i) { return i.canvas === e.target; });
          if (inst) inst.visible = e.isIntersecting;
        });
      }, { rootMargin: '80px' })
    : null;

  function draw(inst) {
    var ctx = inst.ctx, scale = inst.scale, scene = inst.scene;

    function px(x, y, color, alpha) {
      if (x < 0 || x >= GRID || y < 0 || y >= GRID) return;
      ctx.globalAlpha = (alpha === undefined) ? 1 : Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = scene.bg;
    ctx.fillRect(0, 0, GRID * scale, GRID * scale);

    scene.draw(px, inst, frame);
    updateParticles(inst, px);
  }

  /* pixel-quantised spark particles rising from scene hotspots */
  function updateParticles(inst, px) {
    if (REDUCED) return;
    var scene = inst.scene;
    var rate = 0.012 + inst.boost * 0.26;
    if (Math.random() < rate && inst.particles.length < 24) {
      var o = scene.sparks[Math.floor(Math.random() * scene.sparks.length)];
      inst.particles.push({
        x: o[0] + (Math.random() * 6 - 3),
        y: o[1] + (Math.random() * 3 - 1),
        vx: (Math.random() - 0.5) * 0.14,
        vy: -(0.08 + Math.random() * 0.16),
        life: 1,
        decay: 0.012 + Math.random() * 0.014,
        color: scene.sparkColors[Math.floor(Math.random() * scene.sparkColors.length)]
      });
    }
    for (var i = inst.particles.length - 1; i >= 0; i--) {
      var p = inst.particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (p.life <= 0 || p.y < 1) { inst.particles.splice(i, 1); continue; }
      px(Math.round(p.x), Math.round(p.y), p.color, p.life * (0.3 + inst.boost * 0.7));
    }
  }

  function loop() {
    if (!document.hidden) {
      instances.forEach(function (inst) {
        if (!inst.visible) return;
        if (!HAS_GSAP) inst.boost += (inst.targetBoost - inst.boost) * 0.08;
        draw(inst);
      });
      frame++;
    }
    requestAnimationFrame(loop);
  }

  /* ═════════════════ mounting ═══════════════════════════════ */

  function mount(canvas) {
    if (canvas.__hfPixel) return null;
    var scene = SCENES[canvas.dataset.pixel] || SCENES.night;
    var scale = parseInt(canvas.dataset.scale, 10) || 2;

    canvas.width = GRID * scale;
    canvas.height = GRID * scale;

    var inst = {
      canvas: canvas,
      ctx: canvas.getContext('2d'),
      scene: scene,
      scale: scale,
      seed: Math.random() * Math.PI * 2,   /* desynchronise identical scenes */
      s1: Math.random() * 40,              /* scene-local scroll accumulators */
      s2: Math.random() * 40,
      boost: 0,
      targetBoost: 0,
      particles: [],
      visible: true                        /* IO corrects after its first pass */
    };
    canvas.__hfPixel = inst;
    instances.push(inst);
    if (visIO) visIO.observe(canvas);

    bindHover(inst);

    draw(inst);                            /* paint immediately — never a blank tile */
    if (REDUCED) return inst;
    if (!loopRunning) { loopRunning = true; requestAnimationFrame(loop); }
    return inst;
  }

  /* The whole card ([data-pixel-hover] ancestor) drives its canvas. */
  function bindHover(inst) {
    var host = inst.canvas.closest('[data-pixel-hover]') || inst.canvas;
    if (host.__hfPixelBound) return;
    host.__hfPixelBound = true;
    host.addEventListener('mouseenter', function () { setBoost(inst, 1); });
    host.addEventListener('mouseleave', function () { setBoost(inst, 0); });
    host.addEventListener('touchstart', function () {
      setBoost(inst, 1);
      setTimeout(function () { setBoost(inst, 0); }, 1400);
    }, { passive: true });
  }

  function setBoost(inst, v) {
    inst.targetBoost = v;
    if (HAS_GSAP && !REDUCED) {
      gsap.to(inst, { boost: v, duration: v ? 0.55 : 0.9, ease: v ? 'power2.out' : 'power2.inOut', overwrite: 'auto' });
    }
  }

  function scan(root) {
    var found = [];
    (root || document).querySelectorAll('canvas[data-pixel]').forEach(function (c) {
      var inst = mount(c);
      if (inst) found.push(inst);
    });
    return found;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(); });
  } else {
    scan();
  }

  return { scan: scan, mount: mount, scenes: SCENES, instances: instances };
})();
