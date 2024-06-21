/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsWrapper from '../interfaces/IThumbsWrapper';
export default class ThumbsWrapper implements IThumbsWrapper {
    private _wrapper;
    private _thumbSizeRem;
    private _thumbs;
    private _numberOfVisibleThumbs;
    constructor(container: HTMLElement, numberOfVisibleThumbs: number);
    reinitSize(): void;
    getThumbSizeRem(): number;
    getNumberOfVisibleThumbs(): number;
    getNumberOfThumbs(): number;
    getElements(): Array<Node>;
    private _wrapThumbs;
    private _calculateThumbsize;
    private _resizeThumbs;
}
