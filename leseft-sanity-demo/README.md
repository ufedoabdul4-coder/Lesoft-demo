# LESEFT website

Next.js App Router website connected to Sanity for published content.

## Structure

```text
app/                 Public routes, Studio route, revalidation API route
components/          Header, footer, cards, enquiry form and UI components
lib/                 Environment helpers and content access layer
sanity/schema-types/ Sanity document schemas and image field
sanity/lib/          Sanity client and GROQ queries
sanity.config.ts     Studio configuration
netlify.toml         Netlify build configuration
.env.example         Environment variable examples
```

## Setup

Requirements:

- Node.js 20 or newer
- npm 10 or newer
- A Sanity project with published content

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`. Studio is available at `http://localhost:3000/studio` for authorised editors.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID used for public reads and Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset containing published documents |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version used by queries |
| `NEXT_PUBLIC_SITE_URL` | Metadata base URL |
| `SANITY_REVALIDATE_SECRET` | Shared secret protecting the revalidation endpoint |

No Sanity write token is used by the frontend. Studio authenticates editors through Sanity sign-in.

## Content

Public pages read only published Sanity documents. When a document or collection is not published, the page shows a clean empty state. No local fallback copy or bundled imagery is included.

Document types:

- `homepage`
- `about`
- `commodity`
- `equipment`
- `project`
- `partners`
- `contactInfo`

The contact form opens a prepared email only when a published contact email exists.

## Revalidation

Content fetching uses a 60-second revalidation window and the `sanity-content` cache tag.

Configure a Sanity webhook that POSTs to:

```text
https://<site-url>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
```

The endpoint accepts the secret in the query string or `x-revalidate-secret` header, rejects invalid requests, and revalidates the content tag and site layout.

## Scripts

```bash
npm run dev        Start the development server
npm run build      Create a production build
npm run start      Serve the production build locally
npm run lint       Run ESLint with zero warnings allowed
npm run typecheck  Run TypeScript checks
```

## Deployment

`netlify.toml` configures the production build with `@netlify/plugin-nextjs`. Set all environment variables in the deployment environment and add the deployment URL to Sanity CORS origins with credentials enabled.
