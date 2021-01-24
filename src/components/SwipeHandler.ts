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
  private callback: (direction: ESwipeDirection, position: TPosition) => void;
  private touchStartTime: number;
  private touchStartPosition: TPosition;
  private swipeActive: boolean = false;

  constructor(target: HTMLElement, callback: (direction: ESwipeDirection, position: TPosition) => void) {
    this.callback = callback;
    DomTools.addEventListener(target, 'pointerdown', this.touchStart);
    DomTools.addEventListener(target, 'pointerup', this.touchEnd);
  }

  private touchStart = (event: PointerEvent) => {
    console.log('SwipeHander#touchStart');
    this.swipeActive = true;
    this.touchStartTime = Date.now();
    this.touchStartPosition = this.getTouchPosition(event);
  };

  private touchEnd = (event: PointerEvent) => {
    console.log('SwipeHander#touchEnd');
    if (this.swipeActive && Date.now() - this.touchStartTime < MAXTIME) {
      const touchEndPosition = this.getTouchPosition(event);
      const direction = this.detectDirection(this.touchStartPosition, touchEndPosition);

      console.log('SwipeHander#touchEnd - direction: ', direction);
      this.callback(direction, touchEndPosition);
    }
    this.swipeActive = false;
  };

  private getTouchPosition(event: PointerEvent): TPosition {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }

  private detectDirection(start: TPosition, end: TPosition): ESwipeDirection {
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
