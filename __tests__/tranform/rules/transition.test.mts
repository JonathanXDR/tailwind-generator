import { transition } from '../../../src/transform/rules/transition.mjs';

describe('transform', () => {
  test('not match', () => {
    expect(transition(['margin-left', '12px'])).toBe(false);
  });

  test('name | duration', () => {
    expect(transition(['transition', 'margin-right 4s'])).toBe(
      'transition-[margin-right,4s]',
    );
  });

  test('name | duration | delay', () => {
    expect(transition(['transition', 'margin-right 4s 1s'])).toBe(
      'transition-[margin-right,4s,1s]',
    );
  });

  test('name | duration | timing function', () => {
    expect(transition(['transition', 'margin-right 4s ease-in-out'])).toBe(
      'transition-[margin-right,4s,ease-in-out]',
    );
  });

  test('2 properties', () => {
    expect(transition(['transition', 'margin-right 4s, color 1s'])).toBe(
      'transition-[margin-right,4s_color,1s]',
    );
  });
});
