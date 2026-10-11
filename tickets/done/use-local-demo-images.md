# Use Local Demo Images

**Priority:** 4

## Background

The demo and test HTML files currently reference images from external websites. This makes the pages dependent on those sites and may display assets that are not part of the repository. Six new local images have been added under `demo/images`, so the sample pages should use those images consistently.

## Affected Areas

| Area          | Role                                                                                                      | Impact                                                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `demo/*.html` | Browser demonstrations for gallery, slideshow, scroller, images wall, scale mode, and fullscreen behavior | Remote image URLs must be replaced with local asset paths, and large galleries must continue to contain enough entries to exercise their layouts |
| `test/*.html` | Static fixtures for browser tests                                                                         | Test fixture image references must resolve locally and preserve the fixture size needed by existing assertions                                   |
| `demo/images` | Repository-local photographic assets                                                                      | The six available images become the shared source for all image references                                                                       |

## Acceptance criteria

- [x] All image links in demo HTML files point to images under `demo/images` and no longer use remote image URLs.
- [x] All image links in test HTML files point to images under `demo/images` and no longer use remote image URLs.
- [x] The six new local images are used as the available image set.
- [x] Galleries with more than six images, including the images wall, repeat the six images in a consistent cyclic order.
- [x] Demo and test pages retain enough entries and suitable alternative text to preserve their intended layout and test behavior.
- [x] Existing tests pass.
- [x] A separate copyright notice is added to the folder containing the new images, and the `README.md` is updated to reference it. Copyright is "Michael Breitung Photography" - https://www.mibreit-photo.com . No use without permission. The images are provided for demonstration and testing purposes only.

## Notes

The new images differ from the images currently referenced, so visual differences are expected. Updating fixture counts or assertions should be limited to changes required by image replacement and any images-wall repetition.
