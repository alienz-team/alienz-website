"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { LOCALE_COOKIE, type Dict, type Locale } from "@/lib/i18n";
import { Close, Download, Globe, Moon, Share, Sun } from "./Icons";

type Controls = Dict["controls"];

const iconBtn =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-starlight transition-colors hover:border-alien hover:text-alien disabled:opacity-60";

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private mode: the cookie / attribute still apply for this visit */
    }
  },
};

/* ───────── Language ───────── */

function writeLocaleCookie(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageToggle({ locale, t, withLabel = false }: { locale: Locale; t: Controls; withLabel?: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const next: Locale = locale === "ar" ? "en" : "ar";

  // A choice saved in this browser wins if the cookie was cleared.
  useEffect(() => {
    const saved = store.get(LOCALE_COOKIE);
    if ((saved === "ar" || saved === "en") && saved !== locale && !document.cookie.includes(`${LOCALE_COOKIE}=`)) {
      writeLocaleCookie(saved);
      start(() => router.refresh());
    }
  }, [locale, router]);

  const toggle = () => {
    writeLocaleCookie(next);
    store.set(LOCALE_COOKIE, next);
    start(() => router.refresh());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      lang={next}
      aria-label={t.switchLabel}
      title={t.switchLabel}
      className={withLabel ? `${iconBtn} w-auto gap-2 px-3` : `${iconBtn} font-latin text-sm font-bold`}
    >
      {withLabel ? (
        <>
          <Globe className="h-4 w-4" />
          <span className="text-sm font-semibold">{t.switchTo}</span>
        </>
      ) : (
        <span aria-hidden className={next === "ar" ? "font-sans text-base" : ""}>{t.switchToShort}</span>
      )}
    </button>
  );
}

/* ───────── Theme ───────── */

type Theme = "dark" | "light";
const themeListeners = new Set<() => void>();
const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.dataset.theme = theme;
  if (persist) store.set("theme", theme);
  themeListeners.forEach((l) => l());
  window.setTimeout(() => root.classList.remove("theme-switching"), 350);
}

function subscribeTheme(cb: () => void) {
  themeListeners.add(cb);
  // Follow the OS while the visitor hasn't picked a theme themselves.
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onSystem = () => {
    if (!store.get("theme")) applyTheme(mq.matches ? "light" : "dark", false);
  };
  mq.addEventListener("change", onSystem);
  return () => {
    themeListeners.delete(cb);
    mq.removeEventListener("change", onSystem);
  };
}

export function ThemeToggle({ t }: { t: Controls }) {
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, readTheme, () => null);
  const label = theme === "light" ? t.themeDark : t.themeLight;
  return (
    <button
      type="button"
      onClick={() => applyTheme(readTheme() === "light" ? "dark" : "light", true)}
      aria-label={label}
      title={label}
      className={iconBtn}
    >
      {/* Both icons render; CSS shows the right one before hydration. */}
      <Sun className="light:hidden h-[18px] w-[18px]" />
      <Moon className="hidden light:block h-[18px] w-[18px]" />
    </button>
  );
}

/* ───────── Install (PWA) ───────── */

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

let deferred: InstallPromptEvent | null = null;
let installed = false;
const pwaListeners = new Set<() => void>();
const emit = () => pwaListeners.forEach((l) => l());

// Registered at module load: Chrome can fire this before React mounts.
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    installed = true;
    deferred = null;
    emit();
  });
}

const subscribePwa = (cb: () => void) => {
  pwaListeners.add(cb);
  return () => pwaListeners.delete(cb);
};

type PwaState = "hidden" | "prompt" | "ios" | "manual";
let cached: PwaState = "hidden";
function readPwa(): PwaState {
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const ua = navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && navigator.maxTouchPoints > 1);
  const next: PwaState = installed || standalone ? "hidden" : deferred ? "prompt" : ios ? "ios" : "manual";
  if (next !== cached) cached = next;
  return cached;
}

export function InstallButton({ t, variant = "icon" }: { t: Controls; variant?: "icon" | "full" }) {
  const state = useSyncExternalStore(subscribePwa, readPwa, () => "hidden" as PwaState);
  const [help, setHelp] = useState(false);

  if (state === "hidden") return null;

  const onClick = async () => {
    if (state === "prompt" && deferred) {
      const e = deferred;
      deferred = null;
      await e.prompt();
      await e.userChoice.catch(() => null);
      emit();
      return;
    }
    setHelp(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={t.install}
        title={t.install}
        aria-haspopup={state === "prompt" ? undefined : "dialog"}
        className={
          variant === "full"
            ? "chamfer-sm inline-flex items-center justify-center gap-2 border border-alien/60 px-4 py-2.5 text-sm font-bold text-alien transition-colors hover:bg-alien hover:text-space"
            : iconBtn
        }
      >
        <Download className="h-[18px] w-[18px]" />
        {variant === "full" && <span>{t.install}</span>}
      </button>
      {help && <InstallHelp t={t} ios={state === "ios"} onClose={() => setHelp(false)} />}
    </>
  );
}

function InstallHelp({ t, ios, onClose }: { t: Controls; ios: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    return () => d?.close();
  }, []);
  const steps = ios ? t.iosSteps : t.otherSteps;

  return (
    <dialog
      ref={ref}
      aria-labelledby="install-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[min(100%-2rem,26rem)] border border-line bg-orbit p-0 text-starlight backdrop:bg-space/80 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="install-title" className="text-xl font-black">{t.installTitle}</h2>
          <button type="button" onClick={onClose} aria-label={t.gotIt} className={iconBtn}>
            <Close className="h-4 w-4" />
          </button>
        </div>
        <ol className="mt-5 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3">
              <span className="chamfer-sm inline-flex h-7 w-7 shrink-0 items-center justify-center bg-alien font-latin text-sm font-bold text-space">
                {i + 1}
              </span>
              <span className="pt-0.5 text-haze">
                {s}
                {ios && i === 0 && <Share className="ms-1.5 inline h-4 w-4 align-[-2px] text-alien" />}
              </span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="chamfer-sm mt-6 inline-flex w-full items-center justify-center bg-alien px-4 py-3 font-bold text-space transition-colors hover:bg-alien-bright"
        >
          {t.gotIt}
        </button>
      </div>
    </dialog>
  );
}
