/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import Gallery, { GalleryConfig } from '../components/Gallery';

function checkConfig(config: GalleryConfig) {
  if (typeof config.galleryContainerSelector !== 'string') {
    throw new Error('createGallery - config missing galleryContainerSelector string');
  }
}

export default function (config: GalleryConfig): Gallery {
  checkConfig(config);
  return new Gallery(config);
}
