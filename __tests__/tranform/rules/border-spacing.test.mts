import { borderSpacing } from '../../../src/transform/rules/border-spacing.mjs';

describe('border-spacing', () => {
  test('not match', () => {
    expect(borderSpacing(['margin-left', '12px'])).toBe(false);
  });

  test('base', () => {
    expect(borderSpacing(['border-spacing', '80px 5rem'])).toBe(
      'border-spacing-20',
    );
  });

  test('x same as y', () => {
    expect(borderSpacing(['border-spacing', '11px 11px'])).toBe(
      'border-spacing-[11px]',
    );
  });

  test('x y is diff', () => {
    expect(borderSpacing(['border-spacing', '11px 13px'])).toBe(
      'border-spacing-x-[11px] border-spacing-y-[13px]',
    );
  });
});
