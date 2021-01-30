/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IImageStage from '../interfaces/IImageStage';
import ImageStageFitAspect from '../components/ImageStageFitAspect';
import ImageStageExpand from '../components/ImageStageExpand';
import ImageStageStretch from '../components/ImageStageStretch';
import ImageStageNoScale from '../components/ImageStageNoScale';

export enum EImageScaleMode {
  NONE,
  FIT_ASPECT,
  STRETCH,
  EXPAND,
}

export default function (
  imageHandle: HTMLElement,
  imageWidth: number,
  imageHeight: number,  
  scaleMode: EImageScaleMode = EImageScaleMode.FIT_ASPECT
): IImageStage {
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
};
