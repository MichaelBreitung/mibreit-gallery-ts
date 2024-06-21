/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export var EImageScaleMode;
(function (EImageScaleMode) {
    EImageScaleMode[EImageScaleMode["NONE"] = 0] = "NONE";
    EImageScaleMode[EImageScaleMode["FIT_ASPECT"] = 1] = "FIT_ASPECT";
    EImageScaleMode[EImageScaleMode["STRETCH"] = 2] = "STRETCH";
    EImageScaleMode[EImageScaleMode["EXPAND"] = 3] = "EXPAND";
})(EImageScaleMode || (EImageScaleMode = {}));
export function checkThumbScrollerConfig(config) {
    if (typeof config.numberOfVisibleThumbs !== 'undefined' &&
        (typeof config.numberOfVisibleThumbs !== 'number' || config.numberOfVisibleThumbs < 0)) {
        throw new Error('checkThumbScrollerConfig - numberOfVisibleThumbs is invalid number');
    }
    if (typeof config.initialIndex !== 'undefined' &&
        (typeof config.initialIndex !== 'number' || config.initialIndex < 0)) {
        throw new Error('checkThumbScrollerConfig - config initialIndex should be of type number');
    }
}
export function checkSlideshowConfig(config) {
    if (typeof config.scaleMode !== 'undefined' &&
        (typeof config.scaleMode !== 'number' || config.scaleMode < 0 || config.scaleMode > 3)) {
        throw new Error('checkSlideshowConfig - config scaleMode should be of type EImageScaleMode (number 0 - 3)');
    }
    if (typeof config.interval !== 'undefined' && (typeof config.interval !== 'number' || config.interval < 1000)) {
        throw new Error('checkSlideshowConfig - config interval should be of type number and larger than 1000');
    }
    if (typeof config.zoom !== 'undefined' && typeof config.zoom !== 'boolean') {
        throw new Error('checkSlideshowConfig - config zoom should be of type boolean');
    }
    if (typeof config.preloaderAfterSize !== 'undefined' &&
        (typeof config.preloaderAfterSize !== 'number' || config.preloaderAfterSize < 0)) {
        throw new Error('checkSlideshowConfig - config preloaderAfterSize should be of type number');
    }
    if (typeof config.preloaderBeforeSize !== 'undefined' &&
        (typeof config.preloaderBeforeSize !== 'number' || config.preloaderBeforeSize < 0)) {
        throw new Error('checkSlideshowConfig - config preloaderBeforeSize should be of type number');
    }
}
export function checkGalleryConfig(config) {
    checkSlideshowConfig(config);
    checkThumbScrollerConfig(config);
    if (typeof config.thumbContainerSelector !== 'undefined' && typeof config.thumbContainerSelector !== 'string') {
        throw new Error('checkGalleryConfig - invalid thumbContainerSelector');
    }
    if (typeof config.thumbSelector !== 'undefined' && typeof config.thumbSelector !== 'string') {
        throw new Error('checkGalleryConfig - invalid thumbSelector');
    }
}
