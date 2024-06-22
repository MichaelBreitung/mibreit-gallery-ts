/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, LazyLoader } from 'mibreit-lazy-loader';
import {
  addClickEventListener,
  addCssClass,
  appendChildElement,
  createElement,
  prependChildElement,
  setInnerHtml,
} from 'mibreit-dom-tools';

import createThumbsWrapper from '../factories/createThumbsWrapper';

import Image from '../components/Image';
import ThumbsViewer from '../components/ThumbsViewer';

// Interfaces
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IThumbsWrapper from '../interfaces/IThumbsWrapper';

// Types
import { ThumbScrollerConfig } from '../types';

// Styles
import styles from './ThumbsScrollerBuilder.module.css';
import nextThumbs from '../images/nextThumbs.svg';

const DEFAULT_NUMBER_VISIBLE_THUMBS = 7;

export default class ThumbsScrollerBuilder {
  private _thumbContainerElement: HTMLElement;
  private _previousButtonElement?: HTMLElement;
  private _nextButtonElement?: HTMLElement;
  private _thumbsWrapper: IThumbsWrapper;
  private _lazyLoader: ILazyLoader;
  private _initialIndex: number | undefined;

  constructor(
    thumbContainerElement: HTMLElement,
    thumbElements: NodeListOf<HTMLElement>,
    config?: ThumbScrollerConfig,
    thumbClickedCallback?: (index: number) => void
  ) {
    this._thumbContainerElement = thumbContainerElement;
    const numberVisibleThumbs = config?.numberOfVisibleThumbs
      ? config.numberOfVisibleThumbs
      : DEFAULT_NUMBER_VISIBLE_THUMBS;

    this._initialIndex = config?.initialIndex;
    console.log('ThumbScrollerBuilder - initialIndex: ', this._initialIndex);

    const thumbs = this._createThumbsArray(thumbElements);

    this._lazyLoader = new LazyLoader(thumbs, numberVisibleThumbs, numberVisibleThumbs);

    this._thumbsWrapper = createThumbsWrapper(thumbContainerElement, thumbs, numberVisibleThumbs, thumbClickedCallback);
  }

  public addPreviousNextButtons(): ThumbsScrollerBuilder {
    if (this._thumbsWrapper.getNumberOfVisibleThumbs() < this._thumbsWrapper.getNumberOfThumbs()) {
      [this._previousButtonElement, this._nextButtonElement] = this._createPreviousNextButtons(
        this._thumbContainerElement
      );
    }
    return this;
  }

  public build(): IThumbsViewer | null {
    this._thumbsWrapper.reinitSize();
    if (this._thumbsWrapper.getNumberOfVisibleThumbs() < this._thumbsWrapper.getNumberOfThumbs()) {
      const thumbsViewer = this._createThumbsViewer(this._thumbsWrapper, this._lazyLoader, this._initialIndex);
      if (this._previousButtonElement && this._nextButtonElement) {
        this._addThumbsViewerInteraction(thumbsViewer, this._previousButtonElement, this._nextButtonElement);
      }
      return thumbsViewer;
    } else {
      setTimeout(() => {
        this._lazyLoader.loadElement(0);
        this._lazyLoader.setCurrentIndex(0);
      }, 0);
      return null;
    }
  }

  private _createThumbsArray(thumbElement: NodeListOf<HTMLElement>): Array<Image> {
    const thumbs: Array<Image> = new Array();
    for (let i = 0; i < thumbElement.length; i++) {
      const image: Image = new Image(thumbElement[i]!);
      thumbs.push(image);
    }
    return thumbs;
  }

  private _createThumbsViewer(
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

  private _createPreviousNextButtons(container: HTMLElement): [HTMLElement, HTMLElement] {
    const previousButton = createElement('div');
    setInnerHtml(previousButton, nextThumbs);
    addCssClass(previousButton, styles.thumbs_scroller__previous_btn);
    prependChildElement(previousButton, container);

    const nextButton = createElement('div');
    setInnerHtml(nextButton, nextThumbs);
    addCssClass(nextButton, styles.thumbs_scroller__next_btn);
    appendChildElement(nextButton, container);

    return [previousButton, nextButton];
  }

  private _addThumbsViewerInteraction(
    thumbsViewer: IThumbsViewer,
    previousButton: HTMLElement,
    nextButton: HTMLElement
  ) {
    addClickEventListener(nextButton, () => {
      thumbsViewer.scrollNext();
    });
    addClickEventListener(previousButton, () => {
      thumbsViewer.scrollPrevious();
    });
  }
}
