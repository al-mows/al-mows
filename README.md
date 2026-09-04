# AL Mows Blocks — website

Production website for **AL Mows Blocks**, a South Australian lawn mowing and
paddock slashing business servicing the Copper Coast, Yorke Peninsula and
surrounding districts.

The site is a fast, responsive single-page marketing site whose main job is to
generate quote enquiries and make it easy to call the owner directly.

## Technology stack

- **Next.js 15** (App Router) with **React 19**
- **TypeScript**
- **Tailwind CSS** for styling (brand tokens in `tailwind.config.ts`)
- **Server Components** by default; Client Components only where interaction is needed
- **Zod** for shared client/server form validation
- **Resend** for enquiry email delivery
- **lucide-react** icons, **next/font** (Oswald + Inter), **next/image**

No database, CMS, authentication or admin dashboard — all editable content
lives in plain TypeScript files under `src/data/`.

## Requirements

- **Node.js 18.18+** (Node 20 or 22 recommended)
- npm

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm run start       # serve the production build
```

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable                | Purpose                                                              |
| ----------------------- | ------------------------------------------------------------------- |
| `RESEND_API_KEY`        | Resend API key used to send enquiry emails.                         |
| `QUOTE_RECIPIENT_EMAIL` | Where enquiries are delivered. Defaults to `al.mows@outlook.com`.   |
| `QUOTE_FROM_EMAIL`      | Verified "from" address, e.g. `quotes@almowsblocks.com.au`.         |

The quote form still works without these set — the API returns a controlled
error ("Your request could not be sent. Please call AL…") instead of crashing,
so nothing breaks in preview environments.

### Resend configuration

1. Create an account at [resend.com](https://resend.com) and add an API key.
2. Verify the sending domain (e.g. `almowsblocks.com.au`) in Resend and set
   `QUOTE_FROM_EMAIL` to an address on that domain.
3. Add `RESEND_API_KEY`, `QUOTE_FROM_EMAIL` and `QUOTE_RECIPIENT_EMAIL` to your
   local `.env.local` and to the Vercel project (Project → Settings → Environment
   Variables).
4. Submit a test enquiry and confirm it arrives at `al.mows@outlook.com`.

## Editing site content

All content is data-driven — update the files below and the components follow.
Do **not** hard-code business details inside components.

| What to change                          | File                        |
| --------------------------------------- | --------------------------- |
| Business details, hero copy, "How AL can help", service areas, nav labels | `src/data/business.ts` |
| Service cards                           | `src/data/services.ts`      |
| Pricing tiers + disclaimer              | `src/data/pricing.ts`       |
| Before/after gallery projects           | `src/data/gallery.ts`       |

### Making edits without any coding tools (for Al — no developer needed)

This site is plain code, not a CMS with an admin panel, but small text and
photo changes can be made directly on **github.com** in a web browser — no
software to install, no Claude or ChatGPT required.

1. Go to the repository on github.com and sign in.
2. **To change text or numbers** (pricing, phone number, service wording,
   etc.): open the relevant file (see the table above), click the pencil
   ("Edit this file") icon in the top right, make the change, then scroll
   down and click **"Commit changes"**. Only edit the text *between the
   quote marks* — don't touch commas, brackets, or the quote marks
   themselves, or the site will fail to build.
3. **To swap or add photos**: browse to the folder (e.g.
   `public/images/gallery/`), click **"Add file" → "Upload files"**, drag
   the new photo in, and commit. To *replace* an existing photo, upload a
   file with the exact same name (e.g. `project-1-before.png`) — GitHub
   will overwrite it automatically.
4. Every commit automatically triggers a new live deployment on Vercel —
   the change appears on **almowsblocks.com.au** within about a minute.
   Refresh the site after committing to confirm it went live.
5. If something looks broken after an edit, open the commit you just made
   on GitHub and click **"Revert"** — this undoes the change and
   redeploys the previous working version.

Small, careful edits (a price, a phone number, a sentence) are low-risk.
Editing the layout/structure of a file is easy to get wrong — for anything
beyond simple text or photo swaps, come back to an AI coding assistant or a
developer.

### Updating pricing

Open `src/data/pricing.ts` and change the `price` string on the relevant tier.

### Adding gallery images

1. Drop before/after photos into `public/images/gallery/`, e.g.
   `project-1-before.jpg` and `project-1-after.jpg`.
2. Add or edit the matching entry in `src/data/gallery.ts`.
3. Missing images show a labelled placeholder rather than a broken image, so
   entries can be added before the photos exist.
4. A project isn't limited to one before/after photo — `beforeImages` and
   `afterImages` are each a list, so you can add more angles of the same job
   by adding more photos to both lists in matching order. See the
   "ADDING MORE THAN ONE BEFORE/AFTER PHOTO" note at the top of
   `src/data/gallery.ts` for the exact format. Visitors get arrows to flip
   between photo pairs.

## Brand image assets

Copy the supplied artwork into `public/images/` with these exact names (see
`public/images/README.md` for the full table):

| Supplied file                                             | Save as                                     |
| --------------------------------------------------------- | ------------------------------------------- |
| `image (1)(1).png`                                        | `public/images/al-mows-logo.png`            |
| `facebook banner(1).png`                                  | `public/images/al-mows-facebook-banner.png` |
| `Trailer sides(1).png`                                    | `public/images/al-mows-trailer-sides.png`   |
| `Business card final draft with Facebook and web(1).png`  | `public/images/al-mows-business-card.png`   |

Until these are added, the header/contact logo and hero banner show branded
placeholder panels. The favicon is generated in-app (`src/app/icon.tsx`) so it
is always valid.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repo. Framework preset:
   **Next.js** (auto-detected). No build settings changes are needed.
3. Add the environment variables (`RESEND_API_KEY`, `QUOTE_FROM_EMAIL`,
   `QUOTE_RECIPIENT_EMAIL`) under **Settings → Environment Variables**.
4. Deploy.

### Connecting the almowsblocks.com.au domain

1. In the Vercel project, go to **Settings → Domains** and add
   `almowsblocks.com.au` and `www.almowsblocks.com.au`.
2. Follow Vercel's DNS instructions at your registrar (an `A` record / `CNAME`,
   or point the nameservers to Vercel).
3. Set `www.almowsblocks.com.au` as the primary domain (the site's canonical URL
   and metadata already use `https://www.almowsblocks.com.au`).

## Launch checklist

- [x] Replace all `$0.00` pricing placeholders in `src/data/pricing.ts`.
- [x] Add real before-and-after photos to `public/images/gallery/`.
- [x] Copy the brand images into `public/images/`.
- [x] Configure `RESEND_API_KEY` in Vercel.
- [x] Verify the sending domain in Resend and set `QUOTE_FROM_EMAIL`.
- [x] Test enquiry delivery to `al.mows@outlook.com` (enquiry + auto-reply both confirmed).
- [x] Test the mobile layout (320px, 375px, 430px).
- [x] Run a final production build (`npm run build`).
- [ ] Confirm the exact owner name spelling ("Allan").
- [ ] Confirm the service descriptions in `src/data/services.ts`.
- [ ] Confirm the Facebook link (`facebook.com/AlMowsBlocks`) is a real, public page.
- [ ] Confirm the ABN (`91 670 594 606`).
- [ ] Add a privacy policy page if legally required.
- [ ] Point almowsblocks.com.au at the Vercel deployment.
