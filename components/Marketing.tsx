"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { marketing } from "@/lib/content";
import type { ProjectView } from "@/lib/site-data";
import { ArrowLeft, ArrowRight, Spark } from "./Icons";

// Campaign album as a scroll-snap rail with prev/next controls — the
// horizontal "selected work" rail from original-effect, kept native so it
// works with touch, trackpad and keyboard.
export function Marketing({ projects }: { projects: ProjectView[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = projects.length;

  const scrollTo = useCallback((i: number) => {
    const el = rail.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  useEffect(() => {
    const root = rail.current;
    if (!root) return;
    // Several slides can be visible at once; report the most visible one,
    // preferring the earlier slide on a tie.
    const ratios = new Map<number, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(Number((e.target as HTMLElement).dataset.i), e.intersectionRatio));
        let best = 0;
        let bestRatio = -1;
        [...ratios.entries()]
          .sort((a, b) => a[0] - b[0])
          .forEach(([i, r]) => {
            if (r > bestRatio + 0.05) {
              best = i;
              bestRatio = r;
            }
          });
        setIndex(best);
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    Array.from(root.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [total]);

  return (
    <section id="marketing" aria-labelledby="marketing-title" className="starfield border-t border-line bg-orbit py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <h2 id="marketing-title" className="text-4xl font-black sm:text-5xl">
            {marketing.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-haze">{marketing.intro}</p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
          {marketing.offerings.map((o) => (
            <li key={o} className="flex items-start gap-3 border-b border-line py-4 text-lg">
              <Spark className="mt-2 h-4 w-4 shrink-0 text-alien" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {total > 0 && (
        <>
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-haze" aria-live="polite">
            <span className="font-latin text-starlight">{index + 1}</span> من <span className="font-latin">{total}</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollTo(Math.max(0, index - 1))}
              disabled={index === 0}
              aria-label="التصميم السابق"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-alien hover:text-alien disabled:opacity-35 disabled:hover:border-line disabled:hover:text-current"
            >
              <ArrowRight />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(Math.min(total - 1, index + 1))}
              disabled={index === total - 1}
              aria-label="التصميم التالي"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:border-alien hover:text-alien disabled:opacity-35 disabled:hover:border-line disabled:hover:text-current"
            >
              <ArrowLeft />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        role="region"
        aria-label="ألبوم تصاميم الحملات"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((img, i) => (
          <figure
            key={`${img.src}-${i}`}
            data-i={i}
            className="chamfer relative w-[85%] shrink-0 snap-start overflow-hidden bg-space sm:w-[60%] lg:w-[46%]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              sizes="(min-width: 1024px) 46vw, 85vw"
              className="aspect-video h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </figure>
        ))}
      </div>
        </>
      )}
    </section>
  );
}
