/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default class Slideshow {
    constructor(imageViewer, loader) {
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
        this._imageViewer = imageViewer;
        this._loader = loader;
    }
    getImageViewer() {
        return this._imageViewer;
    }
    getLoader() {
        return this._loader;
    }
}
