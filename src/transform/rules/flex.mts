import { getTailwindBy } from '../../utils/index.mjs';

export function flex([key, value]: [string, string]) {
  if (key !== 'flex') {
    return false;
  }

  const { tailwind, useful } = getTailwindBy({
    [key]: value,
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  return `flex-[${value.split(' ').join('_')}]`;
}
