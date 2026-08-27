# Murly SaaS

Online English school for kids 4-15, powered by cats. B2B (teachers) + B2C (parents) subscription platform.

**Live:** https://murly-school.vercel.app (temporary Vercel URL — real domain later)

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + custom theme (lavender/cream Murly brand)
- **Hosting:** Vercel (free tier)
- **Backend API:** FastAPI on Railway (`web-production-81be0.up.railway.app`)
- **DB:** PostgreSQL on Railway
- **Auth:** Clerk (planned)
- **Payments:** Stripe subscriptions (planned)

## Structure

```
murly-saas/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing (/)
│   ├── globals.css             # Tailwind + custom
│   └── (marketing)/
│       ├── pricing/            # /pricing
│       ├── for-teachers/       # /for-teachers
│       ├── for-parents/        # /for-parents
│       └── about/              # /about
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                        # utils, api client, stripe helpers
├── public/                     # static assets
├── tailwind.config.ts
├── next.config.js              # rewrites /api/backend/* -> Railway
└── tsconfig.json
```

## Dev

```bash
npm install
npm run dev              # http://localhost:3000
```

## Deploy

Push to `main` → Vercel auto-deploys.

## Pricing

**Teachers (B2B):**
- Solo — $19/mo (10 students)
- Pro — $49/mo (30 students, AI)
- School — $99/mo (unlimited, white-label)

**Families (B2C):**
- Kitten — $9/mo (1 child, AI tutor)
- Family — $19/mo (up to 3 kids)

14-day free trial for teachers. 7-day money-back for parents.

## Roadmap

- [x] Landing + pricing + marketing pages
- [ ] Auth (Clerk)
- [ ] Stripe subscriptions
- [ ] Teacher Dashboard (migrate from WordPress)
- [ ] Student + Parent Dashboards
- [ ] Reference pages (grammar)
- [ ] Domain: `murlyschool.com`
- [ ] SEO + Analytics
