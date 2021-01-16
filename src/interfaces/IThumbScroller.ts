/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IThumbScroller {
  scrollTo(index: number): boolean;

  scrollPrevious(nrOfThumbs: number): boolean;

  scrollNext(nrOfThumbs: number): boolean;

  addScrollIndexChangedCallback(callback: (index: number) => void): void;
}
