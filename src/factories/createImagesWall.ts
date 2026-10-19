/**
 * Factory for creating an ImagesWall inside a given container
 */
import { getElement, getElements } from 'mibreit-dom-tools';

import ImagesWall from '../components/ImagesWall';
import { ImagesWallBuilder } from '../builders';
import { checkImagesWallConfig, ImagesWallConfig } from '../types';
import { assertCallback, assertSelector } from './validation';

export default function (
  containerSelector: string,
  imagesSelector: string,
  config?: ImagesWallConfig,
  imageClickedCallback?: (index: number) => void
): ImagesWall {
  const validatedContainerSelector = assertSelector(
    containerSelector,
    'createImagesWall',
    'first parameter containerSelector'
  );
  const validatedImagesSelector = assertSelector(imagesSelector, 'createImagesWall', 'second parameter imagesSelector');
  if (config) {
    checkImagesWallConfig(config);
  }
  if (imageClickedCallback) {
    assertCallback(imageClickedCallback, 'createImagesWall', 'fourth parameter imageClickedCallback');
  }

  const container = getElement(validatedContainerSelector);

  if (!container) {
    throw new Error('createImagesWall - container not found');
  }

  const images = getElements(validatedImagesSelector);

  if (!images || images.length === 0) {
    throw new Error('createImagesWall - no images found inside the container');
  }

  const builder = new ImagesWallBuilder(container, images, config);
  if (imageClickedCallback) {
    builder.addImageClickedCallback(imageClickedCallback);
  }
  const wall = builder.build();

  return wall;
}
