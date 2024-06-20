/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { SlideshowConfig } from '../containers/SlideshowContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';
import { ThumbScrollerConfig } from '../containers/ThumbScrollerContainer';
export default class GalleryContainerBuilder {
    private _container;
    private _fullscreenButton;
    private _imageViewer;
    private _loader;
    private _thumbsViewer;
    private _fullscreenContainer;
    constructor(container: HTMLElement, images: NodeListOf<HTMLElement>, config?: SlideshowConfig);
    addThumbScroller(thumbContainer: HTMLElement, thumbs: NodeListOf<HTMLElement>, config?: ThumbScrollerConfig): GalleryContainerBuilder;
    build(): IGalleryContainer;
    private _createPreviousNextButtons;
    private _setupSwipeHandler;
    private _setupResizeHandler;
    private _createFullscreenButton;
    private _setupHoverEvents;
    private _setupKeyEvents;
    private _setupFullscreenClickEvent;
    private _setupFullscreenChangedHandler;
}
