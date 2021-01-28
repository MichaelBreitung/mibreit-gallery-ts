/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { DomTools } from 'mibreit-dom-tools';

const TRESHHOLD = 50;
const MAXTIME = 700;

export type TPosition = {
  x: number;
  y: number;
};

export enum ESwipeDirection {
  NONE,
  LEFT,
  RIGHT,
}

export default class SwipeHander {
  private _callback: (direction: ESwipeDirection, position: TPosition) => void;
  private _touchStartTime: number;
  private _touchStartPosition: TPosition;
  private _swipeActive: boolean = false;

  constructor(target: HTMLElement, callback: (direction: ESwipeDirection, position: TPosition) => void) {
    this._callback = callback;
    DomTools.addEventListener(target, 'pointerdown', this._touchStart);
    DomTools.addEventListener(target, 'pointerup', this._touchEnd);
  }

  private _touchStart = (event: PointerEvent) => {
    console.log('SwipeHander#touchStart');
    this._swipeActive = true;
    this._touchStartTime = Date.now();
    this._touchStartPosition = this._getTouchPosition(event);
  };

  private _touchEnd = (event: PointerEvent) => {
    console.log('SwipeHander#touchEnd');
    if (this._swipeActive && Date.now() - this._touchStartTime < MAXTIME) {
      const touchEndPosition = this._getTouchPosition(event);
      const direction = this._detectDirection(this._touchStartPosition, touchEndPosition);

      console.log('SwipeHander#touchEnd - direction: ', direction);
      this._callback(direction, touchEndPosition);
    }
    this._swipeActive = false;
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
