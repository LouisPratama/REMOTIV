<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/85cd0ead-0ddc-451f-87cd-f1d748144d78

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and configure Supabase, Stripe, and `APP_URL=http://localhost:3000`.
3. Run both Supabase migrations in `supabase/migrations/` in the Supabase SQL editor, in filename order.
4. Start the API in one terminal:
   `npm run dev:api`
5. Start the web app in another terminal:
   `npm run dev`

The browser uses only the Supabase anon key. Keep `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` on the server; never expose them as `VITE_` variables. Premium lessons are currently open in demo mode. Optional premium checkout requires a signed-in Supabase user; Stripe redirects back to the app, where the server verifies payment and records the entitlement, plus a tutor schedule only when one was selected.

Premium lessons are currently open in demo mode and retain their premium labels and pricing. They include article material and a video preview; the full video player is a local placeholder. A Zoom tutor session is optional: a schedule is only requested and saved with a verified Stripe purchase when the learner selects a date and time (WIB). The mentor shares the Zoom link after confirming the schedule.

For local Stripe webhook testing, run `stripe listen --forward-to localhost:3002/api/stripe/webhook` and set its printed signing secret as `STRIPE_WEBHOOK_SECRET`. Configure Supabase Auth email confirmation and the app URL/redirect URL in the Supabase dashboard before testing sign-up. In production, deploy the API alongside the app or route `/api` to the API host.
