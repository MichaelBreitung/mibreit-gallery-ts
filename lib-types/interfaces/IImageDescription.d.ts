/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default interface IImageDescription {
    show(): void;
    hide(): void;
    addChangedCallback(callback: (active: boolean) => void): void;
}
