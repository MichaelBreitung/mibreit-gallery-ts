/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default class ImageSurrogate {
    private _surrogate;
    private _imageHandle;
    private _active;
    constructor(imageHandle: HTMLElement);
    wrap(): HTMLElement | null;
    unwrap(): void;
    private _createSurrogate;
}
