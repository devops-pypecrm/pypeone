import { useEffect, useRef } from 'react';

const SATELLITES = ['PypeCRM', 'PypeERM', 'Pype Campus', 'The web'];

/**
 * Animated "brain" orb: a rotating sphere of neurons joined by synapses, with pulses travelling along them,
 * a breathing core and orbiting source chips. Canvas 2D, DPR-aware, pauses off-screen, static under reduced motion.
 */
export default function NeuralOrb({ className = '', labels = true, density = 1, label = 'Animated neural network orb' }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, raf = 0, visible = true;
    const t0 = performance.now();

    // Neurons on a Fibonacci sphere
    const N = Math.round(120 * density);
    const nodes = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, ph: Math.random() * 6.283 };
    });
    // Synapses: connect each neuron to its nearest few
    const edges = [];
    nodes.forEach((a, i) => {
      nodes.map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
        .filter((o) => o.j > i && o.d < 0.5).sort((p, q) => p.d - q.d).slice(0, 3).forEach((o) => edges.push([i, o.j]));
    });
    const pulses = Array.from({ length: Math.round(26 * density) }, () => ({ e: Math.floor(Math.random() * edges.length), p: Math.random(), v: 0.25 + Math.random() * 0.5 }));

    const resize = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const t = reduce ? 2.4 : (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.245;
      const a = t * 0.22, tilt = 0.38 + Math.sin(t * 0.3) * 0.08;
      const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt);

      // glow + breathing core
      const breathe = 1 + Math.sin(t * 1.4) * 0.06;
      let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.1 * breathe);
      g.addColorStop(0, 'rgba(255, 170, 90, .55)'); g.addColorStop(0.25, 'rgba(249, 115, 22, .28)'); g.addColorStop(1, 'rgba(26, 15, 8, 0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // project neurons
      const P = nodes.map((n) => {
        const x1 = n.x * ca + n.z * sa, z1 = -n.x * sa + n.z * ca, y1 = n.y * ct - z1 * st, z2 = n.y * st + z1 * ct;
        const f = 1 + z2 * 0.28;
        return { x: cx + x1 * R * f, y: cy + y1 * R * f, d: (z2 + 1) / 2 };
      });

      // rings behind
      const ring = (rx, ry, rot, alpha, dash) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 190, 130, ${alpha})`; ctx.lineWidth = 1; ctx.setLineDash(dash); ctx.stroke(); ctx.restore();
      };
      ring(R * 1.55, R * 0.55, -0.35 + t * 0.03, 0.22, []);
      ring(R * 1.85, R * 0.7, 0.5 - t * 0.02, 0.14, [4, 8]);

      // synapses
      ctx.lineWidth = 0.8; ctx.setLineDash([]);
      edges.forEach(([i, j]) => {
        const d = (P[i].d + P[j].d) / 2;
        ctx.strokeStyle = `rgba(255, 150, 70, ${0.05 + d * 0.3})`;
        ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke();
      });

      // pulses travelling along synapses
      pulses.forEach((p) => {
        if (!reduce) { p.p += p.v * 0.016; if (p.p > 1) { p.p = 0; p.e = Math.floor(Math.random() * edges.length); } }
        const [i, j] = edges[p.e], x = P[i].x + (P[j].x - P[i].x) * p.p, y = P[i].y + (P[j].y - P[i].y) * p.p, d = (P[i].d + P[j].d) / 2;
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 7);
        pg.addColorStop(0, `rgba(255, 230, 150, ${0.35 + d * 0.65})`); pg.addColorStop(1, 'rgba(255, 230, 150, 0)');
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.283); ctx.fill();
      });

      // neurons
      nodes.forEach((n, i) => {
        const tw = 0.6 + 0.4 * Math.sin(t * 2 + n.ph), rr = 1 + P[i].d * 2.2 * tw;
        ctx.fillStyle = `rgba(255, 225, 190, ${0.25 + P[i].d * 0.75})`;
        ctx.beginPath(); ctx.arc(P[i].x, P[i].y, rr, 0, 6.283); ctx.fill();
      });

      // bright core
      g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5 * breathe);
      g.addColorStop(0, 'rgba(255, 255, 255, .55)'); g.addColorStop(0.4, 'rgba(255, 200, 140, .25)'); g.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 0.5 * breathe, 0, 6.283); ctx.fill();

      // orbiting source chips
      if (labels && W > 260) {
        ctx.font = '600 12px "Plus Jakarta Sans", system-ui, sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
        SATELLITES.map((s, k) => {
          const ang = t * 0.35 + (k * Math.PI * 2) / SATELLITES.length, rx = R * 1.62, ry = R * 0.62, rot = -0.35 + t * 0.03;
          const ex = Math.cos(ang) * rx, ey = Math.sin(ang) * ry;
          return { s, x: cx + ex * Math.cos(rot) - ey * Math.sin(rot), y: cy + ex * Math.sin(rot) + ey * Math.cos(rot), front: Math.sin(ang) > 0 };
        }).sort((p, q) => p.front - q.front).forEach(({ s, x, y, front }) => {
          const w = ctx.measureText(s).width + 22, h = 24;
          ctx.globalAlpha = front ? 1 : 0.55;
          ctx.fillStyle = 'rgba(43, 26, 14, .85)'; ctx.strokeStyle = 'rgba(255, 170, 100, .55)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 12); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#fff1e4'; ctx.fillText(s, x, y + 0.5); ctx.globalAlpha = 1;
        });
      }
    };

    const loop = (now) => { if (visible) draw(now); raf = requestAnimationFrame(loop); };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(cv);
    if (reduce) draw(0); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [density, labels]);

  return <canvas ref={ref} className={`orb ${className}`} role="img" aria-label={label} />;
}
