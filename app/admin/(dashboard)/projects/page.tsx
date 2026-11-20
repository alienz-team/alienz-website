import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { createProject, deleteProject, updateProject } from "../../actions";
import { btnDanger, btnPrimary, card, input, label } from "@/components/admin/ui";

export default async function ProjectsAdmin() {
  await requireAdmin();
  const projects = await getDb().project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-black">ألبوم التسويق</h1>
      <p className="mt-2 text-haze">
        تصاميم الحملات المعروضة في قسم «خدمات التسويق والإعلان». ضع الصور في <code dir="ltr">/public/media</code> أو استخدم رابط https.
      </p>

      <section aria-labelledby="add-title" className={`${card} mt-6`}>
        <h2 id="add-title" className="text-lg font-bold">إضافة تصميم</h2>
        <form action={createProject} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="new-image" className={label}>مسار أو رابط الصورة</label>
            <input id="new-image" name="image" required dir="ltr" placeholder="/media/album-7.webp" className={`${input} text-right`} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="new-alt" className={label}>وصف الصورة (لقارئات الشاشة)</label>
            <input id="new-alt" name="alt" required maxLength={300} className={input} />
          </div>
          <div>
            <label htmlFor="new-w" className={label}>العرض (px)</label>
            <input id="new-w" name="width" type="number" defaultValue={1600} className={input} />
          </div>
          <div>
            <label htmlFor="new-h" className={label}>الارتفاع (px)</label>
            <input id="new-h" name="height" type="number" defaultValue={900} className={input} />
          </div>
          <div>
            <label htmlFor="new-o" className={label}>الترتيب</label>
            <input id="new-o" name="sortOrder" type="number" defaultValue={projects.length} className={input} />
          </div>
          <div className="flex items-end">
            <button className={btnPrimary}>إضافة</button>
          </div>
        </form>
      </section>

      {projects.length === 0 ? (
        <p className={`${card} mt-6 text-haze`}>الألبوم فارغ. أضف أول تصميم من النموذج أعلاه.</p>
      ) : (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.id} className={card}>
              {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary paths/URLs */}
              <img src={p.image} alt="" className="aspect-video w-full bg-space object-cover" loading="lazy" />
              <form action={updateProject} className="mt-4 grid gap-3">
                <input type="hidden" name="id" value={p.id} />
                <div>
                  <label htmlFor={`img-${p.id}`} className={label}>مسار الصورة</label>
                  <input id={`img-${p.id}`} name="image" defaultValue={p.image} required dir="ltr" className={`${input} text-right`} />
                </div>
                <div>
                  <label htmlFor={`alt-${p.id}`} className={label}>وصف الصورة</label>
                  <input id={`alt-${p.id}`} name="alt" defaultValue={p.alt} required maxLength={300} className={input} />
                </div>
                <input type="hidden" name="title" value={p.title} />
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div className="w-24">
                    <label htmlFor={`ord-${p.id}`} className={label}>الترتيب</label>
                    <input id={`ord-${p.id}`} name="sortOrder" type="number" defaultValue={p.sortOrder} className={input} />
                  </div>
                  <label className="flex items-center gap-2 pb-2">
                    <input type="checkbox" name="published" defaultChecked={p.published} className="h-4 w-4 accent-[var(--color-alien)]" />
                    منشور
                  </label>
                  <button className={btnPrimary}>حفظ</button>
                </div>
              </form>
              <form action={deleteProject} className="mt-3 border-t border-line pt-3">
                <input type="hidden" name="id" value={p.id} />
                <button className={btnDanger}>حذف التصميم</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
