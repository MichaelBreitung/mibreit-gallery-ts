/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addCssClass, addCssStyle, createElement, getComputedCssStyle, getElementDimension, removeCssClass, removeCssStyle, wrapElements, } from 'mibreit-dom-tools';
import styles from './ImageStage.module.css';
import animationStyles from '../tools/animations.module.css';
import { ESwipeDirection } from './SwipeHandler';
import { sleepTillNextRenderFinished } from '../tools/AsyncSleep';
// constants
const ANIMATIONS_RESET_TIMEOUT = 1000;
/**
 * The ImageStage is responsible for proper scaling and centering
 * of images on the stage
 */
export default class ImageStage {
    constructor(imageHandle, imageWidth, imageHeight) {
        Object.defineProperty(this, "_zoomAnimation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_imageStage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_imageHandle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_imageWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_imageHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._imageHandle = imageHandle;
        this._imageWidth = imageWidth;
        this._imageHeight = imageHeight;
        this._imageStage = this._createStage();
    }
    setZoomAnimation(activate) {
        this._zoomAnimation = activate;
    }
    applyScaleMode() {
        console.log('ImageStage#applyScaleMode');
        const stageDimension = getElementDimension(this._imageStage);
        this._applyScaleModeImpl(stageDimension.width, stageDimension.height);
        this._centerImage(stageDimension.width, stageDimension.height);
    }
    setSize(widthCss, heightCss) {
        addCssStyle(this._imageStage, 'width', widthCss);
        addCssStyle(this._imageStage, 'height', heightCss);
        this.applyScaleMode();
    }
    setMargin(marginCss) {
        addCssStyle(this._imageStage, 'margin', marginCss);
    }
    hideImage() {
        return __awaiter(this, arguments, void 0, function* (swipeDirection = ESwipeDirection.NONE) {
            if (this._zoomAnimation) {
                setTimeout(() => {
                    this._resetZoom();
                }, ANIMATIONS_RESET_TIMEOUT);
            }
            this._stopSlideAnimation();
            yield sleepTillNextRenderFinished();
            if (swipeDirection == ESwipeDirection.RIGHT) {
                addCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                addCssStyle(this._imageStage, 'left', '-100%');
            }
            else if (swipeDirection == ESwipeDirection.LEFT) {
                addCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                addCssStyle(this._imageStage, 'left', '100%');
            }
            removeCssStyle(this._imageStage, 'opacity');
        });
    }
    showImage() {
        return __awaiter(this, arguments, void 0, function* (swipeDirection = ESwipeDirection.NONE) {
            this.applyScaleMode();
            if (this._zoomAnimation) {
                this._startZoomAnimation();
            }
            this._stopSlideAnimation();
            yield sleepTillNextRenderFinished();
            if (swipeDirection == ESwipeDirection.RIGHT) {
                removeCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                addCssStyle(this._imageStage, 'left', '100%');
                yield sleepTillNextRenderFinished();
                addCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                removeCssStyle(this._imageStage, 'left');
            }
            else if (swipeDirection == ESwipeDirection.LEFT) {
                removeCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                addCssStyle(this._imageStage, 'left', '-100%');
                yield sleepTillNextRenderFinished();
                addCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                removeCssStyle(this._imageStage, 'left');
            }
            else {
                removeCssClass(this._imageStage, animationStyles.mibreit_GalleryTransition);
                removeCssStyle(this._imageStage, 'left');
            }
            addCssStyle(this._imageStage, 'opacity', '1');
        });
    }
    _createStage() {
        const wrapper = createElement('div');
        addCssClass(wrapper, styles.mibreit_ImageStage);
        addCssClass(wrapper, animationStyles.mibreit_GalleryFade);
        wrapElements([this._imageHandle], wrapper);
        return wrapper;
    }
    _centerImage(stageWidth, stageHeight) {
        const { width, height } = getElementDimension(this._imageHandle);
        const x = (width + stageWidth) / 2.0 - width;
        const y = (height + stageHeight) / 2.0 - height;
        addCssStyle(this._imageHandle, 'margin-left', `${x}px`);
        addCssStyle(this._imageHandle, 'margin-top', `${y}px`);
    }
    _startZoomAnimation() {
        console.log('ImageStage#startZoomAnimation');
        addCssClass(this._imageHandle, 'zoom');
    }
    _resetZoom() {
        console.log('ImageStage#resetZoom');
        removeCssClass(this._imageHandle, 'zoom');
    }
    _stopSlideAnimation() {
        addCssStyle(this._imageStage, 'margin-left', getComputedCssStyle(this._imageStage, 'margin-left'));
    }
}
