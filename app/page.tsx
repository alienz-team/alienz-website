import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { MotionDirector } from "@/components/MotionDirector";
import { PointerGlow } from "@/components/PointerGlow";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Ticker } from "@/components/Ticker";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getSiteData } from "@/lib/site-data";

// Rendered per request so admin edits show up immediately; no ISR cache
// (and so no R2 bucket) is needed on Cloudflare.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [data, locale] = await Promise.all([getSiteData(), getLocale()]);
  const t = getDictionary(locale);

  // Database copy is authored in Arabic; English swaps in known translations
  // and keeps any admin-added row as written.
  const services = data.services.map((s) => ({ ...s, ...t.serviceText[s.id] }));
  const projects = data.projects.map((p) => ({ ...p, ...t.projectText[p.src] }));
  const contact = locale === "ar" ? data.contact : { ...data.contact, location: t.location };

  return (
    <>
      <PointerGlow />
      <MotionDirector />
      <SiteHeader locale={locale} t={{ header: t.header, nav: t.nav, controls: t.controls, location: t.location }} />
      <main id="main">
        <Hero t={t} servicesCount={t.pillars.length} projectsCount={projects.length} />
        <Ticker services={services} />
        <Services t={t} services={services} />
        <Portfolio projects={projects} t={{ work: t.work, categories: t.categories, locale }} />
        <Method t={t} />
        <Contact
          info={contact}
          serviceTitles={services.map((s) => s.title)}
          t={{ contactSection: t.contactSection, about: t.about, pillars: t.pillars, socials: t.socials, locale }}
        />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
