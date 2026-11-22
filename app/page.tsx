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
import { pillars } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";

// Rendered per request so admin edits show up immediately; no ISR cache
// (and so no R2 bucket) is needed on Cloudflare.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { services, projects, contact } = await getSiteData();

  return (
    <>
      <PointerGlow />
      <MotionDirector />
      <SiteHeader />
      <main id="main">
        <Hero servicesCount={pillars.length} projectsCount={projects.length} />
        <Ticker services={services} />
        <Services services={services} />
        <Portfolio projects={projects} />
        <Method />
        <Contact info={contact} serviceTitles={services.map((s) => s.title)} />
      </main>
      <SiteFooter />
    </>
  );
}
