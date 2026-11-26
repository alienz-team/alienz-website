"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789ABCDEFXZ<>{}/=+*";
const CELL = 16;
const FRAME_MS = 55; // ~18fps is plenty for falling glyphs

/** Falling glyph rain on a canvas. It paints on black so `mix-blend-screen`
 *  drops the background; it stops drawing while off screen and is skipped
 *  entirely for reduced-motion users. */
export function MatrixRain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${CELL - 3}px ui-monospace, monospace`;
      drops = Array.from({ length: Math.ceil(w / CELL) }, () => Math.floor((Math.random() * -h) / CELL));
    };

    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      if (t - last < FRAME_MS) return;
      last = t;
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * CELL;
        if (y > 0) {
          ctx.fillStyle = Math.random() > 0.95 ? "#d6ffe5" : "#00ff66";
          ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * CELL, y);
        }
        drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`rain pointer-events-none mix-blend-screen ${className}`} />;
}
