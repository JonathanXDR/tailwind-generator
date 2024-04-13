import { twMerge } from 'tailwind-merge';
import { getTailwindBy, removeSpace } from '../../utils/index.mjs';
import { noZero, try2PX } from '../functions.mjs';
import { splitBySpaces } from '../parsers/split.mjs';

const pick = (val: string) => {
  const matches = [...val.matchAll(/([^\(]+)\(([^\)]+)\)/g)];

  return [matches[0]?.[1], matches[0]?.[2]];
};

const map: Record<string, { key: string; convertor: (val: string) => string }> =
  {
    'blur': {
      key: 'blur',
      convertor: try2PX,
    },
    'brightness': {
      key: 'brightness',
      convertor: noZero,
    },
    'contrast': {
      key: 'contrast',
      convertor: noZero,
    },
    // multiple
    'drop-shadow': {
      key: 'drop-shadow',
      convertor: (val: string) => {
        const tokens = splitBySpaces(val);

        return tokens.map((v) => removeSpace(v)).join('_');
      },
    },
    'grayscale': {
      key: 'grayscale',
      convertor: (v: string) => v,
    },
    'hue-rotate': {
      key: 'hue-rotate',
      convertor: (v: string) => v,
    },
    'invert': {
      key: 'invert',
      convertor: (v: string) => v,
    },
    'opacity': {
      key: 'opacity',
      convertor: (v: string) => v,
    },
    'saturate': {
      key: 'saturate',
      convertor: noZero,
    },
    'sepia': {
      key: 'sepia',
      convertor: (v: string) => v,
    },
    'url': {
      key: 'url',
      convertor: (v: string) => v,
    },
  };

export function filter([key, value]: [string, string]) {
  if (key !== 'filter') {
    return false;
  }

  const tokens = splitBySpaces(value);

  const res: string[] = [];

  const unresolved: string[] = [];

  tokens.forEach((token) => {
    const [k, v] = pick(token);

    if (!k || !v) return;

    if (k === 'drop-shadow') {
      unresolved.push(token);

      return;
    }

    const config = map[k];

    const { tailwind, useful } = getTailwindBy({
      [key]: `${config.key}(${config.convertor(v)})`,
    });

    if (!useful) {
      res.push(...tailwind);

      return;
    }

    unresolved.push(token);
  });

  if (unresolved.length === 0) {
    return twMerge(...res);
  }

  return twMerge(
    ...res,
    `[filter:${unresolved
      .map((token) => {
        const [k, v] = pick(token);
        const { convertor } = map[k];

        return `${k}(${convertor(v)})`;
      })
      .join('_')}]`,
  );
}
