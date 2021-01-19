/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import FullscreenView from '../components/FullscreenView';
import IFullscreenView from '../interfaces/IFullscreenView';

export const createFullscreen = function (
  galleryContainer: HTMLElement,
  thumbContainer?: HTMLElement
): IFullscreenView { 
  return new FullscreenView(galleryContainer, thumbContainer);
};
