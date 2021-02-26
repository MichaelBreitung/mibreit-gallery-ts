/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import IFullscreen from './IFullscreen';
import ISlideshowContainer from './ISlideshowContainer';
import IThumbScroller from './IThumbScroller';

export default interface IGalleryContainer extends ISlideshowContainer { 
  getFullscreen(): IFullscreen;

  getScroller(): IThumbScroller;
}
