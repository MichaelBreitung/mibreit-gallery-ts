/**
 * Factory for creating an ImagesWall inside a given container
 */
import { getElement, getElements } from 'mibreit-dom-tools';

import ImagesWall from '../components/ImagesWall';
import { ImagesWallBuilder } from '../builders';

export default function (
  containerSelector: string,
  imagesSelector: string,
  columns?: number,
  imageClickedCallback?: (index: number) => void
): ImagesWall {
  if (typeof containerSelector !== 'string') {
    throw new Error('createImagesWall - first parameter must be containerSelector string');
  }

  const container = getElement(containerSelector);

  if (!container) {
    throw new Error('createImagesWall - container not found');
  }

  const images = getElements(imagesSelector);

  if (!images || images.length === 0) {
    throw new Error('createImagesWall - no images found inside the container');
  }

  const builder = new ImagesWallBuilder(container, images, columns ?? 3, imageClickedCallback);
  const wall = builder.build();

  return wall;
}
