# Mibreit Gallery

## About

I have developed this gallery to fit the needs of my [homepage](https://www.mibreit-photo.com). The goal was a fast and versatile gallery, which can be easily maintained and extended. The gallery is written in modular Typescript and contains windowed lazy loading techniques, a slideshow, a thumb viewer, and a fullscreen. 

## Technologie

As mentioned, Typescript is used as language of choice, to have strong typing throughout the code. In addition, the gallery depends on two of my other packages, which are [mibreit-lazy-loader](https://github.com/MichaelBreitung/mibreit-lazy-loader) and [mibreit-dom-tools](https://github.com/MichaelBreitung/mibreit-dom-tools).

The lazy loader provides, as the name suggests, the lazy loading for the images and the dom tools are an abstraction layer for manipulating the dom.

## Usage

1) clone or download the package
2) npm i
3) build
    - npm build - build minified version for use in homepage
    - npm build:dev - development build including source maps
    - npm build:npm - build package to be included into other projects

Under _/demo_ you find examples on how to use the gallery in a homepage.

## Interface

The gallery exposes three _create_ methods.

- **createSlideshow(imageSelector: string, config: SlideshowConfig)** - Creates a slidshow for a set of images. 

    - **imageSelector**: string - css selector for images used in Slideshow
    - **config?** - *optional* config that contains the following settings:
        - **scaleMode?**: EImageScaleMode - *optional* scale mode, which specifies how images are fit into their parent:
        ````
            - EImageScaleMode {
                NONE,
                FIT_ASPECT,
                STRETCH,
                EXPAND,
            }
        ````
        - **interval?**: number - *optional* interval for automatic image change in milliseconds
        - **zoom?**: boolean - *optional* boolean to activate zoom effect
        - **preloaderBeforeSize?**: number - *optional* specifies the number of elements to lazy load before the current index (*default is 3*)
        - **preloaderAfterSize?**: number - *optional* specifies the number of elements to lazy load after the current index (*default is 7*)
  
- **createThumbScrollerContainer(containerSelector: string, thumbSelector: string,  config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void)** - Creates a thumb scroller for a set of images.

    - **containerSelector**: string - css selector for container of thumbs
    - **thumbSelector**: string - css selector for thumbs inside container
    - **config**: *optional* config that contains the following settings:
        - **numberOfVisibleThumbs**: number - *optional* number of visible thumbs (*default is 7*)
        - **initialIndex?**: number - *optional* initial scroll index (*default is 0*)
    - **thumbClickedCallback?**: (index: number) => void - *optional* callback 

- **createGallery(containerSelector: string, imageSelector: string, config?: GalleryConfig)** - Creates a full gallery for a set of images and thumbs. This creator combines the previous two creators.

    - **containerSelector**: string - css selector for the gallery/slideshow 
    - **imageSelector**: string - css selector for images in gallery container
    - **config?**: *optional* config, which is a combination of the Slideshow and ThumbScroller config above

Please refer to the examples under _/demo_ to see how those parameters are used.


