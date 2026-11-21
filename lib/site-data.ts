import "server-only";
import { contact as staticContact, marketing, services as staticServices } from "./content";
import { getDb } from "./db";

export type ServiceView = { id: string; title: string; description: string; image: string };
export type ProjectView = { id: string; title: string; src: string; w: number; h: number; alt: string };
export type ContactView = { location: string; phoneDisplay: string; phoneHref: string; email: string };

export type SiteData = {
  services: ServiceView[];
  projects: ProjectView[];
  contact: ContactView;
  source: "database" | "fallback";
};

const fallback: SiteData = {
  services: staticServices.map(({ id, title, description, image }) => ({ id, title, description, image })),
  projects: marketing.album.map((a, i) => ({ id: `album-${i + 1}`, title: a.title, src: a.src, w: a.w, h: a.h, alt: a.alt })),
  contact: {
    location: staticContact.location,
    phoneDisplay: staticContact.phoneDisplay,
    phoneHref: staticContact.phoneHref,
    email: staticContact.email,
  },
  source: "fallback",
};

/** Published content from Neon; falls back to the bundled copy so the public
 *  site never renders empty if the database is unreachable. */
export async function getSiteData(): Promise<SiteData> {
  try {
    const db = getDb();
    const [services, projects, settings] = await Promise.all([
      db.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
      db.project.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
      db.siteSetting.findMany(),
    ]);
    const s = Object.fromEntries(settings.map((x) => [x.key, x.value]));
    return {
      services: services.length
        ? services.map((x) => ({ id: x.slug, title: x.title, description: x.description, image: x.image }))
        : fallback.services,
      projects: projects.map((x) => ({ id: x.id, title: x.title, src: x.image, w: x.width, h: x.height, alt: x.alt })),
      contact: {
        location: s.location ?? fallback.contact.location,
        phoneDisplay: s.phoneDisplay ?? fallback.contact.phoneDisplay,
        phoneHref: s.phoneHref ?? fallback.contact.phoneHref,
        email: s.email ?? fallback.contact.email,
      },
      source: "database",
    };
  } catch (err) {
    console.error("getSiteData: database unavailable, using bundled content", err);
    return fallback;
  }
}
