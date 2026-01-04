/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageDescription from '../interfaces/IImageDescription';
export default class ImageDescription implements IImageDescription {
    private _changedCallbacks;
    private _descriptionHandle;
    constructor(descriptionHandle: HTMLElement);
    show(): void;
    hide(): void;
    addChangedCallback(callback: (visible: boolean) => void): void;
    private _createCloseButton;
    private _setupCloseButtonHandler;
}
