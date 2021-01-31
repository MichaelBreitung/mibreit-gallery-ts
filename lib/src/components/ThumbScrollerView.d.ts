/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbScroller from '../interfaces/IThumbScroller';
export declare type ThumbScrollerConfig = {
    thumbContainerSelector: string;
    thumbSelector: string;
    numberOfVisibleThumbs?: number;
    initialIndex?: number;
};
export default class ThumbScrollerView {
    private _loader;
    private _thumbScroller;
    constructor(config: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void);
    getScroller(): IThumbScroller;
    private _checkConfig;
    private _prepareThumbs;
    private _prepareThumbScroller;
    private _addThumbScrollerInteraction;
}
