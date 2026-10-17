# Reduce the shipped bundle size

**Priority:** 3

## Background

The shipped IIFE bundle contains CSS with obsolete vendor prefixes and several repeated declarations that could live in shared rules. The build also uses Vite's default CSS target, which lowers newer CSS for browsers outside the supported evergreen-browser policy. Finally, the architecture documents unused JavaScript code, and no build step reports the bundle size, so regressions are easy to miss.

## Affected Areas

| Area | Role | Impact |
| --- | --- | --- |
| `src/components/*.module.css` | Component styling | Remove obsolete prefixes and consolidate repeated declarations without weakening the documented `mbg__` class-name contract. |
| `src/builders/*.module.css` | Gallery builder styling | Consolidate repeated button and mirrored-icon styles. |
| `src/index.css` | Global gallery styles | Possible location for shared state and layout rules. |
| `src/tools/debounce.ts` | Unused helper | Remove it if still unused. |
| `src/constants.ts` | Shared constants | Remove constants that remain unreferenced after checking. |
| `vite.config.js` | Build configuration | Set an explicit modern CSS target and report the resulting bundle size. |
| `doc/architecture.md` | Architecture record | Reconcile CSS-target and bundle-size decisions, and update Technical Debt once unused code is removed. |

## Acceptance criteria

- [x] Obsolete `-moz-`, `-o-`, and `-ms-` prefixes and the redundant `-webkit-box-shadow` declarations are removed.
- [x] Repeated CSS declarations are consolidated where a shared rule is clearer and does not change behaviour.
- [x] The build uses an explicit CSS target consistent with the documented evergreen-browser policy, and modern CSS such as `inset` is no longer unnecessarily lowered.
- [x] Unused JavaScript identified in Technical Debt item TD-6 is removed after verification.
- [x] The production build reports raw and gzipped bundle size, or a suitable ticket is filed for a follow-up if CI integration is needed.
- [x] `task test:all` passes and the production bundle remains smaller than before the change.

## Notes

- The measured baseline is 60.80 kB raw and 16.36 kB gzip, including about 4.7 kB of embedded CSS. Obsolete prefixes account for roughly 379 bytes before gzip.
- Keep the stable, unhashed `mbg__[local]` class-name format because host pages rely on it for overrides.
- Do not change styling behaviour or visual output.
- SVG icon optimization is explicitly out of scope.
