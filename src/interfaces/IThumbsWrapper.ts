/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

export default interface IThumbsWrapper {
  getThumbSizeRem(): number;

  getNumberOfVisibleThumbs(): number;

  getNumberOfThumbs(): number;

  getElements(): Array<Node>;

  reinitSize(): void;
}
