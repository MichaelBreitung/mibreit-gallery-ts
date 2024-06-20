/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageStage from '../interfaces/IImageStage';
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
export default class ThumbsWrapper implements IThumbsWrapper {
    private _wrapper;
    private _previousButton;
    private _nextButton;
    private _thumbSizeRem;
    private _thumbStages;
    private _numberOfVisibleThumbs;
    constructor(container: HTMLElement, thumbStages: Array<IImageStage>, numberOfVisibleThumbs: number);
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
    private _resizeThumbStages;
}
