import { getTailwindBy } from '../../utils/index.mjs';

export function listStyleImage([key, value]: [string, string]) {
  if (key !== 'list-style-image') {
    return false;
  }

  const { tailwind, useful } = getTailwindBy({
    [key]: value,
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  return `list-image-[${value.replaceAll(/[\'\"\s]/g, '')}]`;
}
