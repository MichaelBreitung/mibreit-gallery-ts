# Mibreit Gallery

## About

I have developed this gallery to fit the needs of my [homepage](https://www.mibreit-photo.com). The goal was a fast and versatile gallery, which can be easily maintained and extended. The gallery is written in modular Typescript and contains windowed lazy loading techniques, a slideshow, a thumb viewer, and a fullscreen.

## Technologie

### TypeScript

Typescript is used to have strong typing throughout the code. In addition, the gallery depends on two of my other packages, which are [mibreit-lazy-loader](https://github.com/MichaelBreitung/mibreit-lazy-loader) and [mibreit-dom-tools](https://github.com/MichaelBreitung/mibreit-dom-tools).

### Lazy Loading

The lazy loader provides the lazy loading for the images and the dom tools are an abstraction layer for manipulating the dom.

### Rollup

Rollup is used as Bundler for the build versions of the library.

### Vite

Vite is used to provide a development server for testing.

## Prerequisites

This project uses a Dev Container to provide the required tools for Web Development. You must have VS Code and the Dev Containers extension installed on your host machine as well as the Docker Engine. On Windows, you can use Docker Desktop, for example. To avoid problems with the mounting of ssh keys, it is recommended, though, to use WSL2 with a Ubuntu distribution and install Docker there.

Here are three video tutorials that will get you started with Docker and Dev Containers:

- [Where Dev Containers are helpful](https://youtu.be/9F-jbT-pHkg?si=yW4RThXZNC0SMIyl)
- [How to create a custom Dev Container](https://youtu.be/7P0pTECkiN8?si=51YPKbUzL7OlAs80)
- [How to configure VS Code Extenstions and Settings in a Dev Container](https://youtu.be/W84R1CxtF0c?si=YBhBRzKk1lgCKEyz)

To prepare the project:

1. Clone or download the repository.
2. Open the project folder in VSCode.
3. `CTRL+Shift+P` and enter "Dev Containers: Rebuild and Reopen in Container".
4. Inside the Dev Container run: `npm i`.

## Development

Source code is located under "src". Before you make changes, start the development server running `npm run dev`. You can then navigate to different test pages in the browser.

To see changes taking effect, you have to press `r + Enter` in the console window that is currently running the development server. It will restart the server and reload the page. Automatic reloading will only work, if your host system is Linux based. If your host system is Windows, file changes are not properly propagated to the Dev Container and Vite will not recognize those automatically.

## Build

Run `npm run build` to create the ES6 library to be used in other projects as dependency, and the IIFE minimized JavaScript library for inclusion in HTML pages.

## Usage

The most common use of this library will be directly in a HTML page. Include the minimized library located under "lib-iife/mibreitGalleryTs.min.js" via the "script" tag in your homepage and then use the available methods via the global "mibreitGalleryTs" variable.

### Interface

The gallery exposes three _create_ methods.

- **createSlideshow(imageSelector: string, config: SlideshowConfig)** - Creates a slidshow for a set of images.

  - **imageSelector**: string - css selector for images used in Slideshow
  - **config?** - _optional_ config that contains the following settings:
    - **scaleMode?**: EImageScaleMode - _optional_ scale mode, which specifies how images are fit into their parent:
    ```
        - EImageScaleMode {
            NONE,
            FIT_ASPECT,
            STRETCH,
            EXPAND,
        }
    ```
    - **interval?**: number - _optional_ interval for automatic image change in milliseconds
    - **zoom?**: boolean - _optional_ boolean to activate zoom effect
    - **preloaderBeforeSize?**: number - _optional_ specifies the number of elements to lazy load before the current index (_default is 3_)
    - **preloaderAfterSize?**: number - _optional_ specifies the number of elements to lazy load after the current index (_default is 7_)

- **createThumbScrollerContainer(containerSelector: string, thumbSelector: string, config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void)** - Creates a thumb scroller for a set of images.

  - **containerSelector**: string - css selector for container of thumbs
  - **thumbSelector**: string - css selector for thumbs inside container
  - **config**: _optional_ config that contains the following settings:
    - **numberOfVisibleThumbs**: number - _optional_ number of visible thumbs (_default is 7_)
    - **initialIndex?**: number - _optional_ initial scroll index (_default is 0_)
  - **thumbClickedCallback?**: (index: number) => void - _optional_ callback

- **createGallery(containerSelector: string, imageSelector: string, config?: GalleryConfig)** - Creates a full gallery for a set of images and thumbs. This creator combines the previous two creators.

  - **containerSelector**: string - css selector for the gallery/slideshow
  - **imageSelector**: string - css selector for images in gallery container
  - **config?**: _optional_ config, which is a combination of the Slideshow and ThumbScroller config above

Please refer to the examples under _/demo_ to see how those parameters are used.
