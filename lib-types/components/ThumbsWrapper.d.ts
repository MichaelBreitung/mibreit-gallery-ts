/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
export default class ThumbsWrapper implements IThumbsWrapper {
    private _wrapper;
    private _previousButton;
    private _nextButton;
    private _thumbSizeRem;
    private _thumbs;
    private _numberOfVisibleThumbs;
    constructor(container: HTMLElement, numberOfVisibleThumbs: number);
    reinitSize(): void;
    getThumbSizeRem(): number;
    getNumberOfVisibleThumbs(): number;
    getNumberOfThumbs(): number;
    getThumbScrollerButtons(): {
        previousButton: HTMLElement;
        nextButton: HTMLElement;
    };
    getElements(): Array<Node>;
    private _wrapThumbs;
    private _calculateThumbsize;
    private _createScrollerButtons;
    private _resizeThumbs;
}
