# Support runtime column changes in the images wall

**Priority:** 3

## Background

The images wall fixes its number of columns at construction time and offers no way to change it afterwards. Consumers need to change the column count at runtime (for example on a resize or breakpoint change). A naive implementation that rebuilds the wall from the existing `<img>` elements would lose the lazy loader's bookkeeping: images that are not yet loaded would never load, and click and load callbacks would be lost. The wall therefore needs a new `updateNrColumns` method that re-distributes the existing images, together with their surrogates (the placeholders of images still waiting to load), into a new set of columns, without reloading images that are already loaded. Because such changes are likely to be triggered by resize-like events, rapid repeated calls must not cause repeated re-layouts.

## Affected Areas

| Area                                                         | Role                                                                             | Impact                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ImagesWall.ts`                               | Builds the wall, distributes images into columns, tracks load state              | Needs a new `updateNrColumns` method. The initial distribution must be reusable so that later updates re-distribute the existing image wrappers instead of rebuilding them, keep the wall element stable, start the balancing from a clean state, and debounce updates. |
| `src/builders/ImagesWallBuilder.ts`                          | Creates the images, wall and lazy loader, and attaches the wall to the container | Must keep working with a wall that changes its columns after build; may need to pass a debounce setting through.                                                                                                                                                        |
| `src/factories/createImagesWall.ts` and `src/types/index.ts` | Public entry point and configuration validation                                  | The new method must be reachable on the returned wall; any new option must be validated and have a default.                                                                                                                                                             |
| `src/components/ImagesWall.module.css`                       | Column and wrapper layout and transitions                                        | Moving wrappers between columns must not replay load animations or flash already loaded images.                                                                                                                                                                         |
| `README.md`                                                  | Documents usage and configuration                                                | Must describe how to change the column count at runtime and the debounce behaviour.                                                                                                                                                                                     |
| `doc/architecture.md`                                        | Records component design                                                         | Must be reconciled with the new behaviour.                                                                                                                                                                                                                              |

## Acceptance criteria

- [x] Changing the column count re-distributes the existing image wrappers into the new columns; no new image objects are created.
- [x] Images that are already loaded are not requested again.
- [x] Images that are not yet loaded keep their surrogates and still load lazily once they come into view after the change.
- [x] Click callbacks and load callbacks registered before the change keep working afterwards.
- [x] The wall element stays the same, so the container and anything holding a reference to it are unaffected.
- [x] The column balancing starts from a clean state on every update, so the result matches what an initial build with that column count would produce.
- [x] Several calls in quick succession result in a single re-layout using only the last requested value; the delay has a sensible default and can be set to zero for immediate application.
- [x] A call with the current column count does nothing; a value that is not an integer of at least 1 is rejected consistently with the existing configuration validation.
- [x] Already loaded images do not visibly flash or replay their reveal animation when moved between columns.
- [x] The behaviour is documented and covered by tests where a test setup exists.

## Notes

- A `columns` attribute observer on the `mbg-imageswall` web component is out of scope and can follow as its own ticket.
- Built-in resize or breakpoint detection is out of scope; callers trigger the update themselves.
- Preserving the scroll position across a column change should be assessed during implementation; if the jump is noticeable, handle it here, otherwise record it as a follow-up.
- A debounce helper was removed from this repository as unused (see the Technical Debt entry in `doc/architecture.md`); a small private timer in the wall is preferred over re-introducing a shared helper unless a second consumer appears.
