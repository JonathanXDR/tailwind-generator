import { backdropFilter } from '../../../src/transform/rules/backdrop-filter.mjs';

describe('backdrop-filter', () => {
  test('not match', () => {
    expect(backdropFilter(['margin', '1'])).toBe(false);
  });

  test('blur', () => {
    expect(backdropFilter(['backdrop-filter', 'blur(4px)'])).toBe(
      'backdrop-blur-sm',
    );
  });

  test('blur arbitrary', () => {
    expect(backdropFilter(['backdrop-filter', 'blur(17px)'])).toBe(
      '[backdrop-filter:blur(17px)]',
    );
  });

  test('brightness', () => {
    expect(backdropFilter(['backdrop-filter', 'brightness(0.4)'])).toBe(
      '[backdrop-filter:brightness(0.4)]',
    );
  });

  test('contrast', () => {
    expect(backdropFilter(['backdrop-filter', 'contrast(200%)'])).toBe(
      'backdrop-contrast-200',
    );
  });

  test('opacity', () => {
    expect(backdropFilter(['backdrop-filter', 'opacity(0.25)'])).toBe(
      'backdrop-opacity-25',
    );
  });

  test('multiple', () => {
    expect(
      backdropFilter(['backdrop-filter', 'url(filters.svg#filter) blur(4px)']),
    ).toBe('backdrop-blur-sm [backdrop-filter:url(filters.svg#filter)]');
  });
});
