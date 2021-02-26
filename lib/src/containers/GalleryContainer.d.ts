/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import { ILazyLoader } from 'mibreit-lazy-loader';
import IGallery from '../interfaces/IGalleryContainer';
import IImageViewer from '../interfaces/IImageViewer';
import IThumbScroller from '../interfaces/IThumbScroller';
import IFullscreen from '../interfaces/IFullscreen';
import { ThumbScrollerConfig } from './ThumbScrollerContainer';
import { SlideshowConfig } from './SlideshowContainer';
export declare type GalleryConfig = (ThumbScrollerConfig & SlideshowConfig & {
    slideshowContainerSelector: string;
}) | (SlideshowConfig & {
    slideshowContainerSelector: string;
});
export default class GalleryContainer implements IGallery {
    private _slideShowContainer;
    private _fullscreenContainer;
    private _thumbScroller;
    constructor(config: GalleryConfig);
    isInitialized(): boolean;
    getViewer(): IImageViewer | null;
    getLoader(): ILazyLoader | null;
    getScroller(): IThumbScroller | null;
    getFullscreen(): IFullscreen | null;
    private _createPreviousNextButtons;
    private _createFullscreenButton;
    private _setupHoverEvents;
    private _setupKeyEvents;
    private _setupResizeHandler;
    private _setupSwipeHandler;
    private _setupFullscreenClickEvent;
    private _setupFullscreenChangedHandler;
}
