/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { SlideshowConfig } from '../containers/SlideshowContainer';
import { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';
export default class GalleryContainerBuilder {
    private _slideshowContainerElement;
    private _imageViewer;
    private _lazyLoader;
    private _thumbsViewer;
    private _fullscreenContainer;
    constructor(slideshowContainerElement: HTMLElement, images: NodeListOf<HTMLElement>, config?: SlideshowConfig);
    addFullscreen(): void;
    addThumbScroller(thumbContainer: HTMLElement, thumbs: NodeListOf<HTMLElement>, config?: ThumbScrollerConfig): GalleryContainerBuilder;
    build(): IGalleryContainer;
    private _createPreviousNextButtons;
    private _setupSwipeHandler;
    private _setupThumbsViewerResizeHandler;
    private _setupHoverEvents;
    private _setupKeyEvents;
    private _setupFullscreenKeyEvents;
    private _createFullscreenButton;
    private _setupFullscreenClickEvent;
    private _setupFullscreenChangedHandler;
}
