# WeThink Bharat — Website

Experiential-learning movement for Indian school students. Built with Next.js 16, Tailwind CSS v4, and Sanity CMS.

---

## Quick start

### 1. Prerequisites
- Node.js 20.9+
- A free [Sanity](https://sanity.io) account

### 2. Clone and install

```bash
git clone <repo>
cd wethink-bharat
npm install
```

### 3. Create a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage) → **New Project**
2. Name it "WeThink Bharat", choose **Production** dataset
3. Copy your **Project ID**
4. Go to **API → Tokens** → **Add API Token**
   - Name: "Write Token (local dev)"
   - Permissions: **Editor**
   - Copy the token

### 4. Set environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=skYour...Token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENABLE_DEVICE_REDIRECT=true
```

> **Security note:** `SANITY_API_WRITE_TOKEN` has no `NEXT_PUBLIC_` prefix — it is server-only and must never be exposed to the browser.

### 5. Seed initial content

```bash
npm run seed
```

This creates all initial content in Sanity (hero text, advisory board members, domains, journey stages, beliefs, etc.) matching the reference design.

### 6. Run locally

```bash
npm run dev
```

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Desktop site |
| `http://localhost:3000/m` | Mobile site |
| `http://localhost:3000/studio` | Sanity Studio (edit content) |
| `http://localhost:3000/qr` | QR code pointing to `/m` (downloadable PNG) |

---

## Editing content

All text, numbers, images, and options are managed through **Sanity Studio** at `/studio`.

Key content areas:
- **Site Settings** — Navigation, footer, CTA labels, form toast message
- **Hero** — Season badge, headline, subtext, CTAs
- **Beliefs** — 6 belief statements
- **The Gap** — 3 stat numbers (these drive the count-up animation)
- **Domains** — Domain names, partners, 4-level journey, outcomes
- **Advisory Board** — Member bios, headshots, seat labels
- **School Form Config / Partner Form Config** — All dropdown options are editable here
- **Enquiries** — Lead inbox (read-only, auto-populated by form submissions)

---

## Architecture

```
app/
  page.tsx              Desktop site (/)
  m/page.tsx            Mobile site (/m)
  studio/[[...tool]]/   Sanity Studio (/studio)
  qr/page.tsx           QR code page (/qr)
  api/enquiry/
    school/route.ts     School form handler
    partner/route.ts    Partner form handler

components/
  desktop/              Desktop-specific components
  mobile/               Mobile-specific components
  shared/               Shared (forms, scroll reveal, etc.)

sanity/
  schemas/              All Sanity document schemas
  client.ts             Sanity client (lazy, server-safe)
  queries.ts            All GROQ fetch functions
  types.ts              TypeScript interfaces
  seed.ts               Content seeding script
  imageUrl.ts           Sanity image URL builder

lib/
  schemas.ts            Zod validation schemas (shared client+server)

proxy.ts                Device routing (mobile to /m, desktop to /)
```

---

## Device routing

`proxy.ts` detects mobile user agents and redirects:
- Mobile visiting `/` redirects to `/m`
- Desktop visiting `/m` redirects to `/`

Disable with `ENABLE_DEVICE_REDIRECT=false` in `.env.local`.

---

## Forms & security

- **Client + server validation** via shared Zod schemas (`lib/schemas.ts`)
- **Honeypot field** (`_hp`) to silently block bots
- **Per-IP rate limiting**: 5 submissions per 15 minutes per endpoint
- **Submissions stored** in Sanity as `enquiry` documents (visible in Studio under Enquiries)
- **Email is stubbed** — logs to console. Look for `// TODO(deploy): wire Resend` in `app/api/enquiry/*/route.ts`

---

## Deployment checklist

Search for `// TODO(deploy):` markers throughout the codebase:

1. **Resend email** — `app/api/enquiry/school/route.ts` and `partner/route.ts`
2. **Real domain** — `proxy.ts` + set `NEXT_PUBLIC_SITE_URL` to production domain
3. **Security headers** — `next.config.ts` (tighten CSP, add HSTS)
4. **Sanity CORS** — Add production domain to Sanity project CORS origins

---

## Stack

| Library | Version | Purpose |
|---------|---------|---------|
| Next.js | 16 | Framework (App Router) |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling (CSS-based config) |
| Sanity | 3 | CMS |
| next-sanity | 9 | Next.js + Sanity integration |
| Framer Motion | 11 | Scroll reveals, count-up |
| react-hook-form | 7 | Form state |
| Zod | 3 | Validation |
| Resend | 4 | Email (stubbed for now) |
| qrcode | 1 | QR code generation |
