/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, LazyLoader } from 'mibreit-lazy-loader';
import { addClickEventListener } from 'mibreit-dom-tools';
import Image from '../components/Image';
import createThumbsWrapper from '../factories/createThumbsWrapper';
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
import ThumbsViewer from '../components/ThumbsViewer';

const DEFAULT_NUMBER_VISIBLE_THUMBS = 7;

export type ThumbScrollerConfig = {
  numberOfVisibleThumbs?: number;
  initialIndex?: number;
};

export default class ThumbScrollerContainer {
  private _thumbsViewer: IThumbsViewer | null = null;

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

    const thumbsWrapper: IThumbsWrapper = createThumbsWrapper(
      thumbContainer,
      thumbs,
      numberVisibleThumbs,
      thumbClickedCallback
    );
    if (numberVisibleThumbs < thumbs.length) {
      this._thumbsViewer = this._prepareThumbsViewer(thumbsWrapper, lazyLoader, config?.initialIndex);
      this._addThumbsViewerInteraction(this._thumbsViewer, thumbsWrapper);
    } else {
      setTimeout(() => {
        lazyLoader.loadElement(0);
        lazyLoader.setCurrentIndex(0);
      }, 0);
    }
  }

  getThumbsViewer(): IThumbsViewer | null {
    return this._thumbsViewer;
  }

  private _prepareThumbs(thumbElement: NodeListOf<HTMLElement>): Array<Image> {
    const thumbs: Array<Image> = new Array();
    for (let i = 0; i < thumbElement.length; i++) {
      const image: Image = new Image(thumbElement[i]!);
      thumbs.push(image);
    }
    return thumbs;
  }

  private _prepareThumbsViewer(
    thumbsWrapper: IThumbsWrapper,
    loader: ILazyLoader,
    initialIndex: number = 0
  ): IThumbsViewer {
    const thumbsViewer = new ThumbsViewer(thumbsWrapper);
    thumbsViewer.addScrollIndexChangedCallback((index: number) => {
      loader.setCurrentIndex(index);
    });
    thumbsViewer.setCenterThumb(initialIndex);
    return thumbsViewer;
  }

  private _addThumbsViewerInteraction(thumbsViewer: IThumbsViewer, thumbsWrapper: IThumbsWrapper) {
    const { previousButton, nextButton } = thumbsWrapper.getThumbScrollerButtons();
    addClickEventListener(nextButton, () => {
      thumbsViewer.scrollNext();
    });
    addClickEventListener(previousButton, () => {
      thumbsViewer.scrollPrevious();
    });
  }
}
