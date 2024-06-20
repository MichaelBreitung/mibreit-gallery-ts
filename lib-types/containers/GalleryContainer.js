/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default class GalleryContainer {
    constructor(imageViewer, loader, thumbsViewer, fullscreenContainer) {
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
        Object.defineProperty(this, "_fullscreenContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_thumbsViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this._imageViewer = imageViewer;
        this._loader = loader;
        this._thumbsViewer = thumbsViewer;
        this._fullscreenContainer = fullscreenContainer;
    }
    getImageViewer() {
        return this._imageViewer;
    }
    getLoader() {
        return this._loader;
    }
    getThumbsViewer() {
        return this._thumbsViewer;
    }
    getFullscreenContainer() {
        return this._fullscreenContainer;
    }
}
