# ALIENZ TEAM website

Arabic (RTL) marketing site and admin for ALIENZ TEAM — Next.js 15 App Router,
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

Admin: `/admin` (sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`).
Manage contact-form messages, services, the marketing album, and contact details.

## Cloudflare

```bash
cp .env .dev.vars           # secrets for the local Workers runtime
npm run preview             # build with OpenNext and run in workerd
npm run deploy              # build and deploy (requires `wrangler login`)
```

Worker config lives in `wrangler.jsonc` (`nodejs_compat` enabled).
Set `DATABASE_URL`, `DIRECT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` and
`ADMIN_SESSION_SECRET` as Worker variables/secrets in the Cloudflare dashboard.

## Scripts

| Script | What it does |
| --- | --- |
| `dev` / `build` / `start` | Next.js |
| `lint` | ESLint |
| `db:generate` / `db:push` / `db:seed` | Prisma |
| `cf:build` | OpenNext build into `.open-next/` |
| `preview` / `deploy` / `upload` | OpenNext + Wrangler |
