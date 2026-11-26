import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Stateless admin session: `<base64url(payload)>.<base64url(HMAC-SHA256)>`.
// Web Crypto only, so it runs unchanged on Node and on Cloudflare Workers.

export const SESSION_COOKIE = "alienz_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Uint8Array {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

/** The unified admin account. ADMIN_EMAIL overrides the address. */
export const DEFAULT_ADMIN_EMAIL = "alienzteam7@gmail.com";
const adminEmail = () => (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();

/** HMAC key material. ADMIN_SESSION_SECRET (32+ chars) when set; otherwise
 *  derived from server-only secrets, so sign-in still works on a deploy that
 *  only has DATABASE_URL + ADMIN_PASSWORD. Rotating any of them signs every
 *  session out. */
function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  const db = process.env.DATABASE_URL ?? "";
  const pw = process.env.ADMIN_PASSWORD ?? "";
  if (!db || !pw) throw new Error("Set ADMIN_SESSION_SECRET, or DATABASE_URL and ADMIN_PASSWORD");
  return `alienz-session|${db}|${pw}`;
}

async function hmac(data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

function equalBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Constant-time check: compare HMACs of both sides so lengths never leak. */
export async function checkCredentials(email: string, password: string): Promise<boolean> {
  const wantEmail = adminEmail();
  const wantPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!wantPassword) {
    console.error("Admin sign-in is disabled: ADMIN_PASSWORD is not set");
    return false;
  }
  const [e1, e2, p1, p2] = await Promise.all([
    hmac(`e:${email.trim().toLowerCase()}`),
    hmac(`e:${wantEmail}`),
    hmac(`p:${password}`),
    hmac(`p:${wantPassword}`),
  ]);
  const emailOk = equalBytes(e1, e2);
  const passOk = equalBytes(p1, p2);
  return emailOk && passOk;
}

export async function createSession(): Promise<void> {
  const payload = b64url(enc.encode(JSON.stringify({ sub: "admin", exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })));
  const token = `${payload}.${b64url(await hmac(payload))}`;
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  try {
    if (!equalBytes(fromB64url(sig), await hmac(payload))) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as { exp?: number };
    return typeof exp === "number" && exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

/** Gate for admin pages and every admin server action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
