import { background } from "../../../src/transform/rules/background.mjs";

describe('background', () => {
  test('not match', () => {
    expect(background(['margin-left', '12px'])).toBe(false);
  });

  test('base', () => {
    expect(background(['background', 'green'])).toBe('bg-[green]');
  });

  test('color arbitrary', () => {
    expect(background(['background', 'var(--color, #ccc)'])).toBe('bg-[rgb(204,204,204)]');
  });

  test('case1', () => {
    expect(background(['background', 'content-box radial-gradient(crimson, skyblue)'])).toBe('bg-clip-content bg-[radial-gradient(crimson,skyblue)]');
  });

  test('case2', () => {
    expect(background(['background', 'no-repeat url("../../media/examples/lizard.png")'])).toBe('bg-no-repeat bg-[url("../../media/examples/lizard.png")]');
  });

  test('case3', () => {
    expect(background(
      ['background', 'left 5% / 15% 60% repeat-x url("../../media/examples/star.png")']
    )).toBe('bg-[left_top_5%] bg-repeat-x bg-[length:15%_60%] bg-[url("../../media/examples/star.png")]');
  });

  test('case4', () => {
    expect(background(
      [
        'background',
        `center / contain no-repeat url("../../media/examples/firefox-logo.svg"), #eee 35% url("../../media/examples/lizard.png")`
      ],
    )).toBe('bg-[#eee] bg-center bg-no-repeat bg-[length:contain_35%] bg-[url("../../media/examples/firefox-logo.svg")_url("../../media/examples/lizard.png")]');
  });
})
