import { sizing } from '../../../src/transform/rules/sizing.mjs';

describe('sizing', () => {
  test('not match', () => {
    expect(sizing(['margin-left', '12px'])).toBe(false);
  });

  test('max width', () => {
    expect(sizing(['max-width', '6px'])).toBe('max-w-1.5');
  });

  test('max width var', () => {
    expect(sizing(['max-width', '1.2rem'])).toBe('max-w-[1.2rem]');
  });

  test('font size', () => {
    expect(sizing(['font-size', '16px'])).toBe('text-[16px]');
  });

  test('font size var', () => {
    expect(sizing(['font-size', '22px'])).toBe('text-[22px]');
  });

  test('font weight', () => {
    expect(sizing(['font-weight', '400'])).toBe('font-normal');
  });

  test('font weight var', () => {
    expect(sizing(['font-weight', '1100'])).toBe('font-[1100]');
  });

  test('letter-spacing', () => {
    expect(sizing(['letter-spacing', '-0.05em'])).toBe('tracking-tighter');
  });

  test('letter-spacing var', () => {
    expect(sizing(['letter-spacing', '0.25em'])).toBe('tracking-[0.25em]');
  });

  test('line-height', () => {
    expect(sizing(['line-height', '12px'])).toBe('leading-3');
  });

  test('line-height var', () => {
    expect(sizing(['line-height', '13px'])).toBe('leading-[13px]');
  });

  test('text-underline-offset', () => {
    expect(sizing(['text-underline-offset', '1px'])).toBe('underline-offset-1');
  });

  test('left', () => {
    expect(sizing(['left', '12px'])).toBe('left-3');
  });

  test('left cus', () => {
    expect(sizing(['left', '13px'])).toBe('left-[13px]');
  });

  test('left var', () => {
    expect(sizing(['left', 'var(--length, 13px)'])).toBe('left-[13px]');
  });

  test('left end', () => {
    expect(sizing(['inset-inline-end', '3rem'])).toBe('end-12');
  });

  test('stroke-width', () => {
    expect(sizing(['stroke-width', '1'])).toBe('stroke-1');
  });

  test('stroke-width px', () => {
    expect(sizing(['stroke-width', '3px'])).toBe('stroke-[3px]');
  });
});
