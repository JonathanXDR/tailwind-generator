import { error } from 'console';
import { splitBySpaces } from '../parsers/split.mjs';
import { getTailwindBy } from '../../utils/index.mjs';
import { try2REM, tryGetVal } from '../functions.mjs';

export function borderSpacing([key, value]: [string, string]) {
  if (key !== 'border-spacing') {
    return false;
  }

  const tokens = splitBySpaces(value);
  let x: string;
  let y: string;

  if (tokens.length === 1) {
    x = y = tokens[0];
  } else if (tokens.length === 2) {
    x = tokens[0];
    y = tokens[1];
  } else {
    error(`${key}: ${value} is invalid.`);

    return false;
  }

  const xrem = try2REM(x);
  const yrem = try2REM(y);

  const { tailwind, useful } = getTailwindBy({
    [key]: [xrem, yrem].join(' '),
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  if (xrem === yrem) {
    return `border-spacing-[${tryGetVal(x)}]`;
  }

  return [
    `border-spacing-x-[${tryGetVal(x)}]`,
    `border-spacing-y-[${tryGetVal(y)}]`,
  ].join(' ');
}
