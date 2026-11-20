import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { SETTING_KEYS, SETTING_LABELS } from "@/lib/settings";
import { updateSettings } from "../../actions";
import { btnPrimary, card, input, label } from "@/components/admin/ui";

export default async function SettingsAdmin() {
  await requireAdmin();
  const rows = await getDb().siteSetting.findMany();
  const values = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black">بيانات التواصل</h1>
      <p className="mt-2 text-haze">تظهر في قسم «الاتصال» بالموقع.</p>

      <form action={updateSettings} className={`${card} mt-6 space-y-5`}>
        {SETTING_KEYS.map((key) => {
          const ltr = key !== "location";
          const v = key === "phoneHref" ? (values[key] ?? "").replace(/^tel:/, "") : values[key] ?? "";
          return (
            <div key={key}>
              <label htmlFor={key} className={label}>{SETTING_LABELS[key]}</label>
              <input
                id={key}
                name={key}
                defaultValue={v}
                required
                maxLength={300}
                dir={ltr ? "ltr" : undefined}
                className={`${input} ${ltr ? "text-right" : ""}`}
              />
            </div>
          );
        })}
        <button className={btnPrimary}>حفظ التغييرات</button>
      </form>
    </div>
  );
}
