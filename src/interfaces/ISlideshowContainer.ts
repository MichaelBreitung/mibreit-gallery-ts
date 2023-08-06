/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IImageViewer from './IImageViewer';

export default interface ISlideshowContainer {
  getViewer(): IImageViewer | null;
}
