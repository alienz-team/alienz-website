"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { ServiceView } from "@/lib/site-data";
import { ArrowLeft } from "./Icons";

// Tabbed service explorer, structured after EmpireAI's "engines" selector:
// a list of names on one side, one detailed panel on the other.
export function Services({ services }: { services: ServiceView[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = services[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = services.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 id="services-title" className="text-4xl font-black sm:text-5xl">
              الخدمات
            </h2>
            <p className="mt-4 text-lg text-haze">
              من الكود إلى الكاميرا إلى الميكروفون: ست خدمات تحت سقف فريق واحد.
            </p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-alien hover:text-starlight">
            اطلب خدمة
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div role="tablist" aria-orientation="vertical" aria-label="قائمة الخدمات" className="lg:col-span-5">
            {services.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`tab-${s.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group relative flex w-full items-center justify-between gap-4 border-b border-line py-5 text-right transition-colors ${
                    selected ? "text-starlight" : "text-haze hover:text-starlight"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-0 right-0 h-full w-1 bg-alien transition-transform duration-300 origin-top ${
                      selected ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <span className={`font-display text-xl font-bold transition-[padding] duration-300 sm:text-2xl ${selected ? "pr-5" : "pr-0"}`}>
                    {s.title}
                  </span>
                  <ArrowLeft
                    className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                      selected ? "translate-x-0 text-alien opacity-100" : "translate-x-2 opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div
            key={current.id}
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className="animate-rise lg:col-span-7"
            style={{ animationDuration: "0.5s" }}
          >
            <div className="chamfer relative aspect-[16/10] overflow-hidden bg-orbit">
              <Image
                src={current.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-lg">
                <h3 className="text-2xl font-bold">{current.title}</h3>
                <p className="mt-2 text-lg text-haze">{current.description}</p>
              </div>
              <a
                href="#contact"
                className="chamfer-sm inline-flex shrink-0 items-center gap-2 self-start border border-alien px-5 py-3 font-semibold text-alien transition-colors hover:bg-alien hover:text-space"
              >
                ابدأ مشروعك
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
