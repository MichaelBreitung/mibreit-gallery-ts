# Mibreit Gallery

## About

I have developed this gallery to fit the needs of my [homepage](https://www.mibreit-photo.com). The goal was a fast and versatile gallery, which could be easily maintained and extended. The gallery is written in modular Typescript and contains windowed lazy loading techniques, a slideshow, a thumb viewer and a fullscreen. 

## Technologie

As mentioned Typescript was used as language of choice, to have strong typing throughout the code. In addition the gallery depends on two of my other packages, which are [mibreit-lazy-loader](https://github.com/MichaelBreitung/mibreit-lazy-loader) and [mibreit-dom-tools](https://github.com/MichaelBreitung/mibreit-dom-tools).

The lazy loader provides, as the name suggests, the lazy loading for the images and the dom tools are an abstraction layer for manipulating the dom.

## Usage

1) clone or download the package
2) npm i
3) build
    - npm build - build minified version into dist
    - npm build:dev - development build including source maps
    - npm build:npm - build package to be included into other projects

Under _/demo_ you will find examples on how to use the gallery in a homepage.

## Interface

The gallery exposes three _create_ methods.

- createSlideshow(config: SlideshowConfig) - Creates a slidshow for a set of images. The config contains the following settings:

    - imageSelector: string - selector for the images, e.g. _#container > img_
    - scaleMode?: EImageScaleMode - *optional* scale mode, which specifies how images are fit into their parent:
        - EImageScaleMode {
            NONE,
            FIT_ASPECT,
            STRETCH,
            EXPAND,
          }
    - interval?: number - *optional* interval for automatic image change in milliseconds
    - zoom?: boolean - *optional* boolean to activate zoom effect
  
- createThumbScrollerView(config: ThumbScrollerConfig) - Creates a thumb scroller for a set of images. The config contains the following settings:
    - thumbContainerSelector: string;
    - thumbSelector: string;
    - numberOfVisibleThumbs: number;
    - initialIndex?: number;

- createGallery(config: GalleryConfig) - Creates a full gallery for a set of images and thumbs. This creator combines the previous two and also the configs are combined with an additional parameter added to it:
    - galleryContainerSelector: string - selector for the gallery/slideshow 

Please refer to the examples under _/demo_ to see how those parameters are used.


