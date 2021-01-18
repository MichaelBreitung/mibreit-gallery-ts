/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import DomTools from './domTools';
import IImageStage from '../interfaces/IImageStage';
import IImageLoader from '../interfaces/IImageLoader';
import IThumbScroller from '../interfaces/IThumbScroller';
import Image from '../components/Image';
import ThumbScroller from '../components/ThumbScroller';
import Preloader from '../components/Preloader';
import ThumbStage from '../components/ThumbStage';
import createThumbScrollerLayout, { ThumbScrollerLayout } from './createThumbScrollerLayout';
import { NUMBER_OF_VISIBLE_THUMBS } from '../constants';

function checkConfig(config: ThumbScrollerConfig) {
  if (typeof config.thumbContainerSelector === 'undefined') {
    throw new Error('ThumbScrollerConfig invalid: no thumbContainerSelector provided');
  }
  if (typeof config.thumbSelector === 'undefined') {
    throw new Error('ThumbScrollerConfig invalid: no thumbSelector provided');
  }
}

function prepareThumbs(
  thumbSelector: NodeListOf<HTMLElement>,
  thumbClickedCallback?: (index: number) => void
): { thumbLoaders: Array<IImageLoader>; thumbStages: Array<IImageStage> } {
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
  return { thumbStages, thumbLoaders: thumbs };
}

function addThumbScrollerInteraction(thumbScroller: IThumbScroller, thumbScrollerLayout: ThumbScrollerLayout) {
  DomTools.addClickEventListener(thumbScrollerLayout.nextButton, () => {
    thumbScroller.scrollNext();
  });
  DomTools.addClickEventListener(thumbScrollerLayout.previousButton, () => {
    thumbScroller.scrollPrevious();
  });
}

export type ThumbScrollerConfig = {
  thumbContainerSelector: string;
  thumbSelector: string;
  numberOfVisibleThumbs?: number;
  initialIndex?: number;
};

export default function createThumbScroller(
  config: ThumbScrollerConfig,
  thumbClickedCallback?: (index: number) => void
): IThumbScroller {
  checkConfig(config);

  const numberOfVisibleThumbs = config.numberOfVisibleThumbs ? config.numberOfVisibleThumbs : NUMBER_OF_VISIBLE_THUMBS;
  const { thumbLoaders, thumbStages } = prepareThumbs(DomTools.getElements(config.thumbSelector), thumbClickedCallback);
  const preloader: Preloader = new Preloader(thumbLoaders, config.numberOfVisibleThumbs, config.numberOfVisibleThumbs);
  const thumbScrollerLayout: ThumbScrollerLayout = createThumbScrollerLayout(
    DomTools.getElements(config.thumbContainerSelector)[0],
    thumbStages,
    numberOfVisibleThumbs
  );
  const thumbScroller: ThumbScroller = new ThumbScroller(
    thumbScrollerLayout.scrollerContainer,
    thumbScrollerLayout.thumbSizeRem,
    thumbStages.length,
    numberOfVisibleThumbs
  );

  addThumbScrollerInteraction(thumbScroller, thumbScrollerLayout);

  thumbScroller.addScrollIndexChangedCallback((index: number) => {
    preloader.setCurrentIndex(index);
  });

  thumbScroller.scrollTo(config.initialIndex ? config.initialIndex : 0);
  return thumbScroller;
}
