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

import { Image, ThumbsViewer, ThumbStage, SwipeHandler, ESwipeDirection } from '../components';
import { TPosition } from '../types';

// Interfaces
import IThumbsViewer from '../interfaces/IThumbsViewer';

// Types
import { ThumbScrollerConfig } from '../types';

// Styles
import styles from './ThumbsScrollerBuilder.module.css';

// SVGs
import nextThumbs from '../images/nextThumbs.svg';

// constants
import { NUMBER_OF_VISIBLE_THUMBS } from '../constants';

export default class ThumbsScrollerBuilder {
  private _thumbContainerElement: HTMLElement;
  private _previousButtonElement?: HTMLElement;
  private _nextButtonElement?: HTMLElement;
  private _lazyLoader: ILazyLoader;
  private _numberOfVisibleThumbs: number;
  private _numberOfThumbs: number;
  private _initialIndex: number | undefined;
  private _thumbsViewer: IThumbsViewer;

  constructor(
    thumbContainerElement: HTMLElement,
    thumbElements: NodeListOf<HTMLElement>,
    config?: ThumbScrollerConfig,
    thumbClickedCallback?: (index: number) => void
  ) {
    this._thumbContainerElement = thumbContainerElement;
    addCssClass(this._thumbContainerElement, styles.thumbs_scroller__parent);
    this._numberOfVisibleThumbs = config?.numberOfVisibleThumbs
      ? config.numberOfVisibleThumbs
      : NUMBER_OF_VISIBLE_THUMBS;

    this._initialIndex = config?.initialIndex;

    const thumbs = this._createThumbsArray(thumbElements);

    this._numberOfThumbs = thumbs.length;
    this._createThumbStages(thumbs, thumbClickedCallback);

    this._lazyLoader = new LazyLoader(thumbs, 0, this._numberOfVisibleThumbs - 1);
    this._thumbsViewer = this._createThumbsViewer(this._initialIndex);
  }

  public addPreviousNextButtons(): ThumbsScrollerBuilder {
    if (this._numberOfVisibleThumbs < this._numberOfThumbs) {
      [this._previousButtonElement, this._nextButtonElement] = this._createPreviousNextButtons();
    }
    return this;
  }

  public build(): IThumbsViewer {
    if (this._previousButtonElement && this._nextButtonElement) {
      this._addThumbsViewerInteraction(this._previousButtonElement, this._nextButtonElement);
    }

    if (this._numberOfVisibleThumbs >= this._numberOfThumbs) {
      setTimeout(() => {
        this._lazyLoader.loadElement(0);
        this._lazyLoader.setCurrentIndex(0);
        this._thumbsViewer.setCenterThumb(0);
      }, 0);
    } else {
      this._setupSwipeHandler();
    }

    return this._thumbsViewer;
  }

  private _createThumbsArray(thumbElements: NodeListOf<HTMLElement>): Array<Image> {
    const thumbs: Array<Image> = new Array();
    for (let i = 0; i < thumbElements.length; i++) {
      const image: Image = new Image(thumbElements[i]!);
      thumbs.push(image);
    }
    return thumbs;
  }

  private _createThumbStages(thumbs: Array<Image>, thumbClickedCallback?: (index: number) => void) {
    thumbs.forEach((thumb, index) => {
      const thumbStage = new ThumbStage(thumb.getHtmlElement(), thumb.getWidth(), thumb.getHeight());

      thumb.addWasLoadedCallback(() => {
        thumbStage.showImage();
        thumbStage.reinitSize();
      });
      if (thumb.wasLoaded()) {
        thumbStage.showImage();
      }

      if (thumbClickedCallback) {
        thumbStage.addStageClickedCallback(() => {
          thumbClickedCallback(index);
        });
      }
    });
  }

  private _createThumbsViewer(initialIndex: number = 0): IThumbsViewer {
    const thumbsViewer = new ThumbsViewer(this._thumbContainerElement, this._numberOfVisibleThumbs);
    thumbsViewer.addScrollIndexChangedCallback((index: number) => {
      this._lazyLoader.setCurrentIndex(index);
    });
    thumbsViewer.setCenterThumb(initialIndex);
    return thumbsViewer;
  }

  private _createPreviousNextButtons(): [HTMLElement, HTMLElement] {
    const previousButton = createElement('div');
    setInnerHtml(previousButton, nextThumbs);
    addCssClass(previousButton, styles.thumbs_scroller__previous_btn);
    prependChildElement(previousButton, this._thumbContainerElement);

    const nextButton = createElement('div');
    setInnerHtml(nextButton, nextThumbs);
    addCssClass(nextButton, styles.thumbs_scroller__next_btn);
    appendChildElement(nextButton, this._thumbContainerElement);

    return [previousButton, nextButton];
  }

  private _addThumbsViewerInteraction(previousButton: HTMLElement, nextButton: HTMLElement) {
    addClickEventListener(nextButton, () => {
      this._thumbsViewer.scrollNext();
    });
    addClickEventListener(previousButton, () => {
      this._thumbsViewer.scrollPrevious();
    });
  }

  private _setupSwipeHandler() {
    new SwipeHandler(this._thumbContainerElement, (direction: ESwipeDirection, _position: TPosition) => {
      if (direction === ESwipeDirection.RIGHT) {
        this._thumbsViewer.scrollNext();
      } else if (direction === ESwipeDirection.LEFT) {
        this._thumbsViewer.scrollPrevious();
      }
    });
  }
}
