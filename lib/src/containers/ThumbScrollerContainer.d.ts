/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbScroller from '../interfaces/IThumbScroller';
export type ThumbScrollerConfig = {
    thumbContainerSelector: string;
    thumbSelector: string;
    numberOfVisibleThumbs: number;
    initialIndex?: number;
};
export declare function isThumbScrollerConfig(config: any): boolean;
export default class ThumbScrollerContainer {
    private _loader;
    private _thumbScroller;
    constructor(config: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void);
    getScroller(): IThumbScroller | null;
    private _prepareThumbs;
    private _prepareThumbScroller;
    private _addThumbScrollerInteraction;
}
