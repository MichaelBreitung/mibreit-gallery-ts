/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { LazyLoader } from 'mibreit-lazy-loader';
import ImageViewer from '../components/ImageViewer';
import Slideshow from '../containers/Slideshow';
// helpers
import Image from '../components/Image';
// constants
import { PRELOADER_LEFT_SIZE, PRELOADER_RIGHT_SIZE } from '../constants';
export default class SlideshowBuilder {
    constructor(imageElements, config) {
        Object.defineProperty(this, "_imageViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_lazyLoader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const images = this._createImagesArray(imageElements);
        this._lazyLoader = this._createLoader(images, config === null || config === void 0 ? void 0 : config.preloaderBeforeSize, config === null || config === void 0 ? void 0 : config.preloaderAfterSize);
        this._imageViewer = this._createImageViewer(images, this._lazyLoader, config === null || config === void 0 ? void 0 : config.scaleMode, config === null || config === void 0 ? void 0 : config.zoom);
        if (config === null || config === void 0 ? void 0 : config.interval) {
            setInterval(() => {
                this._imageViewer.showNextImage();
            }, config.interval);
        }
        this._imageViewer.showImage(0);
    }
    build() {
        return new Slideshow(this._imageViewer, this._lazyLoader);
    }
    _createImagesArray(imagesSelector) {
        const images = new Array();
        for (let i = 0; i < imagesSelector.length; i++) {
            const image = new Image(imagesSelector[i]);
            images.push(image);
        }
        return images;
    }
    _createLoader(images, preloaderBeforeSize = PRELOADER_LEFT_SIZE, preloaderAfterSize = PRELOADER_RIGHT_SIZE) {
        const lazyLoader = new LazyLoader(images, preloaderBeforeSize, preloaderAfterSize);
        setTimeout(() => {
            lazyLoader.loadElement(0);
            lazyLoader.setCurrentIndex(0);
        }, 0);
        return lazyLoader;
    }
    _createImageViewer(images, loader, scaleMode, zoom) {
        const imageViewer = new ImageViewer(images, scaleMode);
        if (zoom !== undefined) {
            imageViewer.setZoomAnimation(zoom);
        }
        if (loader) {
            imageViewer.addImageChangedCallback((index, _imageInfo) => {
                loader.setCurrentIndex(index);
            });
            loader.setCurrentIndex(0);
        }
        return imageViewer;
    }
}
