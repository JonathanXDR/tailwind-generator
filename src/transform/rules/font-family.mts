import { getTailwindBy } from '../../utils/index.mjs';
import { splitBySpaces } from '../parsers/split.mjs';

export function fontFamily([key, value]: [string, string]) {
  if (key !== 'font-family') {
    return false;
  }

  const { tailwind, useful } = getTailwindBy({
    [key]: value,
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  return `font-[${splitBySpaces(value)
    .map((v) => {
      return v.replaceAll(/\s/g, '_');
    })
    .join('')}]`;
}
