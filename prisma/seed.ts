// Seeds Neon with the site's real content from lib/content.ts.
// Safe to re-run: services upsert by slug without overwriting admin edits,
// projects are only inserted into an empty table, settings only when missing.
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

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: marketing.album.map((a, i) => ({
        title: `تصميم ${i + 1}`,
        image: a.src,
        width: a.w,
        height: a.h,
        alt: a.alt,
        sortOrder: i,
      })),
    });
  }

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
