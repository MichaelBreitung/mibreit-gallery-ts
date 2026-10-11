/**
 * Factory for creating an ImagesWall inside a given container
 */
import { getElement, getElements } from 'mibreit-dom-tools';

import ImagesWall from '../components/ImagesWall';
import { ImagesWallBuilder } from '../builders';
import { checkImagesWallConfig } from '../types';
import { assertCallback, assertSelector } from './validation';

export default function (
  containerSelector: string,
  imagesSelector: string,
  columns?: number,
  imageClickedCallback?: (index: number) => void,
  scrollLoaderDelay?: number
): ImagesWall {
  const validatedContainerSelector = assertSelector(
    containerSelector,
    'createImagesWall',
    'first parameter containerSelector'
  );
  const validatedImagesSelector = assertSelector(
    imagesSelector,
    'createImagesWall',
    'second parameter imagesSelector'
  );
  checkImagesWallConfig({ columns, scrollLoaderDelay });
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

  const builder = new ImagesWallBuilder(container, images, columns);
  if (imageClickedCallback) {
    builder.addImageClickedCallback(imageClickedCallback);
  }
  if (scrollLoaderDelay) {
    builder.setScrollLoaderDelay(scrollLoaderDelay);
  }
  const wall = builder.build();

  return wall;
}
