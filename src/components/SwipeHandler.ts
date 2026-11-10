/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addEventListener } from 'mibreit-dom-tools';
import { TPosition } from '../types';

const TRESHHOLD = 50;
const MAXTIME = 700;

export enum ESwipeDirection {
  NONE,
  LEFT,
  RIGHT,
}

export default class SwipeHander {
  private _callback: (direction: ESwipeDirection, position: TPosition) => void;
  private _touchStartTime: number | null = null;
  private _touchStartPosition: TPosition | null = null;
  private _suppressNextClick = false;

  constructor(target: HTMLElement, callback: (direction: ESwipeDirection, position: TPosition) => void) {
    this._callback = callback;
    addEventListener(target, 'pointerdown', this._touchStart);
    addEventListener(target, 'pointerup', this._touchEnd);
    // capture phase: swallow the click that follows a swipe before any child handles it
    target.addEventListener('click', this._suppressClickAfterSwipe, true);
    // bubble phase: clicks handled (and stopped) by child elements never arrive here
    addEventListener(target, 'click', this._click);
  }

  private _touchStart = (event: PointerEvent) => {
    this._suppressNextClick = false;
    this._touchStartTime = Date.now();
    this._touchStartPosition = this._getTouchPosition(event);
  };

  private _touchEnd = (event: PointerEvent) => {
    if (this._touchStartTime && this._touchStartPosition) {
      const touchEndPosition = this._getTouchPosition(event);
      const direction = this._detectDirection(this._touchStartPosition, touchEndPosition);
      const isQuick = Date.now() - this._touchStartTime < MAXTIME;
      if (direction !== ESwipeDirection.NONE) {
        this._suppressNextClick = true;
        if (isQuick) {
          this._callback(direction, touchEndPosition);
        }
      } else if (!isQuick) {
        this._suppressNextClick = true;
      }
    }
    this._touchStartPosition = null;
    this._touchStartTime = null;
  };

  private _suppressClickAfterSwipe = (event: MouseEvent) => {
    if (this._suppressNextClick) {
      this._suppressNextClick = false;
      event.stopPropagation();
      event.preventDefault();
    }
  };

  private _click = (event: MouseEvent) => {
    this._callback(ESwipeDirection.NONE, { x: event.pageX, y: event.pageY });
  };

  private _getTouchPosition(event: PointerEvent): TPosition {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }

  private _detectDirection(start: TPosition, end: TPosition): ESwipeDirection {
    const diff: number = start.x - end.x;
    if (diff > TRESHHOLD) {
      return ESwipeDirection.RIGHT;
    } else if (diff < -TRESHHOLD) {
      return ESwipeDirection.LEFT;
    } else {
      return ESwipeDirection.NONE;
    }
  }
}
