/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import Image from '../components/Image';
import ThumbStage from '../components/ThumbStage';
import ThumbsWrapper from '../components/ThumbsWrapper';
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
import { NUMBER_OF_VISIBLE_THUMBS } from '../constants';

function prepareThumbStages(thumbs: Array<Image>, thumbClickedCallback?: (index: number) => void): Array<ThumbStage> {
  const thumbStages: Array<ThumbStage> = new Array();
  thumbs.forEach((thumb, index) => {
    const thumbStage = new ThumbStage(thumb.getHtmlElement(), thumb.getWidth(), thumb.getHeight());
    thumbStage.showImage();
    if (thumbClickedCallback) {
      thumbStage.addStageClickedCallback(() => {
        thumbClickedCallback(index);
      });
    }
    thumbStages.push(thumbStage);
  });
  return thumbStages;
}

export default function (
  container: HTMLElement,
  thumbs: Array<Image>,
  numberOfVisibleThumbs: number = NUMBER_OF_VISIBLE_THUMBS,
  thumbClickedCallback?: (index: number) => void
): IThumbsWrapper {
  prepareThumbStages(thumbs, thumbClickedCallback);

  return new ThumbsWrapper(container, numberOfVisibleThumbs);
}
