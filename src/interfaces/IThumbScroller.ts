/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IThumbScroller {
  scrollTo(index: number, useCenterIndex: boolean): void;

  scrollPrevious(): void;

  scrollNext(): void;

  reinitSize(): void;

  addScrollIndexChangedCallback(callback: (index: number) => void): void;
}
