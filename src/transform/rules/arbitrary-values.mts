import { getTailwindBy } from '../../utils/index.mjs';
import { isString } from '../../utils/validator.mjs';
import { try2REM } from '../functions.mjs';
import { splitBySpaces } from '../parsers/split.mjs';

const map: Record<
  string,
  string | { key: string; insert?: boolean; model?: 'rem' | 'rem_no_zero' }
> = {
  'aspect-ratio': {
    key: 'aspect',
    insert: false,
  },
  'grid-template-columns': 'grid-cols',
  'grid-column': 'col',
  'grid-template-rows': 'grid-rows',
  'grid-row': 'row',
  'grid-auto-columns': 'auto-cols',
  'grid-auto-rows': 'auto-rows',
  gap: 'gap',
  'list-style-type': 'list',
  'background-position': 'bg',
  'background-image': 'bg',
  opacity: 'opacity',
  'border-radius': {
    key: 'rounded',
    model: 'rem',
    insert: true,
  },
  'border-start-start-radius': {
    key: 'rounded-ss',
    model: 'rem',
    insert: true,
  },
  'border-start-end-radius': {
    key: 'rounded-se',
    model: 'rem',
    insert: true,
  },
  'border-end-end-radius': {
    key: 'rounded-ee',
    model: 'rem',
    insert: true,
  },
  'border-end-start-radius': {
    key: 'rounded-es',
    model: 'rem',
    insert: true,
  },
  'border-top-left-radius': {
    key: 'rounded-tr',
    model: 'rem',
    insert: true,
  },
  'border-bottom-right-radius': {
    key: 'rounded-br',
    model: 'rem',
    insert: true,
  },
  'border-bottom-left-radius': {
    key: 'rounded-bl',
    model: 'rem',
    insert: true,
  },
  'transform-origin': {
    key: 'origin',
    insert: true,
  },
  cursor: {
    key: 'cursor',
    insert: true,
  },
  'will-change': {
    key: 'will-change',
    insert: false,
  },
  'transition-duration': 'duration',
  'transition-timing-function': 'ease',
  'transition-delay': 'delay',
  'z-index': 'z',
  content: 'content',
};

const convertorMap = {
  rem: try2REM,
  rem_no_zero: (val: string) => try2REM(val, true),
};

const attrs = Object.keys(map);

export function arbitraryValues([key, value]: [string, string]) {
  if (!attrs.includes(key)) {
    return false;
  }

  const config = map[key];

  const convertor =
    isString(config) || !config.model
      ? (v: string) => v
      : convertorMap[config.model];

  const { tailwind, useful } = getTailwindBy({
    [key]: convertor(value),
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  const prefix = isString(config) ? config : config.key;
  const tokens = splitBySpaces(convertor(value)).map((item) => {
    return item.replaceAll(/\s/g, '');
  });
  const realVal =
    isString(config) || config.insert ? tokens.join('_') : tokens.join('');

  return `${prefix}-[${realVal}]`;
}
