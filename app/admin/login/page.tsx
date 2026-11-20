import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول | لوحة ALIENZ TEAM",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main id="main" className="starfield flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="chamfer w-full max-w-sm border border-line bg-orbit p-8">
        <div className="flex items-center gap-3">
          <Image src="/media/logo.webp" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <div>
            <p className="font-latin text-sm font-bold tracking-wide" dir="ltr" style={{ textAlign: "right" }}>
              ALIENZ TEAM
            </p>
            <h1 className="text-xl font-black">لوحة التحكم</h1>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
