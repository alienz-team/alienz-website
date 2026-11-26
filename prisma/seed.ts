// Seeds Neon with the site's real content from lib/content.ts.
// Safe to re-run and additive: services upsert by slug without overwriting
// admin edits, album works are inserted only if their image is not in the table
// yet, and settings only when missing.
import { PrismaClient } from "@prisma/client";
import { contact, marketing, services } from "../lib/content";

const prisma = new PrismaClient();

async function main() {
  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.id },
      update: {},
      create: { slug: s.id, title: s.title, description: s.description, image: s.image, sortOrder: i },
    });
  }

  const existing = new Set((await prisma.project.findMany({ select: { image: true } })).map((p) => p.image));
  const missing = marketing.album
    .map((a, i) => ({ title: a.title, image: a.src, width: a.w, height: a.h, alt: a.alt, sortOrder: i }))
    .filter((p) => !existing.has(p.image));
  if (missing.length) await prisma.project.createMany({ data: missing });

  const settings: Record<string, string> = {
    location: contact.location,
    phoneDisplay: contact.phoneDisplay,
    phoneHref: contact.phoneHref,
    email: contact.email,
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  const [svc, prj, set] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.siteSetting.count(),
  ]);
  console.log(`Seeded: ${svc} services, ${prj} projects, ${set} settings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
