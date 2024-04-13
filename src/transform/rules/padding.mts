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
        [[`${prefix}padding`], `${prefix}p`],
        [[`${prefix}padding-left`], `${prefix}pl`],
        [[`${prefix}padding-right`], `${prefix}pr`],
        [[`${prefix}padding-top`], `${prefix}pt`],
        [[`${prefix}padding-bottom`], `${prefix}pb`],
        [[`${prefix}padding-inline-start`], `${prefix}ps`],
        [[`${prefix}padding-inline-end`], `${prefix}pe`],
      ];
    })
    .flat(1),
);

const attrs = Object.keys(map);

export function padding([key, value]: [string, string]) {
  if (!attrs.includes(key)) {
    return false;
  }

  const first = key.split('-')[0];
  const prefix = first === 'padding' ? '' : `${first}-`;

  const list = splitBySpaces(value).filter((v) => v !== ' ');

  if (key !== `${prefix}padding`) {
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
      [`${prefix}padding`]: try2REM(list[0]),
    };
    valMap = {
      [`${prefix}padding`]: getVal(0),
    };
  } else if (list.length === 2) {
    obj = {
      [`${prefix}padding-top`]: try2REM(list[0]),
      [`${prefix}padding-right`]: try2REM(list[1]),
      [`${prefix}padding-bottom`]: try2REM(list[0]),
      [`${prefix}padding-left`]: try2REM(list[1]),
    };
    valMap = {
      [`${prefix}padding-top`]: getVal(0),
      [`${prefix}padding-right`]: getVal(1),
      [`${prefix}padding-bottom`]: getVal(0),
      [`${prefix}padding-left`]: getVal(1),
    };
  } else if (list.length === 3) {
    obj = {
      [`${prefix}padding-top`]: try2REM(list[0]),
      [`${prefix}padding-right`]: try2REM(list[1]),
      [`${prefix}padding-bottom`]: try2REM(list[2]),
      [`${prefix}padding-left`]: try2REM(list[1]),
    };
    valMap = {
      [`${prefix}padding-top`]: getVal(0),
      [`${prefix}padding-right`]: getVal(1),
      [`${prefix}padding-bottom`]: getVal(2),
      [`${prefix}padding-left`]: getVal(1),
    };
  } else if (list.length === 4) {
    obj = {
      [`${prefix}padding-top`]: try2REM(list[0]),
      [`${prefix}padding-right`]: try2REM(list[1]),
      [`${prefix}padding-bottom`]: try2REM(list[2]),
      [`${prefix}padding-left`]: try2REM(list[3]),
    };
    valMap = {
      [`${prefix}padding-top`]: getVal(0),
      [`${prefix}padding-right`]: getVal(1),
      [`${prefix}padding-bottom`]: getVal(2),
      [`${prefix}padding-left`]: getVal(3),
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
