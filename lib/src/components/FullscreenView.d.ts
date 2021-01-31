/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IFullscreenView from '../interfaces/IFullscreenView';
export default class FullscreenView implements IFullscreenView {
    private _fullscreenChangedCallbacks;
    private _fullscreenActive;
    private _galleryContainer;
    private _thumbContainer?;
    private _fullScreenContainer;
    private _galleryContainerPlaceholder;
    private _thumbContainerPlaceholder;
    private _fullScreenCloseButton;
    constructor(galleryContainer: HTMLElement, thumbContainer?: HTMLElement);
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
