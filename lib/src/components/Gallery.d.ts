/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import IImageViewer from '../interfaces/IImageViewer';
import { ThumbScrollerConfig } from '../components/ThumbScrollerView';
import { SlideshowConfig } from '../components/Slideshow';
export declare type GalleryConfig = (ThumbScrollerConfig & SlideshowConfig & {
    galleryContainerSelector: string;
}) | (SlideshowConfig & {
    galleryContainerSelector: string;
});
export default class Gallery {
    private _slideShow;
    constructor(config: GalleryConfig);
    getViewer(): IImageViewer;
    getLoader(): ILazyLoader;
    private _createPreviousNextButtons;
    private _createFullscreenButton;
    private _setupHoverEvents;
    private _setupKeyEvents;
    private _setupResizeHandler;
    private _setupSwipeHandler;
    private _setupFullscreenClickEvent;
    private _setupFullscreenChangedHandler;
}
