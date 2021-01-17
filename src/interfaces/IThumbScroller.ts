/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IThumbScroller {
  scrollTo(index: number): boolean;

  scrollPrevious(): boolean;

  scrollNext(): boolean;

  addScrollIndexChangedCallback(callback: (index: number) => void): void;
}
