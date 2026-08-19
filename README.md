# AVV Dairy Farm - Frontend

React + Vite + Tailwind. Talks to the `avvdairyserver` API.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set `VITE_API_URL` (defaults to `http://localhost:5007/api`)
3. `npm run dev`

## IMPORTANT - replace placeholder images
`src/assets/images/{logo,login-bg,hero1,hero2,hero3}.png` are 1x1 placeholder
PNGs so the app builds and runs immediately. Replace them with your real
brand assets (same filenames) before shipping.

## What changed from the original mockup
- Every page now calls the real backend instead of `dummy*.js` files
  (data folder can be deleted once you've verified everything works).
- Animal "status" field: the backend exposes `category` as a `status`
  alias (virtual field), so `Animals.jsx`/`RecentAnimals.jsx` work unchanged.
- Vaccination "Due Soon/Overdue" and Milk "Today's Total" are now computed
  server-side against the real date, not a hardcoded `"2026-07-21"`.
- `HeroBanner` and the Dashboard `StatCard`s now read the same
  `/api/dashboard/summary` response, so they can't disagree with each other.
- New pages: Breed Master, Disease Master, Medicine Inventory, Supplier
  Master (backend already existed, frontend didn't).
- `Reports.jsx` is a placeholder - SRS Phase 20 has no backend yet.
