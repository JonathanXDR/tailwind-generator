import { getTailwindBy } from '../../utils/index.mjs';
import { try2REM, tryGetVal } from '../functions.mjs';

export function flexBasis([key, value]: [string, string]) {
  if (key !== 'flex-basis') {
    return false;
  }

  const { tailwind, useful } = getTailwindBy({
    [key]: try2REM(value),
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  return `basis-[${tryGetVal(value)}]`;
}
