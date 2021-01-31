/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbScroller from '../interfaces/IThumbScroller';
import IThumbScrollerLayout from '../interfaces/IThumbScrollerLayout';
export default class ThumbScroller implements IThumbScroller {
    private _scroller;
    private _layout;
    private _scrollIndexChangedCallbacks;
    private _currentScrollIndex;
    constructor(layout: IThumbScrollerLayout);
    reinitSize(): void;
    scrollTo(index: number, useCenterIndex?: boolean): void;
    scrollNext(): void;
    scrollPrevious(): void;
    addScrollIndexChangedCallback(callback: (index: number) => void): void;
    private _normalizeIndex;
}
