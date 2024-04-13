import { margin } from '../../../src/transform/rules/margin.mjs';

describe('margin rule', () => {
  test('not match', () => {
    expect(margin(['padding-left', '12px'])).toBe(false);
  });

  test('base', () => {
    expect(margin(['margin', '13px 12px 1px'])).toBe('mb-px mx-3 mt-[13px]');
  });

  test('1px', () => {
    expect(margin(['margin', '1px'])).toBe('m-px');
  });

  test('base item', () => {
    expect(margin(['margin-left', '13px'])).toBe('ml-[13px]');
  });

  test('variable init', () => {
    expect(margin(['margin', 'var(--test, 15px)'])).toBe('m-[15px]');
  });

  test('variable init int', () => {
    expect(margin(['margin', 'var(--test, 16px)'])).toBe('m-4');
  });

  test('variable', () => {
    expect(margin(['margin', 'var(--test)'])).toBe('m-[length:var(--test)]');
  });

  test('variable deep', () => {
    expect(margin(['margin', 'var(--test, var(--test, 15px))'])).toBe(
      'm-[15px]',
    );
  });

  test('scroll margin', () => {
    expect(margin(['scroll-margin', '1px'])).toBe('scroll-m-px');
  });

  test('scroll margin arbitrary', () => {
    expect(margin(['scroll-margin', '3px'])).toBe('scroll-m-[3px]');
  });
});
