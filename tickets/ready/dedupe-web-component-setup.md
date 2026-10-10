# Remove duplicated setup code from the web components

**Priority:** 3

## Background

The four web components that create a gallery, slideshow, thumbnail scroller or images wall repeat the same steps: generate a unique class from a per-element counter, add it to the element, read attributes, build selectors from the class, call the factory and fade the containers in. Each new component or attribute means another copy. This makes the entry file long and harder to maintain (quality goal: maintainability).

## Affected Areas

| Area                  | Role                                           | Impact                                                                                                                     |
| --------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Web-component entry   | Defines the custom elements and their set-up   | Extract the shared steps (unique class, attribute reading, fade-in) so each element describes only what is specific to it. |
| Tools                 | Home of small shared helpers                   | Possible location for the extracted helpers.                                                                               |
| `doc/architecture.md` | Describes the web components and extensibility | Reconcile where it describes how elements are built.                                                                       |

## Acceptance criteria

- [ ] The steps shared by the elements exist once.
- [ ] Each element contains only its own attributes, selectors and factory call.
- [ ] Behaviour is unchanged: the generated classes, selectors, fade-in and the elements' public properties are the same, and the existing browser tests and demos work.
- [ ] No new public API is added.

## Notes

- Pure refactoring. Best done before or together with `web-component-gaps` and `consistent-input-validation`, which would otherwise have to change every copy.
- Keep it small: no base-class hierarchy unless it clearly pays off.
