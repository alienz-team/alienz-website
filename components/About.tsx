import Image from "next/image";
import { about, brand } from "@/lib/content";

// The one light surface on the page: a lavender sheet that breaks the dark
// rhythm and gives the team's own words room to read.
export function About() {
  const [wide, ...rest] = about.images;
  return (
    <section id="about" aria-labelledby="about-title" className="bg-lavender py-20 text-ink sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <h2 id="about-title" className="text-4xl font-black sm:text-5xl">
            {about.title}{" "}
            <span className="font-latin text-3xl font-bold tracking-wide text-ink-soft sm:text-4xl" dir="ltr">
              {brand.name}
            </span>{" "}
            <span aria-hidden>👽</span>
          </h2>

          <p className="mt-8 font-display text-2xl font-bold leading-relaxed sm:text-3xl">{about.lead}.</p>
          {about.paragraphs.map((p) => (
            <p key={p} className="mt-4 max-w-xl text-lg leading-loose text-ink-soft">
              {p}
            </p>
          ))}

          <blockquote className="mt-10 border-r-4 border-alien-deep pr-5 text-lg leading-loose text-ink">
            {about.reassurance}
          </blockquote>
        </div>

        <div className="grid grid-cols-2 gap-4 self-center lg:col-span-6">
          <div className="chamfer relative col-span-2 aspect-video overflow-hidden bg-white">
            <Image src={wide.src} alt={wide.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain" />
          </div>
          {rest.map((img) => (
            <div key={img.src} className="chamfer-sm relative aspect-[4/3] overflow-hidden bg-ink">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
