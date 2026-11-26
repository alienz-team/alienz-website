import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { card } from "@/components/admin/ui";

export default async function AdminHome() {
  await requireAdmin();
  const db = getDb();
  const weekAgo = new Date(Date.now() - 7 * 864e5);
  const [newCount, totalInquiries, lastWeek, services, servicesAll, projects, projectsAll, recent, byService] =
    await Promise.all([
      db.inquiry.count({ where: { status: "NEW" } }),
      db.inquiry.count(),
      db.inquiry.count({ where: { createdAt: { gte: weekAgo } } }),
      db.service.count({ where: { published: true } }),
      db.service.count(),
      db.project.count({ where: { published: true } }),
      db.project.count(),
      db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      db.inquiry.groupBy({ by: ["service"], _count: { _all: true } }),
    ]);

  const stats = [
    { label: "رسائل جديدة", value: newCount, href: "/admin/inquiries?status=NEW", hot: newCount > 0 },
    { label: "رسائل آخر 7 أيام", value: lastWeek, href: "/admin/inquiries" },
    { label: "كل الرسائل", value: totalInquiries, href: "/admin/inquiries" },
    { label: `خدمات منشورة من ${servicesAll}`, value: services, href: "/admin/services" },
    { label: `أعمال منشورة من ${projectsAll}`, value: projects, href: "/admin/projects" },
  ];
  const demand = byService
    .map((r) => ({ service: r.service || "غير محددة", count: r._count._all }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const top = demand[0]?.count ?? 1;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-black">نظرة عامة</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`${card} transition-colors hover:border-alien ${s.hot ? "border-alien/70" : ""}`}
          >
            <p className={`font-latin text-3xl font-bold ${s.hot ? "text-alien" : ""}`}>{s.value}</p>
            <p className="mt-1 text-sm text-haze">{s.label}</p>
          </Link>
        ))}
      </div>

      {demand.length > 0 && (
        <section className={`${card} mt-6`} aria-labelledby="demand-title">
          <h2 id="demand-title" className="font-bold">الطلب حسب الخدمة</h2>
          <ul className="mt-4 space-y-3">
            {demand.map((d) => (
              <li key={d.service}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate">{d.service}</span>
                  <span className="font-latin text-haze">{d.count}</span>
                </div>
                <div className="mt-1 h-1.5 bg-nebula">
                  <div className="h-full bg-alien" style={{ width: `${Math.max(4, (d.count / top) * 100)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

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
                    {r.status === "NEW" && <span className="ms-2 bg-alien px-1.5 py-0.5 text-xs font-bold text-space">جديدة</span>}
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
