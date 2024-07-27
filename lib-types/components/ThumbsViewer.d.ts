/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsViewer from '../interfaces/IThumbsViewer';
export default class ThumbsViewer implements IThumbsViewer {
    private _scroller;
    private _wrapperElement;
    private _thumbElements;
    private _thumbSizeRem;
    private _numberOfVisibleThumbs;
    private _scrollIndexChangedCallbacks;
    private _currentScrollIndex;
    constructor(container: HTMLElement, numberOfVisibleThumbs: number);
    setCenterThumb(index: number, useCenterIndex?: boolean): void;
    scrollNext(): void;
    scrollPrevious(): void;
    addScrollIndexChangedCallback(callback: (index: number) => void): void;
    private _reinitSize;
    private _normalizeIndex;
    private _wrapThumbs;
    private _calculateThumbsize;
    private _resizeThumbs;
}
