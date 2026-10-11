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
import { assertCallback, assertSelector } from './validation';

export default function (
  imageSelector: string,
  config: SlideshowConfig,
  showDescriptions: boolean = false,
  buyImageCb: ((idx: number) => void) | null = null
): IGallery {
  const validatedImageSelector = assertSelector(
    imageSelector,
    'createFullscreenOnlyGallery',
    'first parameter imageSelector'
  );
  checkSlideshowConfig(config);
  if (buyImageCb) {
    assertCallback(buyImageCb, 'createFullscreenOnlyGallery', 'fourth parameter buyImageCb');
  }

  const elements = getElements(validatedImageSelector);
  if (elements?.length > 0) {
    const builder = GalleryContainerBuilder.fromImages(elements, config)
      .addPreviousNextButtons()
      .addFullscreen({ useAverageBackgroundColor: true });

    if (showDescriptions) {
      builder.addDescriptions();
    }
    if (buyImageCb) {
      builder.addBuyImageCallback(buyImageCb);
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
