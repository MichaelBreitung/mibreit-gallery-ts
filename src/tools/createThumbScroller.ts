/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './domTools';
import IImageStage from '../interfaces/IImageStage';
import IThumbScroller from '../interfaces/IThumbScroller';
import Image from '../components/Image';
import ThumbScroller from '../components/ThumbScroller';
import Preloader from '../components/Preloader';
import ThumbStage from '../components/ThumbStage';
import createThumbScrollerLayout, { ThumbScrollerLayout } from './createThumbScrollerLayout';

export type ThumbScrollerConfig = {
  thumbContainerSelector: string;
  thumbSelector: string;
  numberOfVisibleThumbs: number;
  initialIndex?: number;
};

export default function createThumbScroller(
  config: ThumbScrollerConfig,
  thumbClickedCallback?: (index: number) => void
): IThumbScroller {
  const thumbSelector = DomTools.getElements(config.thumbSelector);
  const container: HTMLElement = DomTools.getElements(config.thumbContainerSelector)[0];
  const thumbs: Array<Image> = new Array();
  const thumbStages: Array<IImageStage> = new Array();

  for (let i = 0; i < thumbSelector.length; i++) {
    const image = new Image(thumbSelector[i]);
    const thumbStage = new ThumbStage(thumbSelector[i], image.getWidth(), image.getHeight());
    image.addWasLoadedCallback(() => {
      thumbStage.applyScaleMode();
    });
    thumbStage.showImage(true);
    thumbStage.addStageClickedCallback(() => {
      thumbClickedCallback(i);
    });
    thumbs.push(image);
    thumbStages.push(thumbStage);
  }

  const preloader: Preloader = new Preloader(thumbs, config.numberOfVisibleThumbs, config.numberOfVisibleThumbs);
  const thumbScrollerLayout: ThumbScrollerLayout = createThumbScrollerLayout(
    container,
    thumbStages,
    config.numberOfVisibleThumbs
  );
  const thumbScroller: ThumbScroller = new ThumbScroller(
    thumbScrollerLayout.scrollerContainer,
    thumbScrollerLayout.thumbSizeRem,
    thumbStages.length,
    config.numberOfVisibleThumbs
  );

  DomTools.addClickEventListener(thumbScrollerLayout.nextButton, () => {
    thumbScroller.scrollNext();
  });
  DomTools.addClickEventListener(thumbScrollerLayout.previousButton, () => {
    thumbScroller.scrollPrevious();
  });

  thumbScroller.addScrollIndexChangedCallback((index: number) => {
    preloader.setCurrentIndex(index);
  });

  thumbScroller.scrollTo(config.initialIndex ? config.initialIndex : 0);
  return thumbScroller;
}
