/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbScroller from '../interfaces/IThumbScroller';
export type ThumbScrollerConfig = {
    numberOfVisibleThumbs?: number;
    initialIndex?: number;
};
export default class ThumbScrollerContainer {
    private _loader;
    private _thumbScroller;
    constructor(thumbContainer: HTMLElement, thumbElements: NodeListOf<HTMLElement>, config: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void);
    getScroller(): IThumbScroller | null;
    private _prepareThumbs;
    private _prepareThumbScroller;
    private _addThumbScrollerInteraction;
}
