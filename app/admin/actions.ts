"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { InquiryStatus } from "@prisma/client";
import { checkCredentials, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { SETTING_KEYS } from "@/lib/settings";

const str = (f: FormData, k: string, max = 2000) => String(f.get(k) ?? "").trim().slice(0, max);
const int = (f: FormData, k: string) => {
  const n = Number.parseInt(String(f.get(k) ?? "0"), 10);
  return Number.isFinite(n) ? n : 0;
};
// Local /media paths or https URLs only — never javascript:/data: URIs.
const safeImage = (v: string) => (/^\/[\w\-./]+$/.test(v) || /^https:\/\/[^\s"'<>]+$/.test(v) ? v : null);

/* ---------- auth ---------- */

export type LoginState = { error?: string };

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const ok = await checkCredentials(str(form, "email", 200), String(form.get("password") ?? "").slice(0, 200));
  if (!ok) {
    // Slow down guessing; there is no shared store for per-IP rate limits.
    await new Promise((r) => setTimeout(r, 800));
    return { error: "البريد أو كلمة المرور غير صحيحة." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- inquiries ---------- */

const STATUSES: InquiryStatus[] = ["NEW", "READ", "ARCHIVED"];

export async function setInquiryStatus(form: FormData) {
  await requireAdmin();
  const status = str(form, "status") as InquiryStatus;
  if (!STATUSES.includes(status)) return;
  await getDb().inquiry.update({ where: { id: str(form, "id", 50) }, data: { status } });
  revalidatePath("/admin", "layout");
}

export async function deleteInquiry(form: FormData) {
  await requireAdmin();
  await getDb().inquiry.delete({ where: { id: str(form, "id", 50) } });
  revalidatePath("/admin", "layout");
}

/* ---------- services ---------- */

export async function updateService(form: FormData) {
  await requireAdmin();
  const image = safeImage(str(form, "image", 500));
  const title = str(form, "title", 200);
  const description = str(form, "description", 1000);
  if (!title || !description || !image) return;
  await getDb().service.update({
    where: { id: str(form, "id", 50) },
    data: { title, description, image, sortOrder: int(form, "sortOrder"), published: form.get("published") === "on" },
  });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

/* ---------- projects (campaign album) ---------- */

export async function createProject(form: FormData) {
  await requireAdmin();
  const image = safeImage(str(form, "image", 500));
  const alt = str(form, "alt", 300);
  if (!image || !alt) return;
  await getDb().project.create({
    data: {
      title: str(form, "title", 200) || alt.slice(0, 60),
      image,
      alt,
      width: int(form, "width") || 1600,
      height: int(form, "height") || 900,
      sortOrder: int(form, "sortOrder"),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(form: FormData) {
  await requireAdmin();
  const image = safeImage(str(form, "image", 500));
  const alt = str(form, "alt", 300);
  if (!image || !alt) return;
  await getDb().project.update({
    where: { id: str(form, "id", 50) },
    data: {
      title: str(form, "title", 200) || alt.slice(0, 60),
      image,
      alt,
      sortOrder: int(form, "sortOrder"),
      published: form.get("published") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(form: FormData) {
  await requireAdmin();
  await getDb().project.delete({ where: { id: str(form, "id", 50) } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

/* ---------- settings ---------- */

export async function updateSettings(form: FormData) {
  await requireAdmin();
  const db = getDb();
  for (const key of SETTING_KEYS) {
    let value = str(form, key, 300);
    if (!value) continue;
    if (key === "phoneHref") value = `tel:${value.replace(/^tel:/, "").replace(/[^\d+]/g, "")}`;
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) continue;
    await db.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
