import { arbitraryValues } from '../../../src/transform/rules/arbitrary-values.mjs';

describe('arbitrary values', () => {
  test('not match', () => {
    expect(arbitraryValues(['margin-left', '12px'])).toBe(false);
  });

  test('aspect-ratio', () => {
    expect(arbitraryValues(['aspect-ratio', '1 / 1'])).toBe('aspect-square');
  });

  test('aspect-ratio var', () => {
    expect(arbitraryValues(['aspect-ratio', '4 / 3'])).toBe('aspect-[4/3]');
  });

  test('grid-template-columns', () => {
    expect(
      arbitraryValues(['grid-template-columns', 'repeat(4, minmax(0, 1fr))']),
    ).toBe('grid-cols-4');
  });

  test('grid-template-columns var', () => {
    expect(
      arbitraryValues(['grid-template-columns', 'repeat(4, minmax(1, 1fr))']),
    ).toBe('grid-cols-[repeat(4,minmax(1,1fr))]');
  });

  test('list-style-type', () => {
    expect(arbitraryValues(['list-style-type', 'upper-roman'])).toBe(
      'list-[upper-roman]',
    );
  });

  test('background-position', () => {
    expect(arbitraryValues(['background-position', 'center'])).toBe(
      'bg-center',
    );
  });

  test('background-position arbitrary', () => {
    expect(arbitraryValues(['background-position', 'center top 1rem'])).toBe(
      'bg-[center_top_1rem]',
    );
  });

  test('background-image', () => {
    expect(
      arbitraryValues([
        'background-image',
        'linear-gradient(to top, var(--tw-gradient-stops))',
      ]),
    ).toBe('bg-gradient-to-t');
  });

  test('background-image arbitrary', () => {
    expect(
      arbitraryValues(['background-image', 'url("/img/hero-pattern.svg")']),
    ).toBe('bg-[url("/img/hero-pattern.svg")]');
  });

  test('border-radius', () => {
    expect(arbitraryValues(['border-radius', '2px'])).toBe('rounded-sm');
  });

  test('border-radius arbitrary', () => {
    expect(arbitraryValues(['border-radius', '25% 10%'])).toBe(
      'rounded-[25%_10%]',
    );
  });

  test('transform-origin', () => {
    expect(arbitraryValues(['transform-origin', 'top right'])).toBe(
      'origin-top-right',
    );
  });

  test('cursor', () => {
    expect(arbitraryValues(['cursor', 'se-resize'])).toBe('cursor-se-resize');
  });

  test('cursor arbitrary', () => {
    expect(arbitraryValues(['cursor', 'url(hand.cur), pointer'])).toBe(
      'cursor-[url(hand.cur),_pointer]',
    );
  });

  test('will-change', () => {
    expect(arbitraryValues(['will-change', 'auto'])).toBe('will-change-auto');
  });

  test('will-change arbitrary', () => {
    expect(arbitraryValues(['will-change', 'left, top'])).toBe(
      'will-change-[left,top]',
    );
  });

  test('z-index', () => {
    expect(arbitraryValues(['z-index', '11'])).toBe('z-[11]');
  });
});
