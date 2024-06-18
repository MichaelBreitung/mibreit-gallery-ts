/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { IElementInfo } from "mibreit-lazy-loader";
export default interface IImageInfo extends IElementInfo  {
  getTitle(): string;

  getUrl(): void;
}
