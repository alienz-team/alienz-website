"use client";

import { useEffect, useRef, useState } from "react";
import { brand, contact, nav } from "@/lib/content";
import { AlienHead, Close, Menu } from "./Icons";

export function SiteHeader() {
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
      {/* flex-row-reverse: brand mark top-left, location badge top-right (RTL page). */}
      <div className="mx-auto flex h-18 max-w-7xl flex-row-reverse items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#top" dir="ltr" className="group flex shrink-0 items-center gap-3" aria-label={`${brand.mark}، الصفحة الرئيسية`}>
          <AlienHead className="h-10 w-10 drop-shadow-[0_0_10px_rgb(0_255_102/0.75)] transition-[filter] group-hover:drop-shadow-[0_0_16px_rgb(0_255_102/0.95)]" />
          <span className="font-latin text-lg font-bold tracking-[0.18em] text-white">
            ALIENZ <span className="text-alien-bright [text-shadow:0_0_14px_rgb(0_255_102/0.7)]">TECH</span>
          </span>
        </a>

        <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
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

        <div className="flex items-center gap-3">
          {/* Status pill, adapted from Kerrfield's "All systems normal" chip */}
          <span className="glass hidden items-center gap-2.5 rounded-full border-alien/30 px-3.5 py-1.5 text-sm text-starlight shadow-[inset_0_0_12px_rgb(0_255_102/0.08)] sm:inline-flex">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alien-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-alien-bright" />
            </span>
            {contact.location}
          </span>
          <a
            href="#contact"
            className="chamfer-sm hidden bg-alien px-5 py-2.5 text-sm font-bold text-space transition-colors hover:bg-alien-bright md:inline-block"
          >
            {contact.cta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-starlight lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
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
        <nav aria-label="قائمة الجوال" className="px-4 py-6 sm:px-6">
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
            {contact.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
