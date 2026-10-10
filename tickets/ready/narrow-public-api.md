# Narrow the public API to web components and the fullscreen-only function

**Priority:** 3

## Background

The script bundle exposes the web components and, through its global, all factory functions, the components and the scale-mode type (TD-2, ADR-4). Web components cover the gallery, slideshow, thumbnail scroller and images wall. Having both ways to create the same thing is ambiguous and not required. Users shall use the web components for the cases they are designed for. Only the fullscreen-only gallery has no web component, so it keeps a direct function that takes a CSS selector.

## Affected Areas

| Area                                                      | Role                                                                   | Impact                                                                                                                                                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entry points                                              | Web-component entry re-exports the module entry                        | Define what the bundle exposes: the fullscreen-only function and what it needs (scale-mode type). Clarify the role of the second entry, which loses its purpose once the module build is dropped. |
| Factories for gallery, slideshow, thumbnails, images wall | Public today, used by the web components                               | Become internal to the web components. Remain available to the fullscreen-only gallery only as needed.                                                                                            |
| Component exports                                         | Exported by the module entry                                           | Decided while solving the ticket (see Notes).                                                                                                                                                     |
| Web components                                            | Use the factories internally                                           | Behaviour unchanged. The images wall element continues to use the fullscreen-only function.                                                                                                       |
| Demos                                                     | Several create galleries, slideshows and scrollers through factories   | Rewrite to web components where one exists. Keep one demo for the fullscreen-only function.                                                                                                       |
| Browser tests                                             | Single-image and thumbnail scroller tests call factories on the global | Rewrite to use the web components, or drive the internals another way.                                                                                                                            |
| Factory unit test                                         | Tests argument validation of the gallery factory                       | Keep, adjust or remove depending on what remains public.                                                                                                                                          |
| `README.md`                                               | Documents the factory functions and the global gallery list            | Describe only the web components and the fullscreen-only function.                                                                                                                                |
| `doc/architecture.md`                                     | ADR-4, TD-2, building blocks, glossary, interfaces                     | Reconcile. Mark TD-2 resolved.                                                                                                                                                                    |

## Acceptance criteria

- [ ] The script bundle's global exposes the fullscreen-only function and nothing that duplicates a web component, apart from what the open decision on components requires.
- [ ] The gallery, slideshow, thumbnail scroller and images wall are created through their web components only.
- [ ] The fullscreen-only gallery can still be created with a CSS selector, on pages without any web component.
- [ ] The relationship between the entry points is unambiguous, and the web-component entry no longer re-exports a wider API.
- [ ] All demos and browser tests use the remaining public API and pass.
- [ ] The README describes the narrowed API, including the global gallery list if it stays.
- [ ] The architecture documentation is reconciled and TD-2 is marked resolved.

## Notes

- Decision during solving: whether any component exports need to stay. Check the common use of the gallery on the author's website (mibreit-photo.com) for a reason to keep them. If none is found, they become internal.
- This is a breaking change for anyone calling the factories from the global. The author's own pages that do so must be migrated.
- Related: `release-iife-via-github` drops the module build, which removes the other consumer of the module entry. The two tickets can be solved in either order.
