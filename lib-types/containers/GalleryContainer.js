/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default class GalleryContainer {
    constructor(viewer, loader, thumbScroller, fullscreenContainer) {
        Object.defineProperty(this, "_viewer", {
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
        Object.defineProperty(this, "_thumbScroller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this._viewer = viewer;
        this._loader = loader;
        this._thumbScroller = thumbScroller;
        this._fullscreenContainer = fullscreenContainer;
    }
    getViewer() {
        return this._viewer;
    }
    getLoader() {
        return this._loader;
    }
    getScroller() {
        return this._thumbScroller;
    }
    getFullscreen() {
        return this._fullscreenContainer;
    }
}
