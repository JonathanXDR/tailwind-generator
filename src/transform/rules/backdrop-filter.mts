/**
 * base on ./filter.mts
 */

import { twMerge } from 'tailwind-merge';
import { getTailwindBy } from '../../utils/index.mjs';
import { noZero, try2PX } from '../functions.mjs';
import { splitBySpaces } from '../parsers/split.mjs';

const pick = (val: string) => {
  const matches = [...val.matchAll(/([^\(]+)\(([^\)]+)\)/g)];

  return [matches[0]?.[1], matches[0]?.[2]];
};

const map: Record<string, { key: string; convertor: (val: string) => string }> =
  {
    blur: {
      key: 'blur',
      convertor: try2PX,
    },
    brightness: {
      key: 'brightness',
      convertor: noZero,
    },
    contrast: {
      key: 'contrast',
      convertor: noZero,
    },
    grayscale: {
      key: 'grayscale',
      convertor: (v: string) => v,
    },
    'hue-rotate': {
      key: 'hue-rotate',
      convertor: (v: string) => v,
    },
    invert: {
      key: 'invert',
      convertor: (v: string) => v,
    },
    opacity: {
      key: 'opacity',
      convertor: (v: string) => v,
    },
    saturate: {
      key: 'saturate',
      convertor: noZero,
    },
    sepia: {
      key: 'sepia',
      convertor: (v: string) => v,
    },
    url: {
      key: 'url',
      convertor: (v: string) => v,
    },
  };

export function backdropFilter([key, value]: [string, string]) {
  if (key !== 'backdrop-filter') {
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

    const { convertor } = map[k];

    const { tailwind, useful } = getTailwindBy({
      [key]: `${k}(${convertor(v)})`,
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
    `[backdrop-filter:${unresolved
      .map((token) => {
        const [k, v] = pick(token);

        return `${k}(${v})`;
      })
      .join('_')}]`,
  );
}
