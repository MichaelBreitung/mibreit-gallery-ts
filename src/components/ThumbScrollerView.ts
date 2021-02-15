/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, createLazyLoader } from 'mibreit-lazy-loader';
import { DomTools } from 'mibreit-dom-tools';
import Image from '../components/Image';
import createThumbScroller from '../factories/createThumbScroller';
import createThumbScrollerLayout from '../factories/createThumbScrollerLayout';
import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';

export type ThumbScrollerConfig = {
  thumbContainerSelector: string;
  thumbSelector: string;
  numberOfVisibleThumbs: number;
  initialIndex?: number;
};

export function isThumbScrollerConfig(config: any) : boolean
{
  let isConfig = true;
  if (typeof config.thumbContainerSelector !== 'string') {
    isConfig = false;
  }
  if (typeof config.thumbSelector !== 'string') {
    isConfig = false;
  }
  return isConfig;
}

export default class ThumbScrollerView {
  private _loader: ILazyLoader;
  private _thumbScroller: IThumbScroller = null;

  constructor(config: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void) {    
    const thumbs = this._prepareThumbs(DomTools.getElements(config.thumbSelector));
    this._loader = createLazyLoader(thumbs, {
      preloaderBeforeSize: config.numberOfVisibleThumbs,
      preloaderAfterSize: config.numberOfVisibleThumbs,
    });
    const layout: IThumbScrollerLayout = createThumbScrollerLayout(
      DomTools.getElement(config.thumbContainerSelector),
      thumbs,
      config.numberOfVisibleThumbs,
      thumbClickedCallback
    );
    if (config.numberOfVisibleThumbs < thumbs.length) {
      this._thumbScroller = this._prepareThumbScroller(layout, this._loader);
      this._addThumbScrollerInteraction(this._thumbScroller, layout);
    }
  }

  getScroller(): IThumbScroller | null {
    return this._thumbScroller;
  }

  private _prepareThumbs(thumbSelector: NodeListOf<HTMLElement>): Array<Image> {
    const thumbs: Array<Image> = new Array();
    for (let i = 0; i < thumbSelector.length; i++) {
      const image: Image = new Image(thumbSelector[i]);
      thumbs.push(image);
    }
    return thumbs;
  }

  private _prepareThumbScroller(
    layout: IThumbScrollerLayout,
    loader: ILazyLoader,
    initialIndex: number = 0
  ): IThumbScroller {
    const thumbScroller = createThumbScroller(layout);
    thumbScroller.addScrollIndexChangedCallback((index: number) => {
      loader.setCurrentIndex(index);
    });
    thumbScroller.scrollTo(initialIndex);
    return thumbScroller;
  }

  private _addThumbScrollerInteraction(thumbScroller: IThumbScroller, thumbScrollerLayout: IThumbScrollerLayout) {
    const { previousButton, nextButton } = thumbScrollerLayout.getThumbScrollerButtons();
    DomTools.addClickEventListener(nextButton, () => {
      thumbScroller.scrollNext();
    });
    DomTools.addClickEventListener(previousButton, () => {
      thumbScroller.scrollPrevious();
    });
  }
}
