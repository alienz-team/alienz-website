"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { projectCategories } from "@/lib/content";
import type { ProjectView } from "@/lib/site-data";
import { Expand } from "./Icons";
import { ProjectDialog } from "./ProjectDialog";

export type CategorizedProject = ProjectView & { category: string; categoryLabel: string };

function categorize(p: ProjectView): CategorizedProject {
  const text = `${p.title} ${p.alt}`;
  const c = projectCategories.find((c) => c.match.test(text)) ?? projectCategories[projectCategories.length - 1];
  // Placeholder titles like "تصميم 3" read as noise; use the alt text's lead clause instead.
  const title = /^تصميم\s*\d+$/.test(p.title.trim()) ? p.alt.split(/[:،]/)[0].trim() || p.title : p.title;
  return { ...p, title, category: c.id, categoryLabel: c.label };
}

export function Portfolio({ projects }: { projects: ProjectView[] }) {
  const all = useMemo(() => projects.map(categorize), [projects]);
  const filters = useMemo(
    () => projectCategories.filter((c) => all.some((p) => p.category === c.id)),
    [all],
  );
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  if (all.length === 0) return null;
  const visible = filter === "all" ? all : all.filter((p) => p.category === filter);

  // Return focus to the card that opened the dialog, even after stepping.
  const close = () => {
    setOpen(null);
    // Wait for the modal to unmount: while it is open the page is inert.
    requestAnimationFrame(() => opener.current?.focus());
  };

  return (
    <section id="work" aria-labelledby="work-title" className="relative border-t border-line bg-orbit/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p dir="ltr" className="text-right font-latin text-sm font-medium text-alien">Selected work</p>
            <h2 id="work-title" className="mt-2 text-4xl font-black sm:text-5xl">من أعمالنا</h2>
            <p className="mt-4 text-lg text-haze">حملات وتصاميم نفذناها لعملائنا ولعلامتنا. اختر عملاً لتراه كاملاً.</p>
          </div>

          {filters.length > 1 && (
            <div role="group" aria-label="تصفية الأعمال حسب النوع" className="flex flex-wrap gap-2">
              {[{ id: "all", label: "الكل" }, ...filters].map((f) => {
                const count = f.id === "all" ? all.length : all.filter((p) => p.category === f.id).length;
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={`chamfer-sm inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold transition-colors ${
                      on
                        ? "border-alien bg-alien text-space"
                        : "border-line bg-space text-haze hover:border-alien/50 hover:text-starlight"
                    }`}
                  >
                    {f.label}
                    <span className={`font-latin text-xs ${on ? "text-space/70" : "text-haze/70"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const index = all.indexOf(p);
            const feature = i === 0 && visible.length > 2;
            return (
              <li key={p.id} className={feature ? "sm:col-span-2 lg:row-span-2" : ""}>
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(index);
                  }}
                  aria-haspopup="dialog"
                  data-spot
                  className="spot group flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/[0.07] bg-space text-right transition-colors hover:border-alien/40"
                >
                  <div
                    className={`relative w-full overflow-hidden ${
                      feature ? "aspect-[16/10] lg:aspect-auto lg:min-h-[24rem] lg:flex-1" : "aspect-video"
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes={feature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex w-full items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-alien">{p.categoryLabel}</p>
                      <h3 className="mt-0.5 truncate font-bold text-starlight">{p.title}</h3>
                    </div>
                    <span className="chamfer-sm inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line text-haze transition-colors group-hover:border-alien group-hover:text-alien">
                      <Expand className="h-4 w-4" />
                      <span className="sr-only">عرض التفاصيل</span>
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {open !== null && (
        <ProjectDialog
          project={all[open]}
          position={{ index: open, total: all.length }}
          onClose={close}
          onStep={(d) => setOpen((open + d + all.length) % all.length)}
        />
      )}
    </section>
  );
}
