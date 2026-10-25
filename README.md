# itelect4-project

[![CI](https://github.com/lyruslei/itelect4-project/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/lyruslei/itelect4-project/actions/workflows/ci.yml)

**Campus Lost & Found Tracker**, the frontend: React 19 + TypeScript on Vite, with TanStack Query, React Hook Form + Zod and shadcn/ui. Students register, log in, report items they lost or found (private to their account), browse public claims, and use an AI Report Helper that checks whether an item description has enough detail.

- **Live site:** https://itelect4-project-delta.vercel.app
- **Live API:** https://itelect4-backend-mu.vercel.app/api/health
- **Backend repo:** https://github.com/lyruslei/itelect4-backend

## Architecture

```mermaid
flowchart LR
  fe["itelect4-project<br/>React + Vite on Vercel"]
  be["itelect4-backend<br/>Express on Vercel"]
  db[("MongoDB Atlas")]
  ai["Gemini API"]
  fe -- "fetch + Bearer token" --> be
  be -- "Mongoose" --> db
  be -- "GEMINI_API_KEY" --> ai
```

## Run it locally

Needs Node 22.12 or newer (Node 24 recommended).

```bash
npm install
cp .env.example .env    # set VITE_API_URL, e.g. http://localhost:4000 (no /api, no trailing slash)
npm run dev             # http://localhost:5173
```

The backend has to be running too. See the backend repo's README.

## Tests

```bash
npm test                # Vitest, once
npm run test:watch      # Vitest, re-runs on save
```

Three test files, each beside the file it tests:

- `src/components/ClaimBadge.test.tsx`: a component render (status text, and the "No notes provided" fallback)
- `src/hooks/useToggle.test.ts`: a custom hook's state
- `src/pages/AiHelperPage.test.tsx`: form validation; a too-short description shows the schema's message and sends no request

GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci`, `npm test` and `npm run build` on every push.

## AI-use disclosure

- **In the app:** the AI Report Helper page sends item descriptions to Google Gemini, through the backend's `POST /api/ai`. The browser never sees the Gemini key.
- **In development:** I used Claude Code (Anthropic) as a coding assistant to plan and write parts of this project, including the Session 11 AI helper and the Session 12 tests and CI. I reviewed, ran and verified every change, and I can explain each part.
