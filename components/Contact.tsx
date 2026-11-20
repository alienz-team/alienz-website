"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { contact as staticContact } from "@/lib/content";
import type { ContactView } from "@/lib/site-data";
import { Mail, Phone, Pin, socialIcons } from "./Icons";

const initial: InquiryState = { status: "idle" };

export function Contact({ info, serviceTitles }: { info: ContactView; serviceTitles: string[] }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.errors ?? {};

  // Submit manually instead of <form action>: React 19 auto-resets forms
  // after an action, which would wipe the visitor's text on a validation
  // error. We reset ourselves, only on success.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (state.status === "error" && state.errors) {
      const first = (["name", "contact", "message"] as const).find((k) => state.errors?.[k]);
      if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
  }, [state]);

  const field =
    "mt-2 block w-full border border-line bg-space px-4 py-3 text-starlight placeholder:text-haze/60 transition-colors focus:border-alien focus:outline-none aria-[invalid=true]:border-red-400";

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-4xl font-black sm:text-5xl">
            {staticContact.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-haze">
            حائر في أفكارك؟ راسلنا أو اتصل بنا، ونساعدك تحدد ما تحتاجه.
          </p>

          <ul className="mt-10 space-y-1">
            <li className="flex items-center gap-4 border-b border-line py-4">
              <Pin className="text-alien" />
              <span className="text-lg">{info.location}</span>
            </li>
            <li className="border-b border-line">
              <a href={info.phoneHref} className="flex items-center gap-4 py-4 text-lg hover:text-alien">
                <Phone className="text-alien" />
                <span dir="ltr" className="font-latin">{info.phoneDisplay}</span>
              </a>
            </li>
            <li className="border-b border-line">
              <a href={`mailto:${info.email}`} className="flex items-center gap-4 py-4 text-lg break-all hover:text-alien">
                <Mail className="shrink-0 text-alien" />
                <span dir="ltr" className="font-latin">{info.email}</span>
              </a>
            </li>
          </ul>

          <ul className="mt-8 flex gap-3" aria-label="حساباتنا على مواقع التواصل">
            {staticContact.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="chamfer-sm inline-flex h-12 w-12 items-center justify-center bg-orbit text-starlight transition-colors hover:bg-alien hover:text-space"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="chamfer relative border border-line bg-orbit p-6 sm:p-10">
            {/* Honeypot for bots: hidden from people and assistive tech. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">اترك هذا الحقل فارغاً</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-semibold">الاسم</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  className={field}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="mt-2 text-sm text-red-300">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="reply-to" className="font-semibold">البريد أو الهاتف</label>
                <input
                  id="reply-to"
                  name="contact"
                  dir="ltr"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={200}
                  className={`${field} text-right`}
                  aria-invalid={!!errors.contact}
                  aria-describedby={errors.contact ? "contact-error" : undefined}
                />
                {errors.contact && <p id="contact-error" className="mt-2 text-sm text-red-300">{errors.contact}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="service" className="font-semibold">الخدمة</label>
              <select id="service" name="service" className={field} defaultValue="">
                <option value="">لست متأكداً بعد</option>
                {serviceTitles.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
                <option value="خدمات التسويق والإعلان">خدمات التسويق والإعلان</option>
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="font-semibold">فكرتك</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={5000}
                placeholder="مثلاً: أحتاج متجراً إلكترونياً لمحلي في طرابلس…"
                className={`${field} resize-y`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <p id="message-error" className="mt-2 text-sm text-red-300">{errors.message}</p>}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={pending}
                className="chamfer-sm inline-flex items-center justify-center gap-2 bg-alien px-8 py-4 text-lg font-bold text-space transition-colors hover:bg-starlight disabled:cursor-wait disabled:opacity-70"
              >
                <Mail />
                {pending ? "جارٍ الإرسال…" : staticContact.cta}
              </button>
              <p
                role="status"
                className={`text-sm ${state.status === "success" ? "text-alien" : state.message ? "text-red-300" : "text-haze"}`}
              >
                {state.message ?? "تصلنا رسالتك مباشرة ونرد عليك على البريد أو الهاتف."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
