# Mibreit Gallery

A minimalistic, fast image gallery for web pages, written in TypeScript. It needs no UI framework and works on the images that are already in your HTML.

It was built for the photography website of [Michael Breitung Photography](https://www.mibreit-photo.com) and is published as open source under the BSD-2-Clause licence.

## Features

- **Slideshow** with four scale modes, optional zoom effect and optional automatic advance.
- **Thumbnail scroller** with a configurable number of visible thumbnails.
- **Gallery** that combines slideshow and thumbnails with previous/next buttons, in-page fullscreen, keyboard and swipe navigation, and image descriptions.
- **Fullscreen-only gallery** that turns the regular images of a page into a clickable set which opens as a fullscreen slideshow.
- **Images wall** with multiple columns, loading images as they scroll into view. Clicking an image opens it in fullscreen.
- **Fullscreen background** that can adapt to the average color of the current image.
- **Lazy loading** so that only images close to being viewed are requested.

Slideshow, thumbnail scroller, gallery and images wall are used through HTML elements (web components). The fullscreen-only gallery, which works on regular page images without a dedicated element, is created with one JavaScript function.

## Using the Gallery on a Website

### 1. Include the script

Add the minified script bundle `mibreitGalleryTs.min.js` to your page. It registers the HTML elements and exposes the fullscreen-only gallery function on the global `mibreitGalleryTs`.

```html
<script src="/scripts/mibreitGalleryTs.min.js"></script>
```

Download `mibreitGalleryTs.min.js` from a [GitHub Release](https://github.com/MichaelBreitung/mibreit-gallery-ts/releases) and host it on your own website. Loading it from a CDN or another external host is not supported or recommended.

### 2. Mark your images for lazy loading

Every image that should be lazy loaded needs the class `mbll__marker` (or a `data-src` attribute instead of `src`). Without it, the browser loads the image normally and the gallery cannot defer it. The gallery does not warn you about this.

The marker class is also useful to keep not-yet-loaded images from showing up as plain images. Add this to your CSS:

```css
.mbll__marker {
  display: none !important;
}
```

### 3. Write the markup

The gallery works on the `<img>` elements in your page. It reads their data from the element attributes:

| Attribute                           | Used for                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `src` / `data-src`                  | Image location                                                                       |
| `title` / `data-title`              | Image title (shown by the optional `mbg-title` element)                              |
| `alt`                               | Image description, if there are no `<figcaption>` elements                           |
| `<figcaption>`                      | Image description, if every image has one                                            |
| `width`, `height`                   | Natural image size. Images are not upscaled unless enabled via `allowUpscale`        |
| `data-print-size`, `data-print-url` | Marks an image as available for purchase (enables the buy button of the images wall) |

All elements use the `mbg-` prefix. Options are set as attributes and are all optional.

Image and thumbnail containers need a height in your CSS, because the gallery fills the available space:

```css
mbg-images {
  height: 40rem;
}
mbg-thumbs {
  height: 9rem;
}
```

#### Gallery

```html
<mbg-gallery numberOfVisibleThumbs="5" loaderWindowLeft="0" loaderWindowRight="1">
  <mbg-title></mbg-title>
  <mbg-images>
    <figure>
      <img class="mbll__marker" src="big-1.jpg" title="First" alt="Description" width="1280" height="853" />
      <figcaption><p>Description</p></figcaption>
    </figure>
    <!-- more images -->
  </mbg-images>
  <mbg-thumbs>
    <img class="mbll__marker" src="thumb-1.jpg" />
    <!-- more thumbnails, same order as the images -->
  </mbg-thumbs>
</mbg-gallery>
```

| Attribute               | Description                                      | Default |
| ----------------------- | ------------------------------------------------ | ------- |
| `numberOfVisibleThumbs` | Number of thumbnails visible at once             | 7       |
| `loaderWindowLeft`      | Number of images to load before the current one  | 0       |
| `loaderWindowRight`     | Number of images to load after the current one   | 1       |
| `initialImageNr`        | Index of the image shown first (starting at 0)   | 0       |
| `interval`              | Automatic advance in milliseconds (minimum 1000) | off     |
| `zoom`                  | Flag attribute. Activates the zoom effect        | off     |
| `allowUpscale`          | Flag attribute. Allows images to grow beyond their declared size | off     |

Thumbnails are optional. Without them, or with a single thumbnail, the thumbnail area is hidden.

#### Slideshow

```html
<mbg-slideshow interval="4000" zoom>
  <mbg-images>
    <img class="mbll__marker" src="image-1.jpg" width="1280" height="853" />
    <!-- more images -->
  </mbg-images>
</mbg-slideshow>
```

Supports `loaderWindowLeft`, `loaderWindowRight`, `interval` (default 5000), `zoom`, `allowUpscale`, and the flag `expand`, which makes images cover their container instead of fitting into it.

#### Thumbnail scroller

```html
<mbg-thumbscroller numberOfVisibleThumbs="5">
  <mbg-thumbs>
    <img class="mbll__marker" src="thumb-1.jpg" />
    <!-- more thumbnails -->
  </mbg-thumbs>
</mbg-thumbscroller>
```

Supports `numberOfVisibleThumbs` (default 7), `initialIndex` (default 0), and the flag `allowUpscale`.

#### Images wall

```html
<mbg-imageswall columns="3" addBuyButton>
  <mbg-images>
    <img class="mbll__marker" src="image-1.jpg" width="1280" height="853" data-print-size="l" />
    <!-- more images -->
  </mbg-images>
</mbg-imageswall>
```

| Attribute           | Description                                                                     | Default |
| ------------------- | ------------------------------------------------------------------------------- | ------- |
| `columns`           | Number of columns                                                               | 3       |
| `scrollLoaderDelay` | Delay in milliseconds before an image that scrolled into view is loaded         | 300     |
| `addBuyButton`      | Flag attribute. Shows a buy button in fullscreen for images with print metadata | off     |
| `allowUpscale`      | Flag attribute. Allows images to grow beyond their declared size                | off     |

With `addBuyButton`, the element dispatches a `buy-clicked` event whose `detail.idx` is the index of the image:

```js
document.querySelector('mbg-imageswall').addEventListener('buy-clicked', (event) => {
  console.log('Buy image', event.detail.idx);
});
```

### Using the fullscreen-only gallery function

Use `createFullscreenOnlyGallery` when your page already contains regular images and you want clicks on them to open a fullscreen slideshow. It takes a CSS selector and is available on the global `mibreitGalleryTs`. Invalid parameters or selectors that match no images throw an error with a descriptive message.

```js
const gallery = mibreitGalleryTs.createFullscreenOnlyGallery('#container > img', {
  scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
});
```

| Function                                                                                       | Creates                                                         |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `createFullscreenOnlyGallery(imageSelector, config, showDescriptions?, buyImageCallback?)`     | Makes the page's images open in a fullscreen slideshow on click |

Fullscreen-only configuration options:

| Option               | Description                                                                                                              | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| `scaleMode`          | How fullscreen images fit their container: `EImageScaleMode.NONE`, `FIT_ASPECT`, `STRETCH`, `EXPAND`                     |         |
| `interval`           | Automatic advance in milliseconds (minimum 1000)                                                                         | off     |
| `zoom`               | Activates the zoom effect                                                                                                | `false` |
| `allowUpscale`       | Allows images to grow beyond their declared size                                                                          | `false` |
| `loaderWindowLeft`   | Number of images to lazy load before the current one                                                                     | 0       |
| `loaderWindowRight`  | Number of images to lazy load after the current one                                                                      | 1       |

The returned gallery object gives access to the image viewer (navigation, current index, image-changed callbacks) and the fullscreen, for use in your own scripts. Galleries created from web components are also collected in the global list `window.mbgGalleryObjects`.

### Navigation and Fullscreen

- Arrow keys, previous/next buttons, thumbnail clicks, taps (right half forward, left half back) and swipes change the image. Navigation wraps around.
- Fullscreen opens the gallery as an overlay in the page. `Esc` closes it, `f` toggles it.
- With several galleries on one page, keyboard shortcuts currently affect all of them.

### Styling

- All CSS classes of the gallery start with `mbg__` and are not hashed, so you can override them in your own CSS.
- Colors are controlled by the CSS variables `--background-color` and `--foreground-color` on the document root. With average-color fullscreen backgrounds, the gallery updates them on every image change.
- Gallery and thumbnail containers start transparent and are faded in once the gallery is ready. If the script is blocked or fails, the images stay invisible.

### Updating the script

Download the new `mibreitGalleryTs.min.js` from the relevant [GitHub Release](https://github.com/MichaelBreitung/mibreit-gallery-ts/releases) and replace your hosted copy. The script is not published to npm, and no ES module build is provided.

### Browser support

Current evergreen browsers (Chrome, Firefox, Safari, Edge) on desktop and touch devices. Legacy browsers are not supported.

## How It Works

The library is built in layers. Each layer only uses the one below it:

```text
HTML elements / JavaScript functions  ->  Factories  ->  Builders  ->  Components
```

- **Entry points:** the HTML elements read their attributes and call the same factories that you can call directly from JavaScript.
- **Factories** validate parameters and configuration, find the images in the page and hand over to a builder.
- **Builders** assemble the building blocks into a slideshow, gallery, thumbnail scroller or images wall and wire them together. The gallery builder adds optional features such as buttons, fullscreen, thumbnails and descriptions.
- **Components** each do one job: wrap an image, scale and center it, switch between images, scroll thumbnails, detect swipes, show fullscreen, compute the average color.

Key design choices:

- **The page owns the images.** The gallery works on the `<img>` elements in your HTML instead of loading an image list at runtime.
- **Lazy loading by strategy.** Slideshows, galleries and thumbnails load a small window of images around the current one. The images wall loads images when they scroll into view.
- **No shadow DOM.** Your page's CSS applies directly to the gallery.
- **Fullscreen is an in-page overlay**, not the browser's Fullscreen API.

Lazy loading and DOM handling come from two companion packages by the same author, [mibreit-lazy-loader](https://github.com/MichaelBreitung/mibreit-lazy-loader) and [mibreit-dom-tools](https://github.com/MichaelBreitung/mibreit-dom-tools). The average color is computed with [fast-average-color](https://github.com/fast-average-color/fast-average-color).

For the full design, decisions, quality goals and known technical debt, see the [architecture documentation](doc/architecture.md).

## Development

### Demo and Test Images

The demo and test pages use images from `demo/images`. They are copyright © Michael Breitung Photography; see [`demo/images/COPYRIGHT.md`](demo/images/COPYRIGHT.md). They may not be used without permission and are for demonstration and testing only.

### Technology

TypeScript (strict mode), [Vite](https://vite.dev) for the development server and Rollup (through Vite) for the builds, Vitest and Puppeteer for tests.

### Prerequisites

The project uses a Dev Container that provides Node.js and Chrome. You need VS Code with the Dev Containers extension and the Docker Engine. On Windows, WSL2 with an Ubuntu distribution and Docker installed there is recommended, to avoid problems with mounting SSH keys.

Helpful video tutorials:

- [Where Dev Containers are helpful](https://youtu.be/9F-jbT-pHkg?si=yW4RThXZNC0SMIyl)
- [How to create a custom Dev Container](https://youtu.be/7P0pTECkiN8?si=51YPKbUzL7OlAs80)
- [How to configure VS Code Extensions and Settings in a Dev Container](https://youtu.be/W84R1CxtF0c?si=YBhBRzKk1lgCKEyz)

### Setup

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Press `Ctrl+Shift+P` and run "Dev Containers: Rebuild and Reopen in Container".
4. Inside the Dev Container run `task init:dev`.

`init:dev` installs the dependencies and creates an optional `.env` file with `OPENROUTER_BASE_URL` and `OPENROUTER_API_KEY`, using the matching environment variables if they are set. Docker Compose reads `.env` when the Dev Container is created or rebuilt, so creating or changing `.env` inside an existing container requires reopening the container before that file affects the container's environment.

### Commands

| Command               | Purpose                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `task init:dev`       | Installs npm packages and creates the optional `.env` file with the OpenRouter                 |
| `task dev`            | Starts the Vite development server (port 5173) with an index of demo pages for manual testing. |
| `task clean`          | Removes the generated script bundle.                                                           |
| `task test:all`       | Builds the bundle and runs the tests.                                                          |
| `task deploy:build`   | Type-checks the source and builds the minified script bundle.                                  |
| `task deploy:update-version` | Updates the package version (`VERSION=x.y.z`).                                          |
| `task deploy:create`  | Creates a GitHub Release and Git tag (`VERSION=x.y.z`).                                        |
| `task deploy:release` | Builds the bundle, updates the package version and creates a GitHub Release (`VERSION=x.y.z`). |
| `task deploy:upload`  | Uploads an existing bundle to an existing GitHub Release (`VERSION=x.y.z`).                    |

### Releasing the script bundle

Create the release, tag and bundle in one step:

```sh
task deploy:release VERSION=<version>
```

The version must use the `x.y.z` format, be higher than the latest release and is written to `package.json`. The Git tag and GitHub Release use the same version as their name. The task requires the [GitHub CLI](https://cli.github.com/) and an authenticated `gh` account. It creates the release with generated notes and uploads `lib-iife/mibreitGalleryTs.min.js` to it.

With the development server running, press `r` + `Enter` in its console to restart it and reload the page. Automatic reloading only works if your host system is Linux. On Windows, file changes are not propagated to the Dev Container and Vite does not detect them.

The demo pages cover every use case: gallery (with and without thumbnails), slideshow, thumbnail scroller, fullscreen-only gallery, images wall and scale modes. Most of them exist in a variant that uses the HTML elements and one that uses the JavaScript functions.

### Contributing

Issues and pull requests are welcome. Please check the [architecture documentation](doc/architecture.md) first. It records the intended design, the decisions behind it and known technical debt.

## License

BSD-2-Clause. See the LICENSE file.
