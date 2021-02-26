/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreen from '../interfaces/IFullscreen';
import { SlideshowConfig } from './SlideshowContainer';
export declare type FullscreenOnlyGalleryConfig = SlideshowConfig;
export default class FullscreenOnlyGallery implements IFullscreen {
    private _config;
    private _container;
    private _images;
    private _surrogates;
    private _gallery;
    private _FullscreenContainer;
    constructor(config: FullscreenOnlyGalleryConfig);
    activate(): void;
    deActivate(): void;
    addFullscreenChangedCallback(callback: (active: boolean) => void): void;
    isFullscreenActive(): boolean;
    private _removeSurrogates;
}
