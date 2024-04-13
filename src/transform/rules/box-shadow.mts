import { removeSpace } from '../../utils/index.mjs';
import { error } from '../../utils/logger.mjs';
import { splitBySpaces } from '../parsers/split.mjs';
import { unitProcess } from '../parsers/unit.mjs';

export function boxShadow([key, value]: [string, string]) {
  if (key !== 'box-shadow') {
    return false;
  }

  const list = splitBySpaces(value).map((item) => {
    return unitProcess(removeSpace(item), { model: 'var' });
  });

  if (list.length <= 1) {
    if (value === 'unset') {
      return 'shadow-none';
    }

    error(`${key}: ${value} is invalid.`);

    return false;
  }

  return `shadow-[${list.join('_')}]`;
}
