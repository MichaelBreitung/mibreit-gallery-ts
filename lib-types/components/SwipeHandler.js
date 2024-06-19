/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { addEventListener } from 'mibreit-dom-tools';
const TRESHHOLD = 50;
const MAXTIME = 700;
export var ESwipeDirection;
(function (ESwipeDirection) {
    ESwipeDirection[ESwipeDirection["NONE"] = 0] = "NONE";
    ESwipeDirection[ESwipeDirection["LEFT"] = 1] = "LEFT";
    ESwipeDirection[ESwipeDirection["RIGHT"] = 2] = "RIGHT";
})(ESwipeDirection || (ESwipeDirection = {}));
export default class SwipeHander {
    constructor(target, callback) {
        Object.defineProperty(this, "_callback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_touchStartTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_touchStartPosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_touchStart", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                console.log('SwipeHander#touchStart');
                this._touchStartTime = Date.now();
                this._touchStartPosition = this._getTouchPosition(event);
            }
        });
        Object.defineProperty(this, "_touchEnd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (event) => {
                console.log('SwipeHander#touchEnd');
                if (this._touchStartTime && this._touchStartPosition && Date.now() - this._touchStartTime < MAXTIME) {
                    const touchEndPosition = this._getTouchPosition(event);
                    const direction = this._detectDirection(this._touchStartPosition, touchEndPosition);
                    console.log('SwipeHander#touchEnd - direction: ', direction);
                    this._callback(direction, touchEndPosition);
                }
                this._touchStartPosition = null;
                this._touchStartTime = null;
            }
        });
        this._callback = callback;
        addEventListener(target, 'pointerdown', this._touchStart);
        addEventListener(target, 'pointerup', this._touchEnd);
    }
    _getTouchPosition(event) {
        return {
            x: event.pageX,
            y: event.pageY,
        };
    }
    _detectDirection(start, end) {
        const diff = start.x - end.x;
        if (diff > TRESHHOLD) {
            return ESwipeDirection.RIGHT;
        }
        else if (diff < -TRESHHOLD) {
            return ESwipeDirection.LEFT;
        }
        else {
            return ESwipeDirection.NONE;
        }
    }
}
