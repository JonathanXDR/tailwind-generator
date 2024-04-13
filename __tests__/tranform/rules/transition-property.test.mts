import { transitionProperty } from '../../../src/transform/rules/transition-property.mjs';

describe('transition-property', () => {
  test('not match', () => {
    expect(transitionProperty(['margin-left', '12px'])).toBe(false);
  });

  test('transition-none', () => {
    expect(transitionProperty(['transition-property', 'none'])).toBe(
      'transition-none',
    );
  });

  test('transition-all', () => {
    expect(transitionProperty(['transition-property', 'all'])).toBe(
      'transition-all',
    );
  });

  test('transition-all arbitrary', () => {
    expect(transitionProperty(['transition-property', 'width, height'])).toBe(
      'transition-[width,height]',
    );
  });
});
