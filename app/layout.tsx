import type { Metadata, Viewport } from "next";
import { Cairo, Space_Grotesk } from "next/font/google";
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
  icons: { icon: "/media/logo.png" },
  openGraph: {
    title: "ALIENZ TEAM",
    description: "فنون البرمجة والتصميم",
    images: ["/media/logo.png"],
    locale: "ar_LY",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${grotesk.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:bg-alien focus:px-4 focus:py-2 focus:font-semibold focus:text-space"
        >
          تخطَّ إلى المحتوى
        </a>
        {children}
      </body>
    </html>
  );
}
