/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { getElements } from 'mibreit-dom-tools';

import GalleryContainerBuilder from '../builders/GalleryBuilder';

// Interfaces
import IGallery from '../interfaces/IGallery';

// Types
import { SlideshowConfig, checkSlideshowConfig } from '../types';

export default function (imageSelector: string, config: SlideshowConfig, showDescriptions: boolean = false): IGallery {
  if (typeof imageSelector !== 'string') {
    throw new Error('createFullscreenOnlyGallery - first parameter must be imageSelector string');
  }
  checkSlideshowConfig(config);

  const elements = getElements(imageSelector);
  if (elements?.length > 0) {
    const builder = GalleryContainerBuilder.fromImages(elements, config)
      .addPreviousNextButtons()
      .addFullscreen({ useAverageBackgroundColor: true });

    if (showDescriptions) {
      builder.addDescriptions();
    }
    const gallery = builder.build();

    elements.forEach(function (image, index) {
      image.style.setProperty('cursor', 'pointer');
      image.addEventListener('click', function () {
        const fullScreen = gallery.getFullscreen();
        if (fullScreen && !fullScreen.isActive()) {
          gallery.getImageViewer().showImage(index);
          fullScreen.activate();
        }
      });
    });
    return gallery;
  } else {
    throw new Error('createFullscreenOnlyGallery - no images selected');
  }
}
