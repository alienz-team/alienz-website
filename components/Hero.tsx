import Image from "next/image";
import { about, brand } from "@/lib/content";
import { ArrowLeft } from "./Icons";

export function Hero() {
  // Arabic letters join, so the reveal staggers whole words, never letters.
  const words = brand.tagline.split(" ");

  return (
    <section id="top" className="starfield relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-nebula/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <p
            className="font-latin text-base font-bold tracking-[0.2em] text-alien animate-rise"
            dir="ltr"
            style={{ textAlign: "right" }}
          >
            {brand.name}
          </p>

          <h1 className="mt-4 text-[clamp(2.75rem,8vw,6.25rem)] font-black leading-[1.15] text-starlight">
            {words.map((w, i) => (
              <span
                key={w + i}
                className="inline-block animate-rise"
                style={{ animationDelay: `${120 + i * 140}ms` }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-loose text-haze animate-rise sm:text-xl"
            style={{ animationDelay: "560ms" }}
          >
            {about.lead}. {about.paragraphs[0]}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-rise"
            style={{ animationDelay: "700ms" }}
          >
            <a
              href="#contact"
              className="chamfer group inline-flex items-center gap-3 bg-alien px-7 py-4 text-lg font-bold text-space transition-colors hover:bg-starlight"
            >
              {brand.heroCta}
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border-b border-line px-1 py-3 text-lg text-starlight transition-colors hover:border-alien"
            >
              تصفّح الخدمات
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="relative animate-rise" style={{ animationDelay: "300ms" }}>
            <div className="chamfer relative aspect-[4/5] overflow-hidden bg-orbit sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/media/hero.webp"
                alt="شباب يعملون على حواسيب محمولة وهم يرتدون سماعات رأس"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[60%_center]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-space/80 via-transparent to-transparent" />
            </div>

            {/* Overlay panel, after Hexwall's floating status card */}
            <figcaption className="chamfer-sm absolute -bottom-6 right-4 left-4 flex items-center gap-4 border border-line bg-space/90 p-4 backdrop-blur sm:right-6 sm:left-auto sm:w-80">
              <Image src="/media/logo.webp" alt="" width={56} height={56} className="h-14 w-14 shrink-0 object-contain" />
              <div>
                <p className="font-latin text-sm font-bold tracking-wide text-starlight" dir="ltr" style={{ textAlign: "right" }}>
                  {brand.name}
                </p>
                <p className="font-display text-lg font-bold text-alien">هجين البرمجة والتصميم</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
