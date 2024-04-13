import { listStyleImage } from "../../../src/transform/rules/list-style-image.mjs";

describe('list-style-image', () => {
  test('not match', () => {
    expect(listStyleImage(['margin-left', '12px'])).toBe(false);
  });

  test('base', () => {
    expect(listStyleImage(['list-style-image', 'none'])).toBe('list-image-none');
  });

  test('var', () => {
    expect(listStyleImage(['list-style-image', 'url("/img/checkmark.png)'])).toBe('list-image-[url(/img/checkmark.png)]');
  });
});
