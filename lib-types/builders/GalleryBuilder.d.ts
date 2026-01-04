/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IGallery from '../interfaces/IGallery';
import { FullscreenConfig, SlideshowConfig, ThumbScrollerConfig } from '../types';
export default class GalleryContainerBuilder {
    private _slideshowContainerElement;
    private _fullScreenOnly;
    private _slideshow;
    private _thumbsViewer;
    private _fullscreen;
    private _imageDescriptions;
    private constructor();
    static fromContainerAndImages(slideshowContainerElement: HTMLElement, imageElements: NodeListOf<HTMLElement>, config?: SlideshowConfig): GalleryContainerBuilder;
    static fromImages(imageElements: NodeListOf<HTMLElement>, config?: SlideshowConfig): GalleryContainerBuilder;
    addPreviousNextButtons(): GalleryContainerBuilder;
    addFullscreen(config?: FullscreenConfig): GalleryContainerBuilder;
    addThumbScroller(thumbContainer: HTMLElement, thumbs: NodeListOf<HTMLElement>, config?: ThumbScrollerConfig): GalleryContainerBuilder;
    addDescriptions(descriptions: NodeListOf<HTMLElement>): GalleryContainerBuilder;
    build(): IGallery;
    private _createPreviousNextButtons;
    private _setupSwipeHandler;
    private _setupHoverEvents;
    private _setupKeyEvents;
    private _setupFullscreenKeyEvents;
    private _createFullscreenButton;
    private _setupFullscreenClickEvent;
    private _setupFullscreenChangedHandler;
    private _createInfoButton;
    private _setupInfoClickEvent;
}
