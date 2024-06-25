import { describe, test, expect } from 'vitest';
import { checkThumbScrollerConfig } from '../../lib/types';

describe('Config Test Test Suite', () => {
  test('checkThumbScrollerConfig fails for invalid numberOfVisibleThumbs input', async () => {
    // undefined
    expect(() => checkThumbScrollerConfig({ numberOfVisibleThumbs: '10' })).toThrowError();
  });

  test('checkThumbScrollerConfig fails for negative numberOfVisibleThumbs', async () => {
    // undefined
    expect(() => checkThumbScrollerConfig({ numberOfVisibleThumbs: -1 })).toThrowError();
  });

  test('checkThumbScrollerConfig fails for invalid initialIndex input', async () => {
    // undefined
    expect(() => checkThumbScrollerConfig({ initialIndex: '10' })).toThrowError();
  });

  test('checkThumbScrollerConfig fails for negative initialIndex', async () => {
    // undefined
    expect(() => checkThumbScrollerConfig({ initialIndex: -1 })).toThrowError();
  });

  test('checkThumbScrollerConfig succeeds for valid config', async () => {
    // undefined
    expect(() => checkThumbScrollerConfig({ initialIndex: 1, numberOfVisibleThumbs: 1 })).not.toThrowError();
  });
});
