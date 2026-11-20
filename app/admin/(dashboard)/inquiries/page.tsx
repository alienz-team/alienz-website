import Link from "next/link";
import type { InquiryStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { deleteInquiry, setInquiryStatus } from "../../actions";
import { btnDanger, btnGhost, card } from "@/components/admin/ui";

const FILTERS: { value: InquiryStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "الكل" },
  { value: "NEW", label: "جديدة" },
  { value: "READ", label: "مقروءة" },
  { value: "ARCHIVED", label: "مؤرشفة" },
];

const STATUS_LABEL: Record<InquiryStatus, string> = { NEW: "جديدة", READ: "مقروءة", ARCHIVED: "مؤرشفة" };

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const filter = FILTERS.some((f) => f.value === status) ? (status as InquiryStatus | "ALL") : "ALL";

  const inquiries = await getDb().inquiry.findMany({
    where: filter === "ALL" ? undefined : { status: filter },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-black">الرسائل</h1>

      <nav aria-label="تصفية الرسائل" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "ALL" ? "/admin/inquiries" : `/admin/inquiries?status=${f.value}`}
            aria-current={filter === f.value ? "page" : undefined}
            className={`px-3 py-1.5 text-sm ${filter === f.value ? "bg-alien font-bold text-space" : "border border-line text-haze hover:text-starlight"}`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {inquiries.length === 0 ? (
        <p className={`${card} mt-6 text-haze`}>لا توجد رسائل في هذا القسم.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {inquiries.map((q) => {
            const isEmail = q.contact.includes("@");
            return (
              <li key={q.id} className={`${card} ${q.status === "NEW" ? "border-alien/60" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold">{q.name}</p>
                    <a
                      href={isEmail ? `mailto:${q.contact}` : `tel:${q.contact.replace(/[^\d+]/g, "")}`}
                      dir="ltr"
                      className="font-latin text-sm text-alien hover:underline"
                    >
                      {q.contact}
                    </a>
                    {q.service && <p className="mt-1 text-sm text-haze">الخدمة: {q.service}</p>}
                  </div>
                  <div className="text-left">
                    <span className="border border-line px-2 py-0.5 text-xs">{STATUS_LABEL[q.status]}</span>
                    <time className="mt-1 block text-xs text-haze" dateTime={q.createdAt.toISOString()}>
                      {q.createdAt.toLocaleString("ar-LY", { dateStyle: "medium", timeStyle: "short" })}
                    </time>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap leading-loose">{q.message}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {q.status !== "READ" && (
                    <form action={setInquiryStatus}>
                      <input type="hidden" name="id" value={q.id} />
                      <input type="hidden" name="status" value="READ" />
                      <button className={btnGhost}>تعليم كمقروءة</button>
                    </form>
                  )}
                  {q.status !== "ARCHIVED" && (
                    <form action={setInquiryStatus}>
                      <input type="hidden" name="id" value={q.id} />
                      <input type="hidden" name="status" value="ARCHIVED" />
                      <button className={btnGhost}>أرشفة</button>
                    </form>
                  )}
                  {q.status === "ARCHIVED" && (
                    <form action={setInquiryStatus}>
                      <input type="hidden" name="id" value={q.id} />
                      <input type="hidden" name="status" value="NEW" />
                      <button className={btnGhost}>إرجاع إلى الجديدة</button>
                    </form>
                  )}
                  <form action={deleteInquiry}>
                    <input type="hidden" name="id" value={q.id} />
                    <button className={btnDanger}>حذف نهائي</button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
