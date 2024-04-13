import { color } from '../../../src/transform/rules/color.mjs';

describe('color', () => {
  test('not match', () => {
    expect(color(['margin', '1'])).toBe(false);
  });

  test('text color', () => {
    expect(color(['color', 'rgb(255, 255, 255)'])).toBe('text-white');
  });

  test('text color var', () => {
    expect(color(['color', 'var(--white, #fff)'])).toBe('text-white');
  });

  test('text color var cus', () => {
    expect(color(['color', 'var(--white)'])).toBe('text-[color:var(--white)]');
  });

  test('text color arbitrary', () => {
    expect(color(['color', '#7743CE'])).toBe('text-[#7743CE]');
  });

  test('text-decoration-color', () => {
    expect(color(['text-decoration-color', '#e2e8f0'])).toBe(
      'decoration-slate-200',
    );
  });

  test('text color var', () => {
    expect(color(['text-decoration-color', 'var(--test, #e2e8f0)'])).toBe(
      'decoration-slate-200',
    );
  });

  test('text color arbitrary', () => {
    expect(color(['text-decoration-color', '#7743CE'])).toBe(
      'decoration-[#7743CE]',
    );
  });

  test('background-color', () => {
    expect(color(['background-color', '#FECDD3'])).toBe('bg-rose-200');
  });

  test('text color var', () => {
    expect(color(['background-color', 'var(--test, #FECDD3)'])).toBe(
      'bg-rose-200',
    );
  });

  test('text color arbitrary', () => {
    expect(color(['background-color', '#7743CE'])).toBe('bg-[#7743CE]');
  });

  test('border-color', () => {
    expect(color(['border-color', '#FECDD3'])).toBe('border-rose-200');
  });

  test('accent-color', () => {
    expect(color(['accent-color', '#FECDD3'])).toBe('accent-rose-200');
  });

  test('caret-color', () => {
    expect(color(['caret-color', '#FECDD3'])).toBe('caret-rose-200');
  });
});
