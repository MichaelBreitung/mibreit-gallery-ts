/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IThumbsViewer from '../interfaces/IThumbsViewer';
import { ThumbScrollerConfig } from '../types';
export default class ThumbScrollerBuilder {
    private _thumbContainerElement;
    private _previousButtonElement?;
    private _nextButtonElement?;
    private _thumbsWrapper;
    private _lazyLoader;
    private _initialIndex;
    constructor(thumbContainerElement: HTMLElement, thumbElements: NodeListOf<HTMLElement>, config?: ThumbScrollerConfig, thumbClickedCallback?: (index: number) => void);
    addPreviousNextButtons(): ThumbScrollerBuilder;
    build(): IThumbsViewer | null;
    private _createThumbsArray;
    private _createThumbsViewer;
    private _createPreviousNextButtons;
    private _addThumbsViewerInteraction;
}
