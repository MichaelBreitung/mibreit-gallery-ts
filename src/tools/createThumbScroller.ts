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
import calculateThumbSize from './calculateThumbSize';

export type ThumbScrollerConfig = {
  thumbContainerSelector: string;
  thumbSelector: string;
  numberOfVisibleThumbs: number;
  initialIndex?: number;
};

export default function createThumbScroller(config: ThumbScrollerConfig): IThumbScroller {
  const thumbSelector = DomTools.getElements(config.thumbSelector);
  const container: HTMLElement = DomTools.getElements(config.thumbContainerSelector)[0];
  const thumbs: Array<Image> = new Array();
  const thumbStages: Array<IImageStage> = new Array();
  const thumbStageSizeInRem = calculateThumbSize(container, config.numberOfVisibleThumbs, true);

  for (let i = 0; i < thumbSelector.length; i++) {
    const image = new Image(thumbSelector[i]);
    const thumbStage = new ThumbStage(thumbSelector[i], image.getWidth(), image.getHeight());
    image.addWasLoadedCallback(() => {
      thumbStage.applyScaleMode();
    });
    thumbStage.showImage(true);
    thumbStage.setSize(`${thumbStageSizeInRem}rem`, `${thumbStageSizeInRem}rem`);
    thumbs.push(image);
    thumbStages.push(thumbStage);
  }

  const preloader: Preloader = new Preloader(thumbs, config.numberOfVisibleThumbs, config.numberOfVisibleThumbs);
  const thumbScroller: ThumbScroller = new ThumbScroller(
    container,
    thumbStages.length,
    config.numberOfVisibleThumbs
  );
  thumbScroller.addScrollIndexChangedCallback((index: number) => {
    preloader.setCurrentIndex(index);
  });
  thumbScroller.scrollTo(config.initialIndex ? config.initialIndex : 0);
  return thumbScroller;
}
