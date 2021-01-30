/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import Image from '../components/Image';
import ThumbStage from '../components/ThumbStage';
import ThumbScrollerLayout from '../components/ThumbScrollerLayout';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';
import { NUMBER_OF_VISIBLE_THUMBS } from '../constants';

function prepareThumbStages(thumbs: Array<Image>, thumbClickedCallback?: (index: number) => void): Array<ThumbStage> {
  const thumbStages: Array<ThumbStage> = new Array();
  thumbs.forEach((thumb, index) => {
    const thumbStage = new ThumbStage(thumb.getHtmlElement(), thumb.getWidth(), thumb.getHeight());
    thumb.addWasLoadedCallback(() => {
      thumbStage.applyScaleMode();
    });
    thumbStage.showImage();
    thumbStage.addStageClickedCallback(() => {
      thumbClickedCallback(index);
    });
    thumbStages.push(thumbStage);
  });
  return thumbStages;
}

export default function (
  container: HTMLElement,
  thumbs: Array<Image>,
  numberOfVisibleThumbs: number = NUMBER_OF_VISIBLE_THUMBS,
  thumbClickedCallback?: (index: number) => void
): IThumbScrollerLayout {
  const thumbStages = prepareThumbStages(thumbs, thumbClickedCallback);

  return new ThumbScrollerLayout(
    container,
    thumbStages,
    numberOfVisibleThumbs
  );
}
