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
import {THUMBS_BUTTON_WIDTH_REM, THUMBS_MARGIN} from "../constants";

export type ThumbScrollerConfig = {
  thumbContainerSelector: string;
  thumbSelector: string;
  numberOfVisibleThumbs: number,
  initialIndex?: number;
}

const calculateThumbSize = function(container: HTMLElement, numberOfVisibleThumbs: number) : number
{
  const oneRemSize = DomTools.getRootFontSize();  
  console.log("calculateThumbSize -> oneRemSize is ", oneRemSize);

  const containerWidthRem = DomTools.getElementDimension(container).width / oneRemSize;
  console.log("calculateThumbSize -> container size in rem is ", containerWidthRem);

  const thumbsize = ((containerWidthRem - 2*THUMBS_BUTTON_WIDTH_REM) / numberOfVisibleThumbs) - THUMBS_MARGIN;
  console.log("calculateThumbSize -> thumbsize in rem is ", thumbsize);

  return thumbsize;
}

export default function createThumbScroller(config: ThumbScrollerConfig): IThumbScroller {
  const thumbSelector = DomTools.getElements(config.thumbSelector);
  const container : HTMLElement = DomTools.getElements(config.thumbContainerSelector)[0];
  const thumbs: Array<Image> = new Array();
  const thumbStages: Array<IImageStage> = new Array();
  const thumbStageSizeInRem = calculateThumbSize(container, config.numberOfVisibleThumbs);
  
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
  const thumbScroller: ThumbScroller = new ThumbScroller(container, thumbStageSizeInRem+THUMBS_MARGIN, thumbStages.length, config.numberOfVisibleThumbs);
  thumbScroller.addScrollIndexChangedCallback((index: number) => {preloader.setCurrentIndex(index)});
  thumbScroller.scrollTo(config.initialIndex ? config.initialIndex : 0);
  return thumbScroller;
}
