import { describe, expect, it } from 'vitest';

import createImagesWall from './createImagesWall';
import createSlideshow from './createSlideshow';

describe('Factory Input Validation Test Suite', () => {
  it('rejects invalid selector parameters', () => {
    expect(() => createSlideshow(1)).toThrowError('createSlideshow - first parameter imageSelector must be a selector string');
    expect(() => createImagesWall('.container')).toThrowError(
      'createImagesWall - second parameter imagesSelector must be a selector string'
    );
    expect(() => createImagesWall('.container', 1)).toThrowError(
      'createImagesWall - second parameter imagesSelector must be a selector string'
    );
  });

  it('rejects invalid images-wall numeric options before selecting images', () => {
    expect(() => createImagesWall('.container', 'img', { columns: 0 })).toThrowError(
      'checkImagesWallConfig - columns should be an integer of at least 1'
    );
    expect(() => createImagesWall('.container', 'img', { scrollLoaderDelay: -1 })).toThrowError(
      'checkImagesWallConfig - scrollLoaderDelay should be a number of at least 0'
    );
  });
});
