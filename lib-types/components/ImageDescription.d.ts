/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
import IImageDescription from '../interfaces/IImageDescription';
export default class ImageDescription implements IImageDescription {
    private _changedCallbacks;
    private _descriptionHandle;
    private _descriptionTextHandle;
    constructor(descriptionHandle?: HTMLElement);
    show(): void;
    hide(): void;
    getDescriptionHandle(): HTMLElement;
    updateDescription(description: string): void;
    addChangedCallback(callback: (visible: boolean) => void): void;
    private _createCloseButton;
    private _setupCloseButtonHandler;
}
