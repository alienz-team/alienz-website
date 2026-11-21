import Image from "next/image";
import { pillars, type Pillar } from "@/lib/content";
import type { ServiceView } from "@/lib/site-data";
import { ArrowLeft, Spark } from "./Icons";

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
          {pillars.map((p) => {
            const items = p.slugs.map((s) => bySlug.get(s)).filter((s): s is ServiceView => !!s);
            if (p.id === "production") items.push(...extra);
            return <PillarCard key={p.id} pillar={p} items={items} className={layout[p.id] ?? "lg:col-span-2"} />;
          })}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, items, className }: { pillar: Pillar; items: ServiceView[]; className: string }) {
  const hero = pillar.id === "software";
  return (
    <article
      data-spot
      className={`glass spot group flex flex-col overflow-hidden rounded-lg transition-colors hover:border-alien/30 ${className} ${
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
