import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { pillars } from "@/lib/content";
import { createService, deleteService, updateService } from "../../actions";
import { btnDanger, btnPrimary, card, input, label } from "@/components/admin/ui";

// Which bento card a slug lands in on the home page.
const cardOf = (slug: string) =>
  (pillars.find((p) => p.slugs.includes(slug)) ?? pillars.find((p) => p.catchAll))?.title ?? "";

export default async function ServicesAdmin() {
  await requireAdmin();
  const services = await getDb().service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-black">الخدمات</h1>
      <p className="mt-2 text-haze">التعديلات تظهر في الموقع فور الحفظ. الترتيب الأصغر يظهر أولاً.</p>

      <details className={`${card} mt-6`}>
        <summary className="cursor-pointer text-lg font-bold">إضافة خدمة</summary>
        <form action={createService} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="new-slug" className={label}>المعرّف (حروف إنجليزية صغيرة وشرطات)</label>
            <input id="new-slug" name="slug" required pattern="[a-z0-9][a-z0-9\-]{1,58}" dir="ltr" placeholder="seo" className={`${input} text-right`} />
          </div>
          <div>
            <label htmlFor="new-order" className={label}>الترتيب</label>
            <input id="new-order" name="sortOrder" type="number" defaultValue={services.length} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="new-title" className={label}>العنوان</label>
            <input id="new-title" name="title" required maxLength={200} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="new-desc" className={label}>الوصف</label>
            <textarea id="new-desc" name="description" required maxLength={1000} rows={2} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="new-image" className={label}>مسار الصورة</label>
            <input id="new-image" name="image" required dir="ltr" defaultValue="/media/cyber/software.svg" className={`${input} text-right`} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="published" defaultChecked className="h-4 w-4 accent-[var(--color-alien)]" />
              منشورة في الموقع
            </label>
            <button className={btnPrimary}>إضافة الخدمة</button>
          </div>
          <p className="text-sm text-haze sm:col-span-2">
            المعرّفات غير المرتبطة ببطاقة تظهر في بطاقة «{pillars.find((p) => p.catchAll)?.title}».
          </p>
        </form>
      </details>

      <ul className="mt-6 space-y-5">
        {services.map((s) => (
          <li key={s.id} className={card}>
            <form action={updateService} className="grid gap-4 md:grid-cols-[10rem_1fr]">
              <input type="hidden" name="id" value={s.id} />
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-space">
                  <Image src={s.image} alt="" fill sizes="10rem" className="object-cover" />
                </div>
                <p dir="ltr" className="mt-2 text-right font-latin text-xs text-haze">{s.slug}</p>
                <p className="text-xs text-alien">{cardOf(s.slug)}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor={`t-${s.id}`} className={label}>العنوان</label>
                  <input id={`t-${s.id}`} name="title" defaultValue={s.title} required maxLength={200} className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`d-${s.id}`} className={label}>الوصف</label>
                  <textarea id={`d-${s.id}`} name="description" defaultValue={s.description} required maxLength={1000} rows={2} className={input} />
                </div>
                <div>
                  <label htmlFor={`i-${s.id}`} className={label}>مسار الصورة</label>
                  <input id={`i-${s.id}`} name="image" defaultValue={s.image} required dir="ltr" className={`${input} text-right`} />
                </div>
                <div>
                  <label htmlFor={`o-${s.id}`} className={label}>الترتيب</label>
                  <input id={`o-${s.id}`} name="sortOrder" type="number" defaultValue={s.sortOrder} className={input} />
                </div>
                <div className="flex items-center justify-between gap-4 sm:col-span-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="published" defaultChecked={s.published} className="h-4 w-4 accent-[var(--color-alien)]" />
                    منشورة في الموقع
                  </label>
                  <button className={btnPrimary}>حفظ</button>
                </div>
              </div>
            </form>
            <form action={deleteService} className="mt-4 border-t border-line pt-3">
              <input type="hidden" name="id" value={s.id} />
              <button className={btnDanger}>حذف الخدمة</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
