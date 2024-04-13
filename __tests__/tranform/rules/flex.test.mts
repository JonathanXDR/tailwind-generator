import { flex } from "../../../src/transform/rules/flex.mjs";

describe('flex', () => {
  test('not match', () => {
    expect(flex(['margin', '1'])).toBe(false);
  });

  test('base', () => {
    expect(flex(['flex', '1'])).toBe('flex-[1]');
  });

  test('flex-1', () => {
    expect(flex(['flex', '1 1 0%'])).toBe('flex-1');
  });

  test('arbitrary', () => {
    expect(flex(['flex', '2 2 0%'])).toBe('flex-[2_2_0%]');
  });
});
