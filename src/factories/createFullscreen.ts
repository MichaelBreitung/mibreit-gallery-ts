/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import FullscreenContainer from '../containers/FullscreenContainer';
import IFullscreen from '../interfaces/IFullscreen';

export default function (
  galleryContainer: HTMLElement,  
  thumbContainer?: HTMLElement | null,
  usePlaceholder?: boolean,
): IFullscreen { 
  return new FullscreenContainer(galleryContainer, thumbContainer, usePlaceholder);
};
