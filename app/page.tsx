import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marketing } from "@/components/Marketing";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Ticker } from "@/components/Ticker";
import { getSiteData } from "@/lib/site-data";

// Rendered per request so admin edits show up immediately; no ISR cache
// (and so no R2 bucket) is needed on Cloudflare.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { services, projects, contact } = await getSiteData();

  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Ticker services={services} />
        <Services services={services} />
        <Marketing projects={projects} />
        <About />
        <Contact info={contact} serviceTitles={services.map((s) => s.title)} />
      </main>
      <SiteFooter />
    </>
  );
}
