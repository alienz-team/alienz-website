import type { Metadata, Viewport } from "next";
import { Cairo, Space_Grotesk } from "next/font/google";
import { ServiceWorker } from "@/components/ServiceWorker";
import { dirOf, getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

// Latin technical labels: English service names, figures, coordinates.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alienz.tech"),
  title: "ALIENZ TEAM | فنون البرمجة والتصميم",
  description:
    "فريق من طرابلس، ليبيا: تصميم وبرمجة المواقع والتطبيقات، الهوية البصرية، الموشن جرافيك، التصوير والمونتاج، التسجيل الصوتي، وخدمات التسويق والإعلان.",
  applicationName: "ALIENZ TECH",
  icons: {
    icon: [
      { url: "/media/logo.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: { capable: true, title: "ALIENZ TECH", statusBarStyle: "black-translucent" },
  openGraph: {
    title: "ALIENZ TEAM",
    description: "فنون البرمجة والتصميم",
    images: ["/media/logo.png"],
    locale: "ar_LY",
    alternateLocale: ["en_US"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090f" },
    { media: "(prefers-color-scheme: light)", color: "#f3f6f4" },
  ],
};

// Runs before paint: stored theme, else the OS preference. No flash.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t}catch(e){d.dataset.theme="dark"}})()`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      data-theme="dark"
      className={`${cairo.variable} ${grotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:bg-alien focus:px-4 focus:py-2 focus:font-semibold focus:text-space"
        >
          {t.skip}
        </a>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
