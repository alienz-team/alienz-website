"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/content";
import type { Dict, Locale } from "@/lib/i18n";
import { AlienHead, Close, Menu } from "./Icons";
import { InstallButton, LanguageToggle, ThemeToggle } from "./SiteControls";

type Props = { locale: Locale; t: Pick<Dict, "header" | "nav" | "controls" | "location"> };

export function SiteHeader({ locale, t }: Props) {
  const nav = t.nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line/70 bg-space/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Arabic: brand mark top-left, location badge top-right (row reversed). */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 rtl:flex-row-reverse sm:gap-6 sm:px-6 lg:px-8">
        <a href="#top" dir="ltr" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3" aria-label={`${brand.mark}, ${t.header.home}`}>
          <AlienHead className="h-9 w-9 shrink-0 text-alien-bright drop-shadow-[0_0_10px_rgb(0_255_102/0.75)] transition-[filter] group-hover:drop-shadow-[0_0_16px_rgb(0_255_102/0.95)]" />
          <span className="font-latin text-base font-bold tracking-[0.14em] whitespace-nowrap text-starlight sm:text-lg sm:tracking-[0.18em]">
            ALIENZ <span className="text-alien-bright [text-shadow:0_0_14px_rgb(0_255_102/0.7)]">TECH</span>
          </span>
        </a>

        <nav aria-label={t.header.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1, -1).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.95rem] text-haze transition-colors hover:text-starlight"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status pill, adapted from Kerrfield's "All systems normal" chip */}
          <span className="glass hidden items-center gap-2.5 rounded-full border-alien/30 px-3.5 py-1.5 text-sm text-starlight shadow-[inset_0_0_12px_rgb(0_255_102/0.08)] xl:inline-flex">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alien-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-alien-bright" />
            </span>
            {t.location}
          </span>
          <LanguageToggle locale={locale} t={t.controls} />
          <ThemeToggle t={t.controls} />
          <span className="hidden lg:inline-flex">
            <InstallButton t={t.controls} />
          </span>
          <a
            href="#contact"
            className="chamfer-sm hidden bg-alien px-5 py-2.5 text-sm font-bold whitespace-nowrap text-space transition-colors hover:bg-alien-bright md:inline-block"
          >
            {t.header.cta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-starlight lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line/70 bg-space lg:hidden"
      >
        <nav aria-label={t.header.mobileNav} className="px-4 py-6 sm:px-6">
          <ul className="divide-y divide-line/60">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl font-bold text-starlight"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="chamfer-sm mt-8 block bg-alien px-5 py-4 text-center font-bold text-space"
          >
            {t.header.cta}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <InstallButton t={t.controls} variant="full" />
            <LanguageToggle locale={locale} t={t.controls} withLabel />
          </div>
        </nav>
      </div>
    </header>
  );
}
