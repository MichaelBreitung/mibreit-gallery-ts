/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export type TPosition = {
    x: number;
    y: number;
};
export declare enum ESwipeDirection {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2
}
export default class SwipeHander {
    private _callback;
    private _touchStartTime;
    private _touchStartPosition;
    constructor(target: HTMLElement, callback: (direction: ESwipeDirection, position: TPosition) => void);
    private _touchStart;
    private _touchEnd;
    private _getTouchPosition;
    private _detectDirection;
}
