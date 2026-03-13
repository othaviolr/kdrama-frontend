# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking (tsc --noEmit)
```

No test suite is configured yet.

## Architecture

Next.js 14 App Router application for tracking Asian dramas (doramas). All state management uses React Context (no Zustand or React Query in practice — the README describes planned architecture that was not implemented).

### API Communication

All API calls go through `/api/*` which is proxied via `next.config.js` rewrites to a backend server. The base class `src/services/api.ts` (`ApiService`) handles auth headers (JWT from `localStorage.getItem('token')`) and fetch. Every service class extends it.

Services are in `src/services/` and exported from `src/services/index.ts`. The main ones are:
- `usuarioService` — auth, profile, follow
- `doramaService` — drama catalog
- `avaliacaoService` — ratings/reviews
- `listaService` — user playlists/lists
- `atividadeService` — activity feed
- `progressoService` — episode watch progress

### State Management (Context API)

All global state lives in `src/context/`. `src/app/providers.tsx` nests all providers in this order:
`AuthProvider > DoramaProvider > AtorProvider > ProgressoProvider > AtividadeProvider > AvaliacaoProvider > ListaProvider > FeedProvider`

`AuthContext` (via `useAuth()`) is the central auth hook — it reads/writes `token` and `usuarioId` to `localStorage` and verifies the token on mount.

### Pages

- `/` — Home (hero, stats, continue watching)
- `/catalog` — Drama browse/search with filters
- `/dorama/[id]` — Drama detail (synopsis, seasons, reviews, sidebar)
- `/profile` — Authenticated user profile (tabs: lists, reviews, activity, followers, settings)
- `/profile/[username]` — Public profile view
- `/lista/[id]` — User playlist detail
- `/login`, `/register` — Auth pages
- `/maysa` — Admin panel for creating doramas, actors, seasons, episodes (no auth guard)
- `/ajuda` — FAQ / Central de Ajuda (static, uses `<details>`/`<summary>`)
- `/contato` — Contact form with name, email, subject, message (`'use client'`)
- `/privacidade` — Privacy policy (static)
- `/termos` — Terms of use with summary index (static)

### Component Organization

- `src/components/ui/` — Base design system components (Button, Card, Input, Badge, Avatar, StarRating, etc.)
- `src/components/layout/` — Navbar, Header, QuickActionsFooter
- `src/components/modals/` — Shared modals (AvaliacaoModal, ProgressModal, AddDoramaModal, SelectListModal)
- `src/components/{page}/` — Page-specific components, sometimes with sub-folders using `index.ts` barrel exports
- `src/types/` — All TypeScript interfaces organized by domain (dorama, user, lista, avaliacao, etc.)

### Styling

Tailwind CSS with `tailwind-merge` (`twMerge`) and `clsx` for conditional classes. Prettier enforces single quotes, semi-colons, and 80-char print width.

### Key Conventions

- All client components have `'use client'` at the top (contexts, hooks, interactive components)
- Domain terminology uses Portuguese: `dorama`, `ator`, `temporada`, `episodio`, `avaliacao`, `lista`, `progresso`, `usuario`
- Component folders with multiple files use an `index.ts` barrel export
- The `/maysa` admin page is unprotected — content management forms for the backend
