# ALIENZ TEAM website

Bilingual (Arabic RTL / English LTR) marketing site, installable PWA and admin for ALIENZ TEAM — Next.js 15 App Router,
Tailwind CSS v4, Prisma + Neon PostgreSQL, deployed to Cloudflare Workers with
[OpenNext](https://opennext.js.org/cloudflare).

## Local setup

```bash
cp .env.example .env        # fill in Neon URLs and admin credentials
npm install                 # also runs `prisma generate`
npm run db:push             # create tables in Neon
npm run db:seed             # load the site's content (safe to re-run)
npm run dev                 # http://localhost:3000
```

Admin: `/admin` (sign in with `ADMIN_EMAIL` — default `alienzteam7@gmail.com` —
and `ADMIN_PASSWORD`). `middleware.ts` turns away requests without a session
cookie; every admin page and server action re-verifies the signed cookie.
Manage contact-form messages, services, the marketing album, and contact details.

Public UI controls: language (`lang` cookie, `ar`/`en`), dark/light theme
(`localStorage.theme`, OS preference until chosen) and an install button
(`beforeinstallprompt`, with Add-to-Home-Screen steps on iOS). The PWA is
`app/manifest.ts` + `public/sw.js` + `public/icons/`.

## Cloudflare

```bash
cp .env .dev.vars           # secrets for the local Workers runtime
npm run preview             # build with OpenNext and run in workerd
npm run deploy              # build and deploy (requires `wrangler login`)
```

Worker config lives in `wrangler.jsonc` (`nodejs_compat` enabled).
Set `DATABASE_URL`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (plus
optional `ADMIN_EMAIL`) as Worker secrets, e.g. `npx wrangler secret put ADMIN_PASSWORD`.
Without `ADMIN_SESSION_SECRET` the session key is derived from
`DATABASE_URL` + `ADMIN_PASSWORD`.

Custom domain: Workers & Pages → `alienz-website` → Settings → Domains & Routes →
Add → Custom domain (the zone must be on Cloudflare). `metadataBase` in
`app/layout.tsx` is `https://alienz.tech`.

## Scripts

| Script | What it does |
| --- | --- |
| `build` | `next build` + OpenNext bundle into `.open-next/` (what Cloudflare runs) |
| `build:next` / `dev` / `start` | Next.js only |
| `lint` | ESLint |
| `db:generate` / `db:push` / `db:seed` | Prisma |
| `preview` / `deploy` / `upload` | OpenNext + Wrangler |
