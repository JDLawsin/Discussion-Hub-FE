# Frontend — Next.js

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **SWR**.

---

## Requirements

- Node.js 
- npm
- Backend API running (see backend README)
- Typesense instance running (local or cloud)

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then fill in your values in `.env`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Laravel backend API base URL |
| `NEXT_PUBLIC_TYPESENSE_HOST` | Typesense server host |
| `NEXT_PUBLIC_TYPESENSE_PORT` | Typesense server port (default: `8108`) |
| `NEXT_PUBLIC_TYPESENSE_PROTOCOL` | `http` (local) or `https` (cloud) |
| `NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY` | **Search-only** key — safe to expose in browser |

### 3. Run the development server

```bash
npm run dev
```

App is available at `http://localhost:3000`.

---

## Typesense Setup
### Client configuration

The Typesense client is configured in `lib/typesense.ts`:
---
