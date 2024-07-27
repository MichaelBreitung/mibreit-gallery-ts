/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */
export default interface IThumbsViewer {
    setCenterThumb(index: number, useCenterIndex?: boolean): void;
    scrollPrevious(): void;
    scrollNext(): void;
    addScrollIndexChangedCallback(callback: (index: number) => void): void;
}
