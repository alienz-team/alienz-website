"use server";

import { getDb } from "@/lib/db";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "contact" | "message", string>>;
};

const clean = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);

export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (clean(form.get("website"), 200)) return { status: "success" };

  const name = clean(form.get("name"), 120);
  const contact = clean(form.get("contact"), 200);
  const service = clean(form.get("service"), 200) || null;
  const message = clean(form.get("message"), 5000);

  const errors: InquiryState["errors"] = {};
  if (!name) errors.name = "اكتب اسمك حتى نعرف بمن نتواصل.";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = /^\+?[\d\s-]{7,20}$/.test(contact);
  if (!isEmail && !isPhone) errors.contact = "اكتب بريداً إلكترونياً أو رقم هاتف صحيحاً لنرد عليك.";
  if (message.length < 10) errors.message = "اكتب وصفاً قصيراً لفكرتك (10 أحرف على الأقل).";
  if (Object.keys(errors).length) return { status: "error", errors };

  try {
    await getDb().inquiry.create({ data: { name, contact, service, message } });
    return { status: "success", message: "وصلتنا رسالتك. سنتواصل معك قريباً." };
  } catch (err) {
    console.error("submitInquiry failed", err);
    return {
      status: "error",
      message: "تعذّر إرسال الرسالة الآن. راسلنا مباشرة على البريد أو اتصل بنا.",
    };
  }
}
