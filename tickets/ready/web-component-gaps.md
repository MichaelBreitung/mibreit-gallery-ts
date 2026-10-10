# Close gaps in the web components' options and lifecycle

**Priority:** 3

## Background

Reading the web components shows gaps compared with the underlying library and with how pages use them:

- The slideshow element does not offer an initial image, although the library supports it for the gallery.
- The gallery element always uses the fit-aspect scale mode, and the other scale modes cannot be chosen with an attribute.
- The title element is looked up once on the whole page, so with several galleries on one page all of them write into the first title element.
- Elements do nothing when removed from the page, so listeners and the entries in the global gallery list remain.

## Affected Areas

| Area                  | Role                                           | Impact                                                                                                                   |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Web components        | Create the galleries and respond to the page   | Add the missing attributes. Connect each title element to its own gallery. Release resources when an element is removed. |
| Gallery objects       | Created and listed globally by the elements    | Removed from the list when their element is removed.                                                                     |
| Demos                 | Show the use cases                             | Add or adjust where a new attribute needs showing.                                                                       |
| `README.md`           | Attribute reference                            | Document new attributes and the title behaviour.                                                                         |
| `doc/architecture.md` | Describes web components and the title element | Reconcile.                                                                                                               |

## Acceptance criteria

- [ ] The slideshow element accepts an initial image.
- [ ] The gallery element accepts a scale mode, with the current behaviour as the default.
- [ ] With several galleries on one page, a title element shows the title of its own gallery. A single-gallery page with a single title element keeps working unchanged.
- [ ] Removing an element from the page removes its gallery from the global list and releases what it registered, so that re-adding the element works.
- [ ] The README documents the new attributes and the title behaviour.
- [ ] Browser tests cover at least the title assignment and the removal.

## Notes

- The way a title element is associated with a gallery needs a decision while solving (for example by position inside the gallery element or by an explicit reference). Keep the existing placement working.
- Related: `dedupe-web-component-setup` should be done first, so the changes are not made in four copies. A decision on the global gallery list belongs to the author and is not part of this ticket.
- Full cleanup of every listener may need changes in the components; limit the scope to what the elements register themselves and note anything left over in the architecture documentation.
