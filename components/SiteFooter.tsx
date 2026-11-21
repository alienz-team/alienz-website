import Image from "next/image";
import { brand, contact, nav } from "@/lib/content";
import { socialIcons } from "./Icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-orbit/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <Image src="/media/logo.webp" alt="" width={64} height={64} className="h-16 w-16 object-contain" />
            <div>
              <p className="font-latin text-xl font-bold tracking-wide" dir="ltr" style={{ textAlign: "right" }}>
                {brand.name}
              </p>
              <p className="text-haze">{brand.tagline}</p>
            </div>
          </div>

          <nav aria-label="روابط التذييل">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-haze transition-colors hover:text-starlight">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2" aria-label="حساباتنا على مواقع التواصل">
            {contact.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-haze transition-colors hover:border-alien hover:text-alien"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-haze sm:flex-row sm:justify-between">
          <p>حقوق النشر © {new Date().getFullYear()} جميع الحقوق محفوظة. {brand.name}</p>
          <p>{contact.location}</p>
        </div>
      </div>
    </footer>
  );
}
