"use client";

import { useEffect, useState } from "react";

/* Hero showcase: crossfades through the scenes every few seconds.
   Image files are served as-is from public/media. Only the current and
   next slide are mounted, so the large scenes load one step ahead
   instead of all at once. Auto-advance is off under reduced motion
   and paused while the pointer rests on the scene. */

const SLIDES = [
  "/media/aliens-hero.webp",
  "/media/Gemini_Generated_Image_rdwqeerdwqeerdwq.jpg",
  "/media/Gemini_Generated_Image_rdwqeerdwqeerdwq (1).jpg",
  "/media/Gemini_Generated_Image_rdwqeerdwqeerdwq (2).jpg",
  "/media/Gemini_Generated_Image_rdwqeerdwqeerdwq (3).jpg",
].map(encodeURI);

const INTERVAL_MS = 4000;

export function ShowcaseSlides({ alts }: { alts: readonly string[] }) {
  const n = SLIDES.length;
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(1);
  const [loaded, setLoaded] = useState<boolean[]>(() => SLIDES.map((_, i) => i === 0));
  const [still, setStill] = useState(true); // reduced motion (assume until checked)
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const next = (active + 1) % n;

  // Mount the upcoming slide so it is decoded before its turn.
  useEffect(() => {
    if (!still) setMounted((m) => Math.max(m, Math.min(n, active + 2)));
  }, [active, still, n]);

  useEffect(() => {
    if (still || paused || !loaded[next]) return;
    const t = window.setTimeout(() => setActive(next), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [still, paused, loaded, next]);

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {SLIDES.slice(0, mounted).map((src, i) => (
        // Plain <img>: no Next image optimizer on Workers.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={alts[i] ?? ""}
          aria-hidden={i !== active}
          width={i === 0 ? 1100 : 2752}
          height={i === 0 ? 1035 : 1536}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          onLoad={() => setLoaded((l) => (l[i] ? l : l.map((v, j) => v || j === i)))}
          className={`station-img absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
