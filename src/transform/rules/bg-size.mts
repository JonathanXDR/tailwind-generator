import { getTailwindBy } from '../../utils/index.mjs';
import { tryGetVal } from '../functions.mjs';

export function bgSize([key, value]: [string, string]) {
  if (key !== 'background-size') {
    return false;
  }

  const { tailwind, useful } = getTailwindBy({
    [key]: value,
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  const realVal = value.split(' ').join('_');

  return `bg-[length:${tryGetVal(realVal)}]`;
}
