import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import { btnGhost } from "@/components/admin/ui";
import { ThemeToggle } from "@/components/SiteControls";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "لوحة التحكم | ALIENZ TEAM",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/inquiries", label: "الرسائل" },
  { href: "/admin/services", label: "الخدمات" },
  { href: "/admin/projects", label: "ألبوم التسويق" },
  { href: "/admin/settings", label: "بيانات التواصل" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  // The dashboard is Arabic-only, whatever language the public site is in.
  const controls = getDictionary("ar").controls;

  return (
    <div dir="rtl" lang="ar" className="min-h-dvh lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-orbit lg:min-h-dvh lg:border-b-0 lg:border-l">
        <div className="flex items-center justify-between gap-3 p-4 lg:block lg:p-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/media/logo.webp" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="font-latin text-sm font-bold tracking-wide" dir="ltr">ALIENZ TEAM</span>
          </Link>
          <div className="flex items-center gap-2 lg:mt-5">
            <ThemeToggle t={controls} />
            <form action={logout} className="lg:hidden">
              <button className={btnGhost}>تسجيل الخروج</button>
            </form>
          </div>
        </div>
        <nav aria-label="أقسام لوحة التحكم" className="overflow-x-auto px-4 pb-3 lg:px-3">
          <ul className="flex gap-1 lg:flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block whitespace-nowrap px-3 py-2 text-haze transition-colors hover:bg-nebula hover:text-starlight"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden space-y-2 p-6 lg:block">
          <a href="/" target="_blank" rel="noopener" className="block text-sm text-haze hover:text-alien">
            عرض الموقع
          </a>
          <form action={logout}>
            <button className={btnGhost}>تسجيل الخروج</button>
          </form>
        </div>
      </aside>
      <main id="main" className="min-w-0 p-4 sm:p-8">{children}</main>
    </div>
  );
}
