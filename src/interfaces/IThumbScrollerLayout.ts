/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IThumbScrollerLayout {
  getThumbSizeRem(): number;

  getNumberOfVisibleThumbs(): number;

  getNumberOfThumbs(): number;

  getThumbScrollerButtons(): { previousButton: HTMLElement; nextButton: HTMLElement };

  getScrollerContainer(): HTMLElement;

  reinitSize(): void;
}
