import { border } from '../../../src/transform/rules/border.mjs';

describe('border', () => {
  test('not match', () => {
    expect(border(['margin-left', '12px'])).toBe(false);
  });

  test('base', () => {
    expect(border(['border', '0.5rem dashed pink'])).toBe(
      'border-8 border-dashed border-[pink]',
    );
  });

  test('only one', () => {
    expect(border(['border', 'solid'])).toBe('border-solid');
  });

  test('only two', () => {
    expect(border(['border', 'dashed red'])).toBe('border-[red] border-dashed');
  });

  test('border style unresolved', () => {
    expect(border(['border', '0.5rem outset pink'])).toBe(
      'border-8 border-[outset] border-[pink]',
    );
  });

  test('border left', () => {
    expect(border(['border-left', '0.5rem outset pink'])).toBe(
      'border-l-8 border-[outset] border-[pink]',
    );
  });

  test('invalid', () => {
    expect(border(['border', 'dashed red dashed red'])).toBe(false);
  });
});
