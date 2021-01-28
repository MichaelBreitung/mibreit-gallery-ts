/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, createLazyLoader } from 'mibreit-lazy-loader';
import { DomTools } from 'mibreit-dom-tools';
import IImageStage from '../interfaces/IImageStage';
import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';
import Image from '../components/Image';
import ThumbScroller from '../components/ThumbScroller';
import ThumbStage from '../components/ThumbStage';
import ThumbScrollerLayout from '../components/ThumbScrollerLayout';
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
): { thumbLoaders: Array<Image>; thumbStages: Array<IImageStage> } {
  const thumbs: Array<Image> = new Array();
  const thumbStages: Array<IImageStage> = new Array();
  for (let i = 0; i < thumbSelector.length; i++) {
    const image: Image = new Image(thumbSelector[i]);
    const thumbStage = new ThumbStage(thumbSelector[i], image.getWidth(), image.getHeight());
    image.addWasLoadedCallback(() => {
      thumbStage.applyScaleMode();
    });
    thumbStage.showImage();
    thumbStage.addStageClickedCallback(() => {
      thumbClickedCallback(i);
    });
    thumbs.push(image);
    thumbStages.push(thumbStage);
  }
  return { thumbStages, thumbLoaders: thumbs };
}

function addThumbScrollerInteraction(thumbScroller: IThumbScroller, thumbScrollerLayout: IThumbScrollerLayout) {
  const {previousButton, nextButton} = thumbScrollerLayout.getThumbScrollerButtons();
  DomTools.addClickEventListener(nextButton, () => {
    thumbScroller.scrollNext();
  });
  DomTools.addClickEventListener(previousButton, () => {
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
  const lazyLoader: ILazyLoader = createLazyLoader(thumbLoaders, {
    preloaderBeforeSize: config.numberOfVisibleThumbs,
    preloaderAfterSize: config.numberOfVisibleThumbs,
  });
  const thumbScrollerLayout: IThumbScrollerLayout = new ThumbScrollerLayout(
    DomTools.getElement(config.thumbContainerSelector),
    thumbStages,
    numberOfVisibleThumbs
  );
  const thumbScroller: ThumbScroller = new ThumbScroller(
    thumbScrollerLayout,
    thumbStages.length
  );

  addThumbScrollerInteraction(thumbScroller, thumbScrollerLayout);

  thumbScroller.addScrollIndexChangedCallback((index: number) => {
    lazyLoader.setCurrentIndex(index);
  });

  thumbScroller.scrollTo(config.initialIndex ? config.initialIndex : 0);
  return thumbScroller;
}
