import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { card } from "@/components/admin/ui";

export default async function AdminHome() {
  await requireAdmin();
  const db = getDb();
  const [newCount, totalInquiries, services, projects, recent] = await Promise.all([
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.count(),
    db.service.count({ where: { published: true } }),
    db.project.count({ where: { published: true } }),
    db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "رسائل جديدة", value: newCount, href: "/admin/inquiries?status=NEW" },
    { label: "كل الرسائل", value: totalInquiries, href: "/admin/inquiries" },
    { label: "خدمات منشورة", value: services, href: "/admin/services" },
    { label: "تصاميم منشورة", value: projects, href: "/admin/projects" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-black">نظرة عامة</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`${card} transition-colors hover:border-alien`}>
            <p className="font-latin text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-haze">{s.label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10" aria-labelledby="recent-title">
        <div className="flex items-center justify-between">
          <h2 id="recent-title" className="text-xl font-bold">آخر الرسائل</h2>
          <Link href="/admin/inquiries" className="text-sm text-alien hover:text-starlight">عرض الكل</Link>
        </div>
        {recent.length === 0 ? (
          <p className={`${card} mt-4 text-haze`}>
            لا رسائل بعد. ستظهر هنا رسائل نموذج «اتصل بنا» فور وصولها.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line bg-orbit">
            {recent.map((r) => (
              <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-2 p-4">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {r.name}
                    {r.status === "NEW" && <span className="mr-2 bg-alien px-1.5 py-0.5 text-xs font-bold text-space">جديدة</span>}
                  </p>
                  <p className="truncate text-sm text-haze">{r.message}</p>
                </div>
                <time className="text-xs text-haze" dateTime={r.createdAt.toISOString()}>
                  {r.createdAt.toLocaleString("ar-LY", { dateStyle: "medium", timeStyle: "short" })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
