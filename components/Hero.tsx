import type { Dict } from "@/lib/i18n";
import { AlienStation } from "./AlienStation";
import { ArrowLeft } from "./Icons";
import { MatrixRain } from "./MatrixRain";
import { TripoliClock } from "./TripoliClock";

type Props = { t: Dict; servicesCount: number; projectsCount: number };

export function Hero({ t, servicesCount, projectsCount }: Props) {
  const hero = t.hero;
  // Arabic letters join, so the reveal staggers whole words, never letters.
  const words = t.brand.tagline.split(" ");
  const stats = [
    { label: hero.stats.services, value: <span className="font-latin">{String(servicesCount).padStart(2, "0")}</span> },
    { label: hero.stats.works, value: <span className="font-latin">{String(projectsCount).padStart(2, "0")}</span> },
    { label: hero.stats.clock, value: <TripoliClock /> },
  ];

  return (
    <section id="top" data-spot className="relative overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-alien/40 bg-alien/[0.07] px-3 py-1.5 text-xs font-semibold sm:text-sm text-alien-bright shadow-[0_0_24px_-6px_rgb(0_255_102/0.6)] animate-rise">
            <span className="h-2 w-2 rounded-full bg-alien-bright animate-pulse-dot" aria-hidden />
            {hero.badge}
          </p>

          <h1 className="hero-title mt-5 text-[clamp(2rem,7.5vw,4.25rem)] break-words leading-[1.15] font-black text-starlight">
            {words.map((w, i) => (
              <span key={w + i}>
                <span className="inline-block animate-rise" style={{ animationDelay: `${120 + i * 140}ms` }}>
                  {w}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-haze animate-rise sm:text-lg" style={{ animationDelay: "560ms" }}>
            {hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: "700ms" }}>
            <a
              href="#contact"
              className="btn-glow group inline-flex items-center gap-3 rounded-md px-6 py-3.5 text-base font-bold text-space sm:text-lg"
            >
              {hero.primary}
              <ArrowLeft className="transition-transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-md border border-starlight/20 bg-transparent px-6 py-3.5 text-base font-semibold text-starlight sm:text-lg transition-colors hover:border-alien-bright/70 hover:text-alien-bright"
            >
              {hero.secondary}
            </a>
          </div>
        </div>

        {/* lg:order-first puts the scene at the reading start (right in Arabic). */}
        <div className="relative lg:order-first lg:col-span-6">
          <AlienStation alt={t.heroAlt} />
          <div className="glass relative z-10 mx-auto -mt-6 grid max-w-md grid-cols-3 divide-x rtl:divide-x-reverse divide-veil/10 rounded-md bg-space/70 animate-rise" style={{ animationDelay: "900ms" }}>
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
