import { twMerge } from 'tailwind-merge';

import { getTailwindBy } from '../../utils/index.mjs';
import { error } from '../../utils/logger.mjs';
import { try2REM, tryGetVal } from '../functions.mjs';
import { splitBySpaces } from '../parsers/split.mjs';
import { isVAR } from '../../utils/validator.mjs';

const map: Record<string, string> = Object.fromEntries(
  ['', 'scroll-']
    .map((prefix) => {
      return [
        [[`${prefix}margin`], `${prefix}m`],
        [[`${prefix}margin-left`], `${prefix}ml`],
        [[`${prefix}margin-right`], `${prefix}mr`],
        [[`${prefix}margin-top`], `${prefix}mt`],
        [[`${prefix}margin-bottom`], `${prefix}mb`],
        [[`${prefix}margin-inline-start`], `${prefix}ms`],
        [[`${prefix}margin-inline-end`], `${prefix}me`],
      ];
    })
    .flat(1),
);

const attrs = Object.keys(map);

export function margin([key, value]: [string, string]) {
  if (!attrs.includes(key)) {
    return false;
  }

  const first = key.split('-')[0];
  const prefix = first === 'margin' ? '' : `${first}-`;

  const list = splitBySpaces(value).filter((v) => v !== ' ');

  if (key !== `${prefix}margin`) {
    if (list.length !== 1) {
      error(`${key}: ${value} is invalid.`);

      return false;
    }

    const { tailwind } = getTailwindBy({
      [key]: try2REM(value),
    });

    return tailwind.length ? tailwind.join(' ') : `${map[key]}-[${value}]`;
  }

  let obj: Record<string, string> = {};
  let valMap: Record<string, string> = {};
  const getVal = (i: number) => (isVAR(list[i]) ? tryGetVal(list[i]) : list[i]);

  if (list.length === 1) {
    obj = {
      [`${prefix}margin`]: try2REM(list[0]),
    };
    valMap = {
      [`${prefix}margin`]: getVal(0),
    };
  } else if (list.length === 2) {
    obj = {
      [`${prefix}margin-top`]: try2REM(list[0]),
      [`${prefix}margin-right`]: try2REM(list[1]),
      [`${prefix}margin-bottom`]: try2REM(list[0]),
      [`${prefix}margin-left`]: try2REM(list[1]),
    };
    valMap = {
      [`${prefix}margin-top`]: getVal(0),
      [`${prefix}margin-right`]: getVal(1),
      [`${prefix}margin-bottom`]: getVal(0),
      [`${prefix}margin-left`]: getVal(1),
    };
  } else if (list.length === 3) {
    obj = {
      [`${prefix}margin-top`]: try2REM(list[0]),
      [`${prefix}margin-right`]: try2REM(list[1]),
      [`${prefix}margin-bottom`]: try2REM(list[2]),
      [`${prefix}margin-left`]: try2REM(list[1]),
    };
    valMap = {
      [`${prefix}margin-top`]: getVal(0),
      [`${prefix}margin-right`]: getVal(1),
      [`${prefix}margin-bottom`]: getVal(2),
      [`${prefix}margin-left`]: getVal(1),
    };
  } else if (list.length === 4) {
    obj = {
      [`${prefix}margin-top`]: try2REM(list[0]),
      [`${prefix}margin-right`]: try2REM(list[1]),
      [`${prefix}margin-bottom`]: try2REM(list[2]),
      [`${prefix}margin-left`]: try2REM(list[3]),
    };
    valMap = {
      [`${prefix}margin-top`]: getVal(0),
      [`${prefix}margin-right`]: getVal(1),
      [`${prefix}margin-bottom`]: getVal(2),
      [`${prefix}margin-left`]: getVal(3),
    };
  } else {
    error(`${key}: ${value} is invalid.`);

    return false;
  }

  const { tailwind, useful } = getTailwindBy(obj);

  return twMerge(
    ...tailwind,
    ...Object.entries(useful || {}).map(([k]) => {
      return `${map[k]}-[${valMap[k]}]`;
    }),
  );
}
