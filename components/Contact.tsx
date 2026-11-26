"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { contact as staticContact } from "@/lib/content";
import type { Dict } from "@/lib/i18n";
import type { ContactView } from "@/lib/site-data";
import { ArrowLeft, Mail, Phone, Pin, WhatsApp, socialIcons } from "./Icons";

const initial: InquiryState = { status: "idle" };

/** wa.me link built from the phone setting, so the admin edits one value. */
function whatsappHref(phoneHref: string, message: string) {
  const digits = phoneHref.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return digits.length >= 8 ? `https://wa.me/${digits}?text=${text}` : null;
}

type Props = {
  info: ContactView;
  serviceTitles: string[];
  t: Pick<Dict, "contactSection" | "about" | "pillars" | "socials" | "locale">;
};

export function Contact({ info, serviceTitles, t }: Props) {
  const c = t.contactSection;
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

  const wa = whatsappHref(info.phoneHref, c.whatsappText);
  const field =
    "mt-2 block w-full rounded-md border border-veil/10 bg-space/80 px-4 py-3 text-starlight placeholder:text-haze/60 transition-colors focus:border-alien focus:outline-none aria-[invalid=true]:border-red-400";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-[-10%] h-[32rem] w-[32rem] rounded-full bg-alien/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <p dir="ltr" className="rtl:text-right font-latin text-sm font-medium text-alien">Free consultation</p>
          <h2 id="contact-title" className="mt-2 text-4xl font-black sm:text-5xl">
            {c.heading}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-loose text-haze">{t.about.reassurance}</p>

          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="chamfer group mt-8 flex items-center justify-between gap-4 bg-alien px-6 py-5 text-space transition-colors hover:bg-alien-bright"
            >
              <span className="flex items-center gap-4">
                <WhatsApp className="h-7 w-7" />
                <span>
                  <span className="block text-lg font-black">{c.whatsapp}</span>
                  <span className="block text-sm font-semibold text-space/75">{c.whatsappSub}</span>
                </span>
              </span>
              <ArrowLeft className="shrink-0 transition-transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </a>
          )}

          <ul className="mt-6 grid gap-3">
            <li>
              <a href={info.phoneHref} className="glass flex items-center gap-4 rounded-md px-5 py-4 transition-colors hover:border-alien/40">
                <Phone className="text-alien" />
                <span dir="ltr" className="font-latin text-lg">{info.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${info.email}`} className="glass flex items-center gap-4 rounded-md px-5 py-4 break-all transition-colors hover:border-alien/40">
                <Mail className="shrink-0 text-alien" />
                <span dir="ltr" className="font-latin text-lg">{info.email}</span>
              </a>
            </li>
            <li className="glass flex items-center gap-4 rounded-md px-5 py-4">
              <Pin className="text-alien" />
              <span className="text-lg">{info.location}</span>
            </li>
          </ul>

          <ul className="mt-6 flex gap-2" aria-label={c.socialsLabel}>
            {staticContact.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.socials[s.icon] ?? s.label}
                    className="chamfer-sm inline-flex h-12 w-12 items-center justify-center border border-line bg-orbit text-starlight transition-colors hover:border-alien hover:text-alien"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form ref={formRef} onSubmit={onSubmit} noValidate data-spot className="glass spot hud relative rounded-lg p-6 sm:p-10">
            {/* Honeypot for bots: hidden from people and assistive tech. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">{c.honeypot}</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name="locale" value={t.locale} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-semibold">{c.name}</label>
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
                <label htmlFor="reply-to" className="font-semibold">{c.replyTo}</label>
                <input
                  id="reply-to"
                  name="contact"
                  dir="ltr"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={200}
                  className={`${field} rtl:text-right`}
                  aria-invalid={!!errors.contact}
                  aria-describedby={errors.contact ? "contact-error" : undefined}
                />
                {errors.contact && <p id="contact-error" className="mt-2 text-sm text-red-300">{errors.contact}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="service" className="font-semibold">{c.service}</label>
              <select id="service" name="service" className={field} defaultValue="">
                <option value="">{c.notSure}</option>
                <optgroup label={c.areas}>
                  {t.pillars.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </optgroup>
                <optgroup label={c.specific}>
                  {serviceTitles.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="font-semibold">{c.message}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={5000}
                placeholder={c.placeholder}
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
                className="chamfer-sm inline-flex items-center justify-center gap-2 bg-alien px-8 py-4 text-lg font-bold text-space transition-colors hover:bg-alien-bright disabled:cursor-wait disabled:opacity-70"
              >
                <Mail />
                {pending ? c.sending : c.submit}
              </button>
              <p
                role="status"
                className={`text-sm ${state.status === "success" ? "text-alien" : state.message ? "text-red-300" : "text-haze"}`}
              >
                {state.message ?? c.hint}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
