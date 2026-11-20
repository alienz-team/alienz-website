import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { updateService } from "../../actions";
import { btnPrimary, card, input, label } from "@/components/admin/ui";

export default async function ServicesAdmin() {
  await requireAdmin();
  const services = await getDb().service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-black">الخدمات</h1>
      <p className="mt-2 text-haze">التعديلات تظهر في الموقع فور الحفظ. الترتيب الأصغر يظهر أولاً.</p>

      <ul className="mt-6 space-y-5">
        {services.map((s) => (
          <li key={s.id} className={card}>
            <form action={updateService} className="grid gap-4 md:grid-cols-[10rem_1fr]">
              <input type="hidden" name="id" value={s.id} />
              <div className="relative aspect-[4/3] overflow-hidden bg-space">
                <Image src={s.image} alt="" fill sizes="10rem" className="object-cover" />
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
          </li>
        ))}
      </ul>
    </div>
  );
}
