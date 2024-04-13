import { getTailwindBy, removeSpace } from '../../utils/index.mjs';

export function transitionProperty([key, value]: [string, string]) {
  if (key !== 'transition-property') {
    return false;
  }

  if (value === 'none') {
    return 'transition-none';
  }

  const { tailwind, useful } = getTailwindBy({
    'transition-duration': '150ms',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-property': value,
  });

  if (useful) {
    return `transition-[${removeSpace(value)}]`;
  }

  return tailwind.join(' ');
}
