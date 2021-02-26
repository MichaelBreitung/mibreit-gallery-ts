/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreen from '../interfaces/IFullscreen';
import { SlideshowConfig } from './SlideshowContainer';
export declare type FullscreenOnlyGalleryConfig = SlideshowConfig;
export default class FullscreenOnlyGallery implements IFullscreen {
    private _container;
    private _gallery;
    constructor(config: FullscreenOnlyGalleryConfig);
    activate(): void;
    deActivate(): void;
    addFullscreenChangedCallback(callback: (active: boolean) => void): void;
    isFullscreenActive(): boolean;
}
