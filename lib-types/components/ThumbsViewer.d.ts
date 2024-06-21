/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsViewer from '../interfaces/IThumbsViewer';
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
export default class ThumbsViewer implements IThumbsViewer {
    private _scroller;
    private _thumbsWrapper;
    private _scrollIndexChangedCallbacks;
    private _currentScrollIndex;
    constructor(thumbsWrapper: IThumbsWrapper);
    reinitSize(): void;
    setCenterThumb(index: number, useCenterIndex?: boolean): void;
    scrollNext(): void;
    scrollPrevious(): void;
    addScrollIndexChangedCallback(callback: (index: number) => void): void;
    private _normalizeIndex;
}
