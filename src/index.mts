import kebabcase from 'lodash.kebabcase';

import { rulers } from './transform/rules/index.mjs';

import type * as CSS from 'csstype';
import { getTailwindBy, removeExtraSpace } from './utils/index.mjs';

import type { CamelCaseToKebabCase } from './utils/type.mjs';
import { twMerge } from 'tailwind-merge';

const gather = (decl: [string, string], i = 0): string | false => {
  if (i === rulers.length) {
    return false;
  }

  const convert = rulers[i];

  const res = convert(decl);

  if (!res) {
    return gather(decl, i + 1);
  }

  return res;
};

type KebabCaseProperties<T> = {
  [K in keyof T as CamelCaseToKebabCase<K>]: T[K];
};

export function gen(css: CSS.Properties | KebabCaseProperties<CSS.Properties>) {
  const success: string[] = [];
  const failed: string[] = [];

  const realCss = Object.fromEntries(
    Object.entries(css).map(([k, v]) => [
      kebabcase(k),
      removeExtraSpace(v.replace('\n', '')),
    ]),
  );

  const { tailwind, useful } = getTailwindBy(realCss);

  if (tailwind.length) {
    success.push(...tailwind);
  }

  if (useful) {
    Object.entries(useful).forEach(([k, v]: [string, string]) => {
      const res = gather([k, v]);

      if (res) {
        success.push(res);
      } else {
        failed.push(k);
      }
    });
  }

  return {
    success: twMerge(success),
    failed,
  };
}
