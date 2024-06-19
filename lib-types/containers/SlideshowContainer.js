/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { LazyLoader } from 'mibreit-lazy-loader';
// helpers
import Image from '../components/Image';
// constants
import { PRELOADER_LEFT_SIZE, PRELOADER_RIGHT_SIZE } from '../constants';
import ImageViewer from '../components/ImageViewer';
export default class SlideshowContainer {
    constructor(elements, config) {
        Object.defineProperty(this, "_imageViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_loader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const images = this._prepareImages(elements);
        this._loader = this._prepareLoader(images, config === null || config === void 0 ? void 0 : config.preloaderBeforeSize, config === null || config === void 0 ? void 0 : config.preloaderAfterSize);
        this._imageViewer = this._prepareImageViewer(images, this._loader, config === null || config === void 0 ? void 0 : config.scaleMode, config === null || config === void 0 ? void 0 : config.zoom);
        if (config === null || config === void 0 ? void 0 : config.interval) {
            setInterval(() => {
                this._imageViewer.showNextImage();
            }, config.interval);
        }
        this._imageViewer.showImage(0);
    }
    getViewer() {
        return this._imageViewer;
    }
    getLoader() {
        return this._loader;
    }
    _prepareImages(imagesSelector) {
        const images = new Array();
        for (let i = 0; i < imagesSelector.length; i++) {
            const image = new Image(imagesSelector[i]);
            images.push(image);
        }
        return images;
    }
    _prepareLoader(images, preloaderBeforeSize = PRELOADER_LEFT_SIZE, preloaderAfterSize = PRELOADER_RIGHT_SIZE) {
        const lazyLoader = new LazyLoader(images, preloaderBeforeSize, preloaderAfterSize);
        setTimeout(() => {
            lazyLoader.loadElement(0);
            lazyLoader.setCurrentIndex(0);
        }, 0);
        return lazyLoader;
    }
    _prepareImageViewer(images, loader, scaleMode, zoom) {
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
