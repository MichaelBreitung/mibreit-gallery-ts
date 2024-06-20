/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsViewer from '../interfaces/IThumbsViewer';
export type ThumbScrollerConfig = {
    numberOfVisibleThumbs?: number;
    initialIndex?: number;
};
export default class ThumbScrollerContainer {
    private _thumbsViewer;
    constructor(thumbContainer: HTMLElement, thumbElements: NodeListOf<HTMLElement>, config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void);
    getThumbsViewer(): IThumbsViewer | null;
    private _prepareThumbs;
    private _prepareThumbsViewer;
    private _addThumbsViewerInteraction;
}
