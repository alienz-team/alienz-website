"use client";

import { useEffect } from "react";

/** Page-wide motion, driven from one place:
 *  - `[data-reveal]` elements get `data-inview` toggled both ways, so they
 *    fade in every time they enter the viewport (not just once).
 *  - `[data-scroll-stage]` elements get `--sp` (-1..1, 0 when centred) from
 *    scroll position and `--px` / `--py` (-1..1) from the mouse.
 *  Reduced-motion users get none of it; CSS then shows final states. */
export function MotionDirector() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).dataset.inview = String(e.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-stage]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const s of stages) {
        const r = s.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const p = (vh / 2 - (r.top + r.height / 2)) / vh;
        s.style.setProperty("--sp", Math.max(-1, Math.min(1, p)).toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const cleanups = stages.map((s) => {
      let tilt = 0;
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        cancelAnimationFrame(tilt);
        tilt = requestAnimationFrame(() => {
          const r = s.getBoundingClientRect();
          s.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          s.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        });
      };
      const leave = () => {
        cancelAnimationFrame(tilt);
        s.style.setProperty("--px", "0");
        s.style.setProperty("--py", "0");
      };
      s.addEventListener("pointermove", move, { passive: true });
      s.addEventListener("pointerleave", leave);
      return () => {
        cancelAnimationFrame(tilt);
        s.removeEventListener("pointermove", move);
        s.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cleanups.forEach((c) => c());
      root.classList.remove("motion");
    };
  }, []);
  return null;
}
