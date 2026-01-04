/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreen from '../interfaces/IFullscreen';
export default class Fullscreen implements IFullscreen {
    private _changedCallbacks;
    private _active;
    private _slideshowContainerElement;
    private _fullScreenContainerElement;
    private _slideshowContainerPlaceholderElement;
    private _closeButtonElement;
    constructor(slideshowContainer: HTMLElement);
    activate(): void;
    deActivate(): void;
    addChangedCallback(callback: (active: boolean) => void): void;
    isActive(): boolean;
    setBackgroundColor(color: string): void;
    setAverageBackgroundColor(): void;
    private _createFullscreenContainer;
    private _createFullscreenCloseButton;
    private _createSlideshowContainerPlaceholder;
    private _addFullscreen;
    private _removeFullscreen;
    private _moveGalleryToFullscreen;
    private _removeGalleryFromFullscreen;
    private _setupCloseButtonHandler;
}
