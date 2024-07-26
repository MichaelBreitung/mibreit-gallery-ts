import { describe, test, expect } from 'vitest';
import { createGallery } from './createGallery';

describe('Gallery Creation Test Suite', () => {
  test('create fails for invalid selectors', async () => {
    // undefined
    expect(() => createGallery()).toThrowError();

    // numbers
    expect(() => createGallery(10, 10)).toThrowError();
  });

  test('create fails for selectors with no content', async () => {
    // we don't have a dom here, so we don't get anything from these selectors
    expect(() => createGallery('selector', 'selector')).toThrowError();
  });
});
