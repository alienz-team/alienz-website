import Image from "next/image";
import { pillars, type Pillar } from "@/lib/content";
import type { ServiceView } from "@/lib/site-data";
import type { CSSProperties } from "react";
import { ArrowLeft, Spark } from "./Icons";
import { Odometer } from "./Odometer";

// Bento layout per pillar on a 6-column grid (EmpireAI's platform grid).
const layout: Record<string, string> = {
  software: "lg:col-span-4 lg:row-span-2",
  ai: "lg:col-span-2 lg:row-span-2",
  brand: "lg:col-span-2",
  marketing: "lg:col-span-2",
  production: "lg:col-span-2",
};

export function Services({ services }: { services: ServiceView[] }) {
  const bySlug = new Map(services.map((s) => [s.id, s]));
  const claimed = new Set(pillars.flatMap((p) => p.slugs));
  // Services an admin adds later still show up, in the production tile.
  const extra = services.filter((s) => !claimed.has(s.id));

  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p dir="ltr" className="text-right font-latin text-sm font-medium text-alien">Services</p>
            <h2 id="services-title" className="mt-2 text-4xl font-black sm:text-5xl">
              كل ما يحتاجه مشروعك الرقمي، من فريق واحد
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-alien hover:text-starlight">
            اطلب استشارة
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(16rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {pillars.map((p, i) => {
            const items = p.slugs.map((s) => bySlug.get(s)).filter((s): s is ServiceView => !!s);
            if (p.id === "production") items.push(...extra);
            return (
              <PillarCard key={p.id} pillar={p} items={items} order={i} className={layout[p.id] ?? "lg:col-span-2"} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

type CardProps = { pillar: Pillar; items: ServiceView[]; order: number; className: string };

function PillarCard({ pillar, items, order, className }: CardProps) {
  const hero = pillar.id === "software";
  return (
    <article
      data-spot
      data-reveal
      style={{ "--rd": `${(order % 3) * 90}ms` } as CSSProperties}
      className={`glass spot beam group flex flex-col overflow-hidden rounded-lg hover:border-alien-bright/30 hover:shadow-[0_0_60px_-18px_rgb(0_255_102/0.45)] ${className} ${
        hero ? "sm:col-span-2" : ""
      }`}
    >
      {pillar.image && (
        <div className={`relative overflow-hidden ${hero ? "aspect-[16/8]" : "aspect-[16/7]"}`}>
          <Image
            src={pillar.image}
            alt=""
            fill
            sizes={hero ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-orbit via-orbit/30 to-transparent" />
        </div>
      )}
      {pillar.id === "ai" && <AgentMesh />}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p dir="ltr" className="text-right font-latin text-xs font-medium text-alien">
          {pillar.en}
        </p>
        <h3 className={`mt-1.5 font-bold ${hero ? "text-3xl" : "text-2xl"}`}>{pillar.title}</h3>
        <p className="mt-3 text-haze">{pillar.blurb}</p>

        {(pillar.metric || pillar.gauge) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-white/[0.07] py-5">
            {pillar.gauge && <Gauge pct={pillar.gauge.pct} label={pillar.gauge.label} />}
            {pillar.metric && (
              <div>
                <Odometer value={pillar.metric.value} className="text-4xl font-bold text-starlight sm:text-5xl" />
                <p className="mt-1.5 text-sm text-haze">{pillar.metric.label}</p>
              </div>
            )}
          </div>
        )}

        {(items.length > 0 || pillar.points) && (
          <ul className={`mt-6 grid gap-x-6 gap-y-3 ${hero ? "sm:grid-cols-2" : ""}`}>
            {items.map((s) => (
              <li key={s.id} className="border-t border-white/[0.07] pt-3">
                <p className="font-semibold text-starlight">{s.title}</p>
                {hero && <p className="mt-1 text-sm text-haze">{s.description}</p>}
              </li>
            ))}
            {pillar.points?.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-starlight/90">
                <Spark className="mt-1.5 h-3.5 w-3.5 shrink-0 text-alien" />
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
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#00ff66" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1 5.6" />
          <circle className="gauge-arc" cx="50" cy="50" r="42" fill="none" stroke="#00ff66" strokeWidth="6" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <Odometer value={`${pct}%`} className="text-lg font-bold text-starlight" />
        </div>
      </div>
      <p className="max-w-[8rem] text-sm leading-snug text-haze">{label}</p>
    </div>
  );
}

/** A small agent graph: one orchestrator hex linked to three worker hexes. */
function AgentMesh() {
  const nodes = [
    { x: 60, y: 30 },
    { x: 200, y: 22 },
    { x: 220, y: 108 },
    { x: 70, y: 112 },
  ];
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  return (
    <div aria-hidden className="relative border-b border-white/[0.07] px-6 pt-6">
      <svg viewBox="0 0 280 140" className="h-36 w-full">
        {nodes.map((n, i) => (
          <line key={i} x1={140} y1={70} x2={n.x} y2={n.y} stroke="#10B981" strokeOpacity="0.45" strokeDasharray="3 4">
            <animate attributeName="stroke-dashoffset" from="14" to="0" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}
        {nodes.map((n, i) => (
          <polygon key={i} points={hex(n.x, n.y, 13)} fill="#0B0E17" stroke="#10B981" strokeOpacity="0.7" />
        ))}
        <polygon points={hex(140, 70, 24)} fill="rgb(16 185 129 / 0.12)" stroke="#00FF66" />
        <circle cx="140" cy="70" r="4" fill="#00FF66" />
      </svg>
    </div>
  );
}
