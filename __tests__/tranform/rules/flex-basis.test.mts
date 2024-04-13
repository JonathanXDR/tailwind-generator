import { flexBasis } from "../../../src/transform/rules/flex-basis.mjs";

describe('flex basis', () => {
  test('not match', () => {
    expect(flexBasis(['margin-left', '12px'])).toBe(false);
  });

  test('base', () => {
    expect(flexBasis(['flex-basis', '12px'])).toBe('basis-3');
  });

  test('custom', () => {
    expect(flexBasis(['flex-basis', '13px'])).toBe('basis-[13px]');
  });

  test('var', () => {
    expect(flexBasis(['flex-basis', 'var(--length, 13px)'])).toBe('basis-[13px]');
  });

  test('percentage', () => {
    expect(flexBasis(['flex-basis', '13%'])).toBe('basis-[13%]');
  });

  test('zero', () => {
    expect(flexBasis(['flex-basis', '0'])).toBe('basis-0');
  });
});
