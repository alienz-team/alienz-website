import { brand, hero } from "@/lib/content";
import { AlienStation } from "./AlienStation";
import { ArrowLeft } from "./Icons";
import { MatrixRain } from "./MatrixRain";
import { TripoliClock } from "./TripoliClock";

type Props = { servicesCount: number; projectsCount: number };

export function Hero({ servicesCount, projectsCount }: Props) {
  // Arabic letters join, so the reveal staggers whole words, never letters.
  const words = brand.tagline.split(" ");
  const stats = [
    { label: "خدمات متاحة", value: <span className="font-latin">{String(servicesCount).padStart(2, "0")}</span> },
    { label: "أعمال منشورة", value: <span className="font-latin">{String(projectsCount).padStart(2, "0")}</span> },
    { label: "التوقيت في طرابلس", value: <TripoliClock /> },
  ];

  return (
    <section id="top" data-spot className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Honeycomb: a dim base layer and a lit copy masked around the pointer. */}
      <div aria-hidden className="hexgrid hexgrid-drift pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div aria-hidden className="hexgrid hexgrid-lit pointer-events-none absolute inset-0 opacity-60" />
      {/* Falling code, screened over the lattice at low opacity. */}
      <MatrixRain className="rain-mask absolute inset-0 h-full w-full opacity-[0.16]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-alien/10 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-space to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-alien/40 bg-alien/[0.07] px-3.5 py-1.5 text-sm font-semibold text-alien-bright shadow-[0_0_24px_-6px_rgb(0_255_102/0.6)] animate-rise">
            <span className="h-2 w-2 rounded-full bg-alien-bright animate-pulse-dot" aria-hidden />
            {hero.badge}
          </p>

          <h1 className="hero-title mt-7 text-[clamp(2.9rem,7.6vw,6.2rem)] leading-[1.1] font-black text-starlight">
            {words.map((w, i) => (
              <span key={w + i}>
                <span className="inline-block animate-rise" style={{ animationDelay: `${120 + i * 140}ms` }}>
                  {w}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-loose text-haze animate-rise sm:text-xl" style={{ animationDelay: "560ms" }}>
            {hero.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "700ms" }}>
            <a
              href="#contact"
              className="btn-glow group inline-flex items-center gap-3 rounded-md px-7 py-4 text-lg font-bold text-space"
            >
              {hero.primary}
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-md border border-starlight/20 bg-transparent px-7 py-4 text-lg font-semibold text-starlight transition-colors hover:border-alien-bright/70 hover:text-alien-bright"
            >
              {hero.secondary}
            </a>
          </div>
        </div>

        {/* lg:order-first puts the scene on the right in RTL. */}
        <div className="relative lg:order-first lg:col-span-6">
          <AlienStation />
          <div className="glass relative z-10 mx-auto -mt-6 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-white/10 rounded-md bg-space/70 animate-rise" style={{ animationDelay: "900ms" }}>
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-3.5 sm:px-4">
                <p className="text-lg font-bold text-starlight sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-xs text-haze">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
