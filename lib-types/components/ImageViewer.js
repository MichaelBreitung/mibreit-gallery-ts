/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import createImageStage, { EImageScaleMode } from '../factories/createImageStage';
// types
import { ESwipeDirection } from './SwipeHandler';
export default class ImageViewer {
    constructor(images, scaleMode = EImageScaleMode.FIT_ASPECT) {
        Object.defineProperty(this, "_currentIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "_imageStages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_images", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_imageChangedCallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Array()
        });
        this._images = images;
        this._prepareImageStages(images, scaleMode);
    }
    showImage(index) {
        return this._showImage(index);
    }
    showNextImage(swipeDirection) {
        const newIndex = this._currentIndex < this._imageStages.length - 1 ? this._currentIndex + 1 : 0;
        return this._showImage(newIndex, swipeDirection);
    }
    showPreviousImage(swipeDirection) {
        const newIndex = this._currentIndex > 0 ? this._currentIndex - 1 : this._imageStages.length - 1;
        return this._showImage(newIndex, swipeDirection);
    }
    getNumberOfImages() {
        return this._imageStages.length;
    }
    reinitSize() {
        if (this._isValidIndex(this._currentIndex)) {
            this._imageStages[this._currentIndex].applyScaleMode();
        }
    }
    setZoomAnimation(active) {
        this._imageStages.forEach((stage) => {
            stage.setZoomAnimation(active);
        });
    }
    addImageChangedCallback(callback) {
        if (!this._imageChangedCallbacks.includes(callback)) {
            this._imageChangedCallbacks.push(callback);
        }
    }
    getImageIndex() {
        return this._currentIndex;
    }
    getImageInfo(index) {
        if (this._isValidIndex(index)) {
            return this._images[index];
        }
        else {
            return null;
        }
    }
    getImageElement(index) {
        if (this._isValidIndex(index)) {
            return this._images[index].getHtmlElement();
        }
        else {
            return null;
        }
    }
    _showImage(index, swipeDirection = ESwipeDirection.NONE) {
        if (this._isValidIndex(index)) {
            if (index != this._currentIndex) {
                if (!this._images[index].wasLoaded()) {
                    this._images[index].addWasLoadedCallback(() => {
                        this._hideImage(this._currentIndex, swipeDirection);
                        this._changeCurrentImage(index, swipeDirection);
                    });
                }
                else {
                    this._hideImage(this._currentIndex, swipeDirection);
                    this._changeCurrentImage(index, swipeDirection);
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    _hideImage(index, swipeDirection = ESwipeDirection.NONE) {
        if (this._isValidIndex(index)) {
            this._imageStages[this._currentIndex].hideImage(swipeDirection);
        }
    }
    _prepareImageStages(images, scaleMode) {
        images.forEach((image) => {
            const imageStage = createImageStage(image.getHtmlElement(), image.getWidth(), image.getHeight(), scaleMode);
            image.addWasLoadedCallback(() => {
                imageStage.applyScaleMode();
            });
            this._imageStages.push(imageStage);
        });
    }
    _isValidIndex(index) {
        return index >= 0 && index < this._imageStages.length;
    }
    _changeCurrentImage(index, swipeDirection = ESwipeDirection.NONE) {
        console.log('ImageViewer#changeCurrentImage', index);
        this._currentIndex = index;
        this._imageStages[this._currentIndex].showImage(swipeDirection);
        this._imageChangedCallbacks.forEach((callback) => {
            callback(this._currentIndex, this._images[this._currentIndex]);
        });
    }
}
