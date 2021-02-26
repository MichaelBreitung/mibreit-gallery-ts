/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import GalleryContainer, { GalleryConfig } from '../containers/GalleryContainer';
import IGalleryContainer from '../interfaces/IGalleryContainer';

function checkConfig(config: GalleryConfig) {
  if (typeof config.slideshowContainerSelector !== 'string') {
    throw new Error('createGallery - config missing slideshowContainerSelector string');
  }
}

export default function (config: GalleryConfig): IGalleryContainer {
  checkConfig(config);
  return new GalleryContainer(config);
}
