import { useEffect, useRef } from 'react';

/**
 * Full-bleed canvas art for the home "Pype AI" section:
 *  - flowing ribbons made of dotted particles (animated waves)
 *  - a translucent glass sphere with orbit rings and glowing nodes travelling around them
 * DPR-aware, pauses off-screen, renders a single static frame under prefers-reduced-motion.
 */
const RIBBONS = [
  { base: 0.74, amp: 0.1, f: 1.1, s: 0.5, ph: 0.0, lines: 10, spread: 0.075 },
  { base: 0.6, amp: 0.075, f: 1.7, s: -0.38, ph: 2.1, lines: 9, spread: 0.06 },
  { base: 0.84, amp: 0.06, f: 2.3, s: 0.3, ph: 4.0, lines: 7, spread: 0.045 },
];

export default function AiWaves({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, raf = 0, visible = true;
    const t0 = performance.now();
    const stars = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.3, p: Math.random() * 6.28 }));

    const resize = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const glow = (x, y, rad, c0, c1 = 'rgba(210, 189, 126, 0)') => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, c0); g.addColorStop(1, c1);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.fill();
    };

    const draw = (now) => {
      const t = reduce ? 3.2 : (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      const mobile = W < 900;
      const R = mobile ? Math.min(W * 0.27, 120) : Math.min(H * 0.34, W * 0.15);
      const cx = mobile ? W * 0.5 : W * 0.76;
      const cy = mobile ? H - R * 1.55 : H * 0.5;

      // ambient glow behind everything
      glow(cx, cy, R * 3.2, 'rgba(210, 189, 126, .2)');

      // twinkling stars
      stars.forEach((s) => {
        const a = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.3 + s.p));
        ctx.fillStyle = `rgba(247, 240, 218, ${a})`;
        ctx.fillRect(s.x * W, s.y * H, s.r, s.r);
      });

      // dotted particle waves
      const step = W < 700 ? 11 : 8;
      RIBBONS.forEach((rb, k) => {
        for (let i = 0; i < rb.lines; i++) {
          const u = i / (rb.lines - 1) - 0.5;
          for (let x = -10; x <= W + 10; x += step) {
            const nx = x / W;
            const wave = Math.sin(nx * rb.f * 6.2832 + t * rb.s + rb.ph) + 0.38 * Math.sin(nx * rb.f * 13 - t * rb.s * 1.4 + rb.ph);
            const twist = 1 + 0.85 * Math.sin(nx * 3.1 + t * 0.55 + rb.ph);
            const y = H * (rb.base + rb.amp * wave) + u * rb.spread * H * twist;
            const sweep = 0.5 + 0.5 * Math.sin(nx * 7 - t * 1.25 + k * 1.7);          // travelling shimmer
            const edge = 1 - Math.abs(u) * 1.5;                                          // brighter toward ribbon centre
            // keep the copy readable: calm the dots where the text sits (left on desktop, upper area on mobile)
            const calm = mobile ? (y < H * 0.6 ? 0.28 : 1) : 0.26 + 0.74 * Math.min(1, Math.max(0, (nx - 0.2) / 0.38));
            const a = Math.max(0.03, (0.12 + 0.7 * sweep * sweep) * edge) * calm;
            const r = 0.7 + 1.1 * sweep * edge;
            ctx.fillStyle = sweep > 0.82 ? `rgba(240, 225, 180, ${a})` : `rgba(210, 189, 126, ${a})`;
            ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
          }
        }
      });

      // glass sphere
      let g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      g.addColorStop(0, 'rgba(231, 214, 164, .10)'); g.addColorStop(0.65, 'rgba(42, 35, 13, .28)'); g.addColorStop(1, 'rgba(210, 189, 126, .30)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill();
      glow(cx, cy + R * 0.95, R * 0.9, 'rgba(210, 189, 126, .5)');                    // bottom light
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
      glow(cx - R * 0.35, cy - R * 0.55, R * 0.7, 'rgba(255, 255, 255, .22)', 'rgba(255, 255, 255, 0)');   // top-left sheen
      ctx.restore();
      ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(235, 218, 165, .6)'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.stroke();
      ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(210, 189, 126, .08)'; ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, 6.2832); ctx.stroke();

      // orbit rings + travelling nodes
      const rings = [
        { rx: R * 2.15, ry: R * 0.72, rot: -0.28, nodes: [[0.0, 0.32], [3.4, 0.32]] },
        { rx: R * 1.8, ry: R * 0.98, rot: 0.38, nodes: [[1.7, -0.26]] },
        { rx: R * 2.6, ry: R * 1.05, rot: -0.1, nodes: [[5.0, 0.18]] },
      ];
      rings.forEach((rg) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rg.rot);
        ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(230, 211, 155, .34)'; ctx.beginPath(); ctx.ellipse(0, 0, rg.rx, rg.ry, 0, 0, 6.2832); ctx.stroke();
        rg.nodes.forEach(([ph, sp]) => {
          const a = ph + t * sp;
          for (let k = 14; k >= 0; k--) {                                              // fading trail behind the node
            const aa = a - k * 0.045 * Math.sign(sp), px = Math.cos(aa) * rg.rx, py = Math.sin(aa) * rg.ry;
            ctx.fillStyle = `rgba(241, 227, 184, ${0.5 * (1 - k / 15)})`; ctx.beginPath(); ctx.arc(px, py, 2.2 * (1 - k / 18), 0, 6.2832); ctx.fill();
          }
          const px = Math.cos(a) * rg.rx, py = Math.sin(a) * rg.ry;
          glow(px, py, 16, 'rgba(242, 230, 193, .85)', 'rgba(210, 189, 126, 0)');
          ctx.fillStyle = '#faf6e8'; ctx.beginPath(); ctx.arc(px, py, 3.6, 0, 6.2832); ctx.fill();
        });
        ctx.restore();
      });
    };

    const loop = (now) => { if (visible) draw(now); raf = requestAnimationFrame(loop); };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.02 });
    io.observe(cv);
    if (reduce) draw(0); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} className={`ai-wave ${className}`} aria-hidden="true" />;
}
