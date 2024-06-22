/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsViewer from '../interfaces/IThumbsViewer';
import { ThumbScrollerConfig } from '../types';
export default class ThumbsScrollerBuilder {
    private _thumbContainerElement;
    private _previousButtonElement?;
    private _nextButtonElement?;
    private _lazyLoader;
    private _numberOfVisibleThumbs;
    private _numberOfThumbs;
    private _initialIndex;
    private _thumbsViewer;
    constructor(thumbContainerElement: HTMLElement, thumbElements: NodeListOf<HTMLElement>, config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void);
    addPreviousNextButtons(): ThumbsScrollerBuilder;
    build(): IThumbsViewer;
    private _createThumbsArray;
    private _createThumbStages;
    private _createThumbsViewer;
    private _createPreviousNextButtons;
    private _addThumbsViewerInteraction;
}
