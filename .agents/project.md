# Project Profile

The onboarding result for **this** repository — the one repo-specific file in the agent instruction
set. Everything else under `.agents/` is generic and is replaced when the instruction set is
re-installed; this file is preserved.

Owned by the `onboarding` skill. Read it before the first task of a session.

Minimalistic TypeScript image gallery (`mibreit-gallery-ts`) with lazy loading for a fast viewing
experience. It is built as an ES module library, a browser IIFE bundle, and web components, and
ships with demo pages.

## Documentation Map

The architecture documentation is the single source of truth. Each file has one scope; content is
never duplicated across files.

| File                  | Scope                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `doc/architecture.md` | Full arc42 architecture of the library: design, decisions, quality goals, Technical Debt |
| `README.md`           | Entry point: usage on a website (web components, factories), overview and dev setup      |

## Conventions

| Setting            | Value    |
| ------------------ | -------- |
| Documentation root | `doc`    |
| Trunk branch       | `master` |
| Scratch directory  | `temp/`  |

The scratch directory holds throwaway output (drafts, generated reports, scratch notes) and must be
git-ignored. Never write throwaway files anywhere else in the repository.

## Ticket System

| Setting | Value                     |
| ------- | ------------------------- |
| System  | Local Markdown            |
| Profile | `ticket-systems/local.md` |

The profile is the file under `.agents/ticket-systems/` that defines the id format and how
tickets are fetched and created. Exactly one profile is active. Skills read only its five sections,
so swapping the backend means changing the line above — no skill is touched.

## Commands

| Command         | Purpose                                                                           | Notes                                                               |
| --------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `npm run dev`   | Vite dev server for the demo pages                                                | Long-running; do not run unattended                                 |
| `npm test`      | `vitest run` (puppeteer browser tests in `test/`)                                 | Needs Chrome/Chromium for puppeteer                                 |
| `npm run build` | `tsc --build --clean && tsc && node build/buildLib.js && node build/buildIffe.js` | Overwrites `lib/`, `lib-types/`, `lib-iife/`; no lint script exists |
