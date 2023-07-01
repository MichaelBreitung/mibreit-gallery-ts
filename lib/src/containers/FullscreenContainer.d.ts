/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreen from '../interfaces/IFullscreen';
export type FullscreenConfig = {
    slideshowContainerSelector: string;
    thumbContainerSelector: string;
};
export default class FullscreenContainer implements IFullscreen {
    private _fullscreenChangedCallbacks;
    private _fullscreenActive;
    private _slideshowContainer;
    private _thumbContainer;
    private _fullScreenContainer;
    private _slideshowContainerPlaceholder;
    private _thumbContainerPlaceholder;
    private _fullScreenCloseButton;
    private _usePlaceholder;
    constructor(slideshowContainer: HTMLElement, thumbContainer?: HTMLElement | null, usePlaceholder?: boolean);
    activate(): void;
    deActivate(): void;
    addFullscreenChangedCallback(callback: (active: boolean) => void): void;
    isFullscreenActive(): boolean;
    setBackgroundColor(color: string): void;
    private _createFullscreenContainer;
    private _createFullscreenCloseButton;
    private _createSlideshowContainerPlaceholder;
    private _createThumbContainerPlaceholder;
    private _addFullscreen;
    private _removeFullscreen;
    private _moveGalleryToFullscreen;
    private _removeGalleryFromFullscreen;
    private _moveThumbsToFullscreen;
    private _removeThumbsFromFullscreen;
    private _setupCloseButtonHandler;
}
