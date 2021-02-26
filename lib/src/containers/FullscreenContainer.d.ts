/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreen from '../interfaces/IFullscreen';
export declare type FullscreenConfig = {
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
    constructor(slideshowContainer: HTMLElement, thumbContainer?: HTMLElement, usePlaceholder?: boolean);
    activate(): void;
    deActivate(): void;
    addFullscreenChangedCallback(callback: (active: boolean) => void): void;
    isFullscreenActive(): boolean;
    private _createFullscreenContainer;
    private _addFullscreen;
    private _removeFullscreen;
    private _moveGalleryToFullscreen;
    private _removeGalleryFromFullscreen;
    private _moveThumbsToFullscreen;
    private _removeThumbsFromFullscreen;
    private _setupCloseButtonHandler;
}
