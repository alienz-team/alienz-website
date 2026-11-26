import type { CSSProperties } from "react";
import type { Pillar } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import type { ServiceView } from "@/lib/site-data";
import { ArrowLeft, Spark } from "./Icons";
import { Odometer } from "./Odometer";

/* Seven cards on a 4-column bento (lg), filled with no gaps:
     row 1-2: software (2x2) · ai (1x2) · brand
                                         · motion
     row 3:   photo · audio · marketing (2x1)
   On sm (2 columns) software spans the row and the other six pair up. */
const layout: Record<string, string> = {
  software: "sm:col-span-2 lg:row-span-2",
  ai: "lg:row-span-2",
  marketing: "lg:col-span-2",
};

export function Services({ t, services }: { t: Dict; services: ServiceView[] }) {
  const pillars = t.pillars;
  const showEyebrow = t.locale === "ar";
  const bySlug = new Map(services.map((s) => [s.id, s]));
  const claimed = new Set(pillars.flatMap((p) => p.slugs));
  // Services an admin adds later still show up, in the catch-all card.
  const extra = services.filter((s) => !claimed.has(s.id));

  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p dir="ltr" className="rtl:text-right font-latin text-sm font-medium text-alien">
              Services <span className="text-haze">/ {String(pillars.length).padStart(2, "0")}</span>
            </p>
            <h2 id="services-title" className="mt-2 text-4xl font-black sm:text-5xl">
              {t.services.heading}
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-alien hover:text-starlight">
            {t.services.consult}
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const items = p.slugs.map((s) => bySlug.get(s)).filter((s): s is ServiceView => !!s);
            if (p.catchAll) items.push(...extra);
            return <PillarCard key={p.id} pillar={p} items={items} order={i} eyebrow={showEyebrow} className={layout[p.id] ?? ""} />;
          })}
        </div>
      </div>
    </section>
  );
}

type CardProps = { pillar: Pillar; items: ServiceView[]; order: number; eyebrow: boolean; className: string };

function PillarCard({ pillar, items, order, eyebrow, className }: CardProps) {
  const featured = pillar.id === "software";
  const wide = pillar.id === "marketing";
  // One service per card: its admin-editable description is the blurb.
  const blurb = items.length === 1 ? items[0].description : pillar.blurb;
  const list = items.length > 1 ? items : [];

  return (
    <article
      data-spot
      data-reveal
      style={{ "--rd": `${(order % 4) * 80}ms` } as CSSProperties}
      className={`glass spot beam group flex flex-col overflow-hidden rounded-lg hover:border-alien-bright/30 hover:shadow-[0_0_60px_-18px_rgb(0_255_102/0.45)] ${className}`}
    >
      <div className={`relative overflow-hidden border-b border-veil/[0.06] ${featured ? "aspect-[2/1]" : "aspect-[2/1] lg:aspect-[16/7]"}`}>
        {/* Plain <img>: static SVG served as-is on Workers, animations included. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pillar.image}
          alt=""
          width={400}
          height={200}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-orbit/90 via-transparent to-transparent" />
        <span
          dir="ltr"
          className="absolute top-3 end-3 font-latin text-[0.65rem] tracking-[0.2em] text-alien-bright/70"
          aria-hidden
        >
          {String(order + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-7" : "p-5 sm:p-6"}`}>
        {eyebrow && (
          <p dir="ltr" className="rtl:text-right font-latin text-xs font-medium text-alien">
            {pillar.en}
          </p>
        )}
        <h3 className={`${eyebrow ? "mt-1.5" : ""} font-bold ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>{pillar.title}</h3>
        <p className={`mt-2.5 text-haze ${featured ? "" : "text-[0.95rem] leading-relaxed"}`}>{blurb}</p>

        {(pillar.metric || pillar.gauge) && (
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-veil/[0.07] py-5">
            {pillar.gauge && <Gauge pct={pillar.gauge.pct} label={pillar.gauge.label} />}
            {pillar.metric && (
              <div>
                <Odometer value={pillar.metric.value} className="text-4xl font-bold text-starlight sm:text-5xl" />
                <p className="mt-1.5 text-sm text-haze">{pillar.metric.label}</p>
              </div>
            )}
          </div>
        )}

        {(list.length > 0 || pillar.points) && (
          <ul className={`mt-5 grid gap-x-6 gap-y-3 ${featured || wide ? "sm:grid-cols-2" : ""}`}>
            {list.map((s) => (
              <li key={s.id} className="border-t border-veil/[0.07] pt-3">
                <p className="font-semibold text-starlight">{s.title}</p>
                {featured && <p className="mt-1 text-sm text-haze">{s.description}</p>}
              </li>
            ))}
            {pillar.points?.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-starlight/90">
                <Spark className="mt-1.5 h-3.5 w-3.5 shrink-0 text-alien-bright" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/** Radial gauge: the arc sweeps to `pct` and the readout rolls up each time
 *  the card scrolls into view. */
function Gauge({ pct, label }: { pct: number; label: string }) {
  const style = { "--g": pct / 100 } as CSSProperties;
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 100 100" className="gauge h-full w-full -rotate-90" style={style} aria-hidden>
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="6" className="text-veil" />
          <circle cx="50" cy="50" r="42" fill="none" style={{ stroke: "var(--color-alien-bright)" }} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1 5.6" />
          <circle className="gauge-arc" cx="50" cy="50" r="42" fill="none" style={{ stroke: "var(--color-alien-bright)" }} strokeWidth="6" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <Odometer value={`${pct}%`} className="text-lg font-bold text-starlight" />
        </div>
      </div>
      <p className="max-w-[8rem] text-sm leading-snug text-haze">{label}</p>
    </div>
  );
}
