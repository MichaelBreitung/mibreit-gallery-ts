/**
 * @author Michael Breitung
 * @copyright Michael Breitung Photography (www.mibreit-photo.com)
 */

import { addCssStyle, getElement, getElements } from 'mibreit-dom-tools';

import { GalleryBuilder } from '../builders';

// Interfaces
import IGallery from '../interfaces/IGallery';

// Types
import { checkGalleryConfig, GalleryConfig } from '../types';
import { assertCallback, assertSelector } from './validation';

export default function (
  containerSelector: string,
  imageSelector: string,
  config?: GalleryConfig,
  buyImageCb: ((idx: number) => void) | null = null
): IGallery {
  const validatedContainerSelector = assertSelector(
    containerSelector,
    'createGallery',
    'first parameter containerSelector'
  );
  const validatedImageSelector = assertSelector(imageSelector, 'createGallery', 'second parameter imageSelector');
  if (config) {
    checkGalleryConfig(config);
  }
  if (buyImageCb) {
    assertCallback(buyImageCb, 'createGallery', 'fourth parameter buyImageCb');
  }

  const elements = getElements(validatedImageSelector);
  const container = getElement(validatedContainerSelector);
  if (container && elements.length > 0) {
    const builder = GalleryBuilder.fromContainerAndImages(container, elements, config)
      .addPreviousNextButtons()
      .addFullscreen({ useAverageBackgroundColor: true });

    if (config?.thumbSelector && config?.thumbContainerSelector) {
      const thumbContainer = getElement(config.thumbContainerSelector);
      const thumbs = getElements(config.thumbSelector);
      if (thumbContainer && thumbs) {
        if (thumbs.length > 1) {
          builder.addThumbScroller(thumbContainer, thumbs, config);
        } else {
          addCssStyle(thumbContainer, 'display', 'none');
        }
      }
    }
    const descriptionElements = getElements(`${validatedContainerSelector} figcaption`);
    if (descriptionElements.length) {
      builder.addDescriptions(descriptionElements);
    }
    if (buyImageCb) {
      builder.addBuyImageCallback(buyImageCb);
    }

    const gallery = builder.build();

    if (config?.initialImageNr) {
      gallery.getImageViewer().showImage(config.initialImageNr);
    } else {
      gallery.getImageViewer().showImage(0);
    }

    return gallery;
  } else {
    throw new Error('createGallery - no images selected');
  }
}
