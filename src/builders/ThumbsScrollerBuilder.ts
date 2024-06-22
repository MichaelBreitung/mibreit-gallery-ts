/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { ILazyLoader, LazyLoader } from 'mibreit-lazy-loader';
import {
  addClickEventListener,
  addCssClass,
  addResizeEventListener,
  appendChildElement,
  createElement,
  prependChildElement,
  setInnerHtml,
} from 'mibreit-dom-tools';

import Image from '../components/Image';
import ThumbsViewer from '../components/ThumbsViewer';
import ThumbStage from '../components/ThumbStage';

// Tools
import debounce from '../tools/debounce';

// Interfaces
import IThumbsViewer from '../interfaces/IThumbsViewer';

// Types
import { ThumbScrollerConfig } from '../types';

// Styles
import styles from './ThumbsScrollerBuilder.module.css';

// SVGs
import nextThumbs from '../images/nextThumbs.svg';

// constants
import { NUMBER_OF_VISIBLE_THUMBS, RESIZE_DEBOUNCE_TIMER } from '../constants';

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

    this._lazyLoader = new LazyLoader(thumbs, this._numberOfVisibleThumbs, this._numberOfVisibleThumbs);
    this._thumbsViewer = this._createThumbsViewer(this._thumbContainerElement, this._lazyLoader, this._initialIndex);
  }

  public addPreviousNextButtons(): ThumbsScrollerBuilder {
    if (this._numberOfVisibleThumbs < this._numberOfThumbs) {
      [this._previousButtonElement, this._nextButtonElement] = this._createPreviousNextButtons(
        this._thumbContainerElement
      );
    }
    return this;
  }

  public build(): IThumbsViewer {
    this._thumbsViewer.reinitSize();
    if (this._previousButtonElement && this._nextButtonElement) {
      this._addThumbsViewerInteraction(this._thumbsViewer, this._previousButtonElement, this._nextButtonElement);
    }

    if (this._numberOfVisibleThumbs >= this._numberOfThumbs) {
      setTimeout(() => {
        this._lazyLoader.loadElement(0);
        this._lazyLoader.setCurrentIndex(0);
        this._thumbsViewer.setCenterThumb(0);
      }, 0);
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
        thumbStage.reinitSize();
      });
      thumbStage.showImage();
      if (thumbClickedCallback) {
        thumbStage.addStageClickedCallback(() => {
          thumbClickedCallback(index);
        });
      }
    });
  }

  private _createThumbsViewer(
    thumbContainerElement: HTMLElement,
    loader: ILazyLoader,
    initialIndex: number = 0
  ): IThumbsViewer {
    const thumbsViewer = new ThumbsViewer(thumbContainerElement, this._numberOfVisibleThumbs);
    thumbsViewer.addScrollIndexChangedCallback((index: number) => {
      loader.setCurrentIndex(index);
    });
    thumbsViewer.setCenterThumb(initialIndex);
    addResizeEventListener(() => {
      debounce(
        () => {
          thumbsViewer.reinitSize();
        },
        RESIZE_DEBOUNCE_TIMER,
        false
      );
    });
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
