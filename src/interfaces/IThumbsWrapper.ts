/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IThumbsWrapper {
  getThumbSizeRem(): number;

  getNumberOfVisibleThumbs(): number;

  getNumberOfThumbs(): number;

  getThumbScrollerButtons(): { previousButton: HTMLElement; nextButton: HTMLElement };

  getElements(): Array<Node>;

  reinitSize(): void;
}
