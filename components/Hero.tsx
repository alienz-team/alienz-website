import Image from "next/image";
import { brand, hero } from "@/lib/content";
import { ArrowLeft } from "./Icons";
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
      <div aria-hidden className="hexgrid pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div aria-hidden className="hexgrid hexgrid-lit pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-alien/10 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-space to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 border border-alien/40 bg-alien/[0.07] px-3.5 py-1.5 text-sm font-semibold text-alien shadow-[0_0_24px_-6px_rgb(16_185_129/0.6)] animate-rise">
            <span className="h-2 w-2 rounded-full bg-alien-bright animate-pulse-dot" aria-hidden />
            {hero.badge}
          </p>

          <h1 className="mt-7 text-[clamp(2.9rem,8.4vw,6.6rem)] leading-[1.1] font-black text-starlight">
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

          <div className="mt-10 flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: "700ms" }}>
            <a
              href="#contact"
              className="chamfer group inline-flex items-center gap-3 bg-alien px-7 py-4 text-lg font-bold text-space transition-colors hover:bg-alien-bright"
            >
              {hero.primary}
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#work"
              className="chamfer inline-flex items-center gap-2 border border-line bg-orbit/60 px-7 py-4 text-lg font-semibold text-starlight backdrop-blur transition-colors hover:border-alien/60"
            >
              {hero.secondary}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="hud relative p-3 animate-rise" style={{ animationDelay: "300ms" }}>
            <div className="chamfer relative aspect-[4/5] overflow-hidden bg-orbit sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/media/hero.webp"
                alt="شباب يعملون على حواسيب محمولة وهم يرتدون سماعات رأس"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[60%_center] saturate-[0.85]"
              />
              <div aria-hidden className="scanlines absolute inset-0 opacity-60" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-space via-space/20 to-transparent" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-alien/10 to-transparent animate-scan" />
              <p
                dir="ltr"
                className="absolute top-4 left-4 font-latin text-[0.7rem] tracking-wider text-alien/80"
              >
                {hero.coords}
              </p>
            </div>

            {/* Live readout panel */}
            <figcaption className="glass chamfer-sm absolute right-6 -bottom-8 left-6 grid grid-cols-3 divide-x divide-x-reverse divide-white/10 bg-space/70">
              {stats.map((s) => (
                <div key={s.label} className="px-3 py-3.5 sm:px-4">
                  <p className="text-lg font-bold text-starlight sm:text-2xl">{s.value}</p>
                  <p className="mt-0.5 text-xs text-haze">{s.label}</p>
                </div>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
