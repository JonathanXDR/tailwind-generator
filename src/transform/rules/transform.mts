import { twMerge } from 'tailwind-merge';
import { getTailwindBy, removeSpace } from '../../utils/index.mjs';
import { noZero, try2REM, tryGetVal } from '../functions.mjs';
import { splitByCommas, splitBySpaces } from '../parsers/split.mjs';

const pick = (val: string) => {
  const matches = [...val.matchAll(/([^\(]+)\(([^\)]+)\)/g)];

  return [matches[0]?.[1], matches[0]?.[2]];
};

const map: Record<
  string,
  {
    isPlane?: boolean;
    key: string;
    prop: string;
    convertor: (val: string) => string;
  }
> = {
  scale: {
    key: 'scale',
    prop: 'scale',
    isPlane: true,
    convertor(val) {
      const tokens = splitByCommas(removeSpace(val));

      return tokens.map((v) => noZero(v)).join(' ');
    },
  },
  scaleX: {
    prop: 'scaleX',
    key: 'scale-x',
    convertor: noZero,
  },
  scaleY: {
    prop: 'scaleY',
    key: 'scale-y',
    convertor: noZero,
  },
  rotate: {
    key: 'rotate',
    prop: 'rotate',
    convertor: (v: string) => v,
  },
  translateX: {
    prop: 'translateX',
    key: 'translate-x',
    convertor: try2REM,
  },
  translateY: {
    prop: 'translateY',
    key: 'translate-y',
    convertor: try2REM,
  },
  translate: {
    key: 'translate',
    prop: 'translate',
    isPlane: true,
    convertor(val) {
      const tokens = splitByCommas(removeSpace(val));

      return tokens.join(' ');
    },
  },
  skewX: {
    prop: 'skewX',
    key: 'skew-x',
    convertor: (v: string) => v,
  },
  skewY: {
    prop: 'skewY',
    key: 'skew-y',
    convertor: (v: string) => v,
  },
  skew: {
    key: 'skew',
    prop: 'skew',
    isPlane: true,
    convertor(val) {
      const tokens = splitByCommas(removeSpace(val));

      return tokens.join(' ');
    },
  },
};

export function transform([key, value]: [string, string]) {
  if (key !== 'transform') {
    return false;
  }

  const tokens = splitBySpaces(value);

  const res: string[] = [];

  tokens.forEach((token) => {
    const [k, v] = pick(token);

    if (!k || !v) {
      return;
    }

    const config = map[k];

    if (!config) {
      return;
    }

    if (!config.isPlane) {
      const { tailwind, useful } = getTailwindBy({
        [key]: `${config.prop}(${try2REM(config.convertor(v))})`,
      });

      if (!useful) {
        res.push(tailwind.join(' '));
      } else {
        res.push(`${config.key}-[${tryGetVal(v)}]`);
      }

      return;
    }

    const xy = splitBySpaces(config.convertor(v));

    if (xy.length === 1) {
      const { tailwind, useful } = getTailwindBy({
        [key]: `${config.prop}(${try2REM(xy[0])})`,
      });

      if (!useful) {
        res.push(tailwind.join(' '));
      } else {
        res.push(`${config.key}-[${v}]`);
      }

      return;
    }

    res.push(
      ...xy
        .map((v, i) =>
          getTailwindBy({
            [key]: `${config.prop}${i === 0 ? 'X' : 'Y'}(${try2REM(v)})`,
          }),
        )
        .map(({ tailwind, useful }, i) => {
          if (!useful) {
            return tailwind;
          }

          const _k = `${config.key}-${i === 0 ? 'x' : 'y'}`;

          return `${_k}-[${tryGetVal(xy[i])}]`;
        })
        .flat(),
    );
  });

  return twMerge(...res);
}
