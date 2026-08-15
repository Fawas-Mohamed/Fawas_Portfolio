# Mohamed Fawas — Portfolio (Phase 1: Next.js Conversion)

This is the original "Shan" portfolio template rebuilt in Next.js 15 + React 19 + TypeScript,
with the exact same layout, typography, spacing, and GSAP/AOS/Swiper animations — re-skinned to
your two brand colors and populated with your real projects, skills, and resume content.

## What changed from the template
- Colors: the `--main` / `--main-two` CSS variables in `public/assets/css/main.css` now map to
  Kiaki Orange (`#F2B759`) and Drak Slate Gray (`#0A4A3C`) instead of the template defaults.
- Content: hero, about, skills, projects, testimonials, tech stack, and footer/contact now use
  your real information from your resume (AuctionPilot, FuelPass, Healspire, the internship
  project, your certifications, and your two references).
- Dead template markup (the multi-demo-page mega menu, "Loved by Teams" client-logo grid) was
  replaced with a real single-page nav and a "Core Technologies" grid.
- All original CSS/JS assets (Bootstrap, GSAP, AOS, Swiper, the custom cursor, the marquee, the
  preloader) are untouched and loaded in the same order as the source template.

## Running it
```bash
npm install
npm run dev      # http://localhost:3000
```

## Before you deploy
1. Add your real resume PDF at `public/Mohamed_Fawas_Resume.pdf` (the "download cv" button links here).
2. Swap the placeholder thumbnails in `public/assets/images/thumbs/portfolio-three-thumb*.jpg`
   for real screenshots of AuctionPilot, the enterprise project, Healspire, and FuelPass.
3. Update the GitHub/LinkedIn/YouTube URLs in `app/page.tsx` (search for `github.com`,
   `linkedin.com`, `youtube.com`) to your real profile links.
4. The contact form is a working front end but isn't wired to a backend yet — that's Phase 2.

## Deploying
This is a standard Next.js app — push it to a GitHub repo and import it on vercel.com, or run
`npm run build && npm start`.

## What's next (Phase 3 — now included)
- ✅ Projects, Skills, service Highlights, and Testimonials are now stored in the database and
  served through the API — no longer hardcoded in the frontend
- ✅ The homepage fetches this content live on every request (verified: editing a project's title
  through the API changes the live site instantly, no rebuild needed)
- ✅ If the API is unreachable, the homepage falls back to sensible default content instead of
  breaking (verified by killing the backend and reloading the page)
- ✅ Full admin UI at `/admin` with tabs to create/edit/delete Projects, Skills, Highlights, and
  Testimonials, plus the existing Messages/stats view. Testimonials have a publish/hide toggle.

## What's next (Phase 4+)
- Blog support (Markdown posts, categories, tags, reading time)
- Basic traffic/visit analytics
- Image upload for thumbnails (currently you type a filename that must exist in
  `public/assets/images/thumbs/`)
