/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, LazyLoader } from 'mibreit-lazy-loader';
import { addClickEventListener } from 'mibreit-dom-tools';
import Image from '../components/Image';
import createThumbScrollerLayout from '../factories/createThumbScrollerLayout';
import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';
import ThumbScroller from '../components/ThumbScroller';

const DEFAULT_NUMBER_VISIBLE_THUMBS = 7;

export type ThumbScrollerConfig = {
  numberOfVisibleThumbs?: number;
  initialIndex?: number;
};

export default class ThumbScrollerContainer {
  private _thumbScroller: IThumbScroller | null = null;

  constructor(
    thumbContainer: HTMLElement,
    thumbElements: NodeListOf<HTMLElement>,
    config?: ThumbScrollerConfig,
    thumbClickedCallback?: (index: number) => void
  ) {
    const numberVisibleThumbs = config?.numberOfVisibleThumbs
      ? config.numberOfVisibleThumbs
      : DEFAULT_NUMBER_VISIBLE_THUMBS;
    const thumbs = this._prepareThumbs(thumbElements);
    const lazyLoader = new LazyLoader(thumbs, numberVisibleThumbs, numberVisibleThumbs);

    const layout: IThumbScrollerLayout = createThumbScrollerLayout(
      thumbContainer,
      thumbs,
      numberVisibleThumbs,
      thumbClickedCallback
    );
    if (numberVisibleThumbs < thumbs.length) {
      this._thumbScroller = this._prepareThumbScroller(layout, lazyLoader, config?.initialIndex);
      this._addThumbScrollerInteraction(this._thumbScroller, layout);
    } else {
      setTimeout(() => {
        lazyLoader.loadElement(0);
        lazyLoader.setCurrentIndex(0);
      }, 0);
    }
  }

  getScroller(): IThumbScroller | null {
    return this._thumbScroller;
  }

  private _prepareThumbs(thumbSelector: NodeListOf<HTMLElement>): Array<Image> {
    const thumbs: Array<Image> = new Array();
    for (let i = 0; i < thumbSelector.length; i++) {
      const image: Image = new Image(thumbSelector[i]!);
      thumbs.push(image);
    }
    return thumbs;
  }

  private _prepareThumbScroller(
    layout: IThumbScrollerLayout,
    loader: ILazyLoader,
    initialIndex: number = 0
  ): IThumbScroller {
    const thumbScroller = new ThumbScroller(layout);
    thumbScroller.addScrollIndexChangedCallback((index: number) => {
      loader.setCurrentIndex(index);
    });
    thumbScroller.scrollTo(initialIndex);
    return thumbScroller;
  }

  private _addThumbScrollerInteraction(thumbScroller: IThumbScroller, thumbScrollerLayout: IThumbScrollerLayout) {
    const { previousButton, nextButton } = thumbScrollerLayout.getThumbScrollerButtons();
    addClickEventListener(nextButton, () => {
      thumbScroller.scrollNext();
    });
    addClickEventListener(previousButton, () => {
      thumbScroller.scrollPrevious();
    });
  }
}
