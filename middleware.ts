import { NextResponse, type NextRequest } from "next/server";

// Edge gate for /admin: no session cookie, no dashboard. The cookie's
// signature and expiry are verified again by requireAdmin() in every admin
// page and server action, so a forged cookie gets no further than this.
const SESSION_COOKIE = "alienz_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login";
  if (!isLogin && !req.cookies.has(SESSION_COOKIE)) {
    // Server actions (POST) get a plain 401 instead of an HTML redirect.
    if (req.method !== "GET" && req.method !== "HEAD") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
