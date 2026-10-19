# Add an `allowUpscale` setting

**Priority:** 3

## Background

Images are currently limited to their declared maximum sizes, which prevents smaller images from being enlarged. That limit is intended as the default, but there is no option to opt out of it. A boolean `allowUpscale` setting would let consumers choose whether an image may grow beyond its declared size while following the selected scale mode.

## Affected Areas

| Area                | Role                                                | Impact                                                                                                     |
| ------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Image handling      | Applies the image's maximum size and scale behavior | Must honor the `allowUpscale` setting in every image use, while retaining the non-upscaling default.        |
| Scale modes         | Determine how images fit, stretch, or expand        | Must continue to define the scaling behavior, with upscaling enabled only when the setting allows it.       |
| Public configuration | Exposes settings to consumers                       | Needs a documented boolean option with a default of `false`.                                                |
| `README.md`         | Documents usage and configuration                   | Must describe the new setting and its default.                                                              |
| `doc/architecture.md` | Records image-stage and configuration design      | Must be reconciled with the new setting.                                                                    |

## Acceptance criteria

- [x] All image uses accept an `allowUpscale` boolean setting.
- [x] The default is `false`, so existing images remain limited to their maximum sizes.
- [x] When `allowUpscale` is `true`, images that are smaller than the available space can be enlarged according to the selected scale mode.
- [x] The setting does not break the intended behavior of any existing scale mode.
- [x] The setting, its default, and its scope are documented.
- [x] Existing tests pass, and the enabled and disabled behaviors are covered where a test setup exists.

## Notes

- `allowUpscale` should be a boolean, not a target-size or sizing override.
- When the setting is `false`, no image may be upscaled; when it is `true`, the scale mode remains the source of truth for how the image is sized.
