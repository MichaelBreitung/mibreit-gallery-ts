/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import ImageStageFitAspect from '../components/ImageStageFitAspect';
import ImageStageExpand from '../components/ImageStageExpand';
import ImageStageStretch from '../components/ImageStageStretch';
import ImageStageNoScale from '../components/ImageStageNoScale';
export var EImageScaleMode;
(function (EImageScaleMode) {
    EImageScaleMode[EImageScaleMode["NONE"] = 0] = "NONE";
    EImageScaleMode[EImageScaleMode["FIT_ASPECT"] = 1] = "FIT_ASPECT";
    EImageScaleMode[EImageScaleMode["STRETCH"] = 2] = "STRETCH";
    EImageScaleMode[EImageScaleMode["EXPAND"] = 3] = "EXPAND";
})(EImageScaleMode || (EImageScaleMode = {}));
export default function (imageHandle, imageWidth, imageHeight, scaleMode = EImageScaleMode.FIT_ASPECT) {
    switch (scaleMode) {
        case EImageScaleMode.EXPAND:
            return new ImageStageExpand(imageHandle, imageWidth, imageHeight);
        case EImageScaleMode.FIT_ASPECT:
            return new ImageStageFitAspect(imageHandle, imageWidth, imageHeight);
        case EImageScaleMode.STRETCH:
            return new ImageStageStretch(imageHandle, imageWidth, imageHeight);
        case EImageScaleMode.NONE:
        default:
            return new ImageStageNoScale(imageHandle, imageWidth, imageHeight);
    }
}
;
