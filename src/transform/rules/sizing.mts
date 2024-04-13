import { getTailwindBy } from '../../utils/index.mjs';
import { isString } from '../../utils/validator.mjs';
import { try2PX, try2REM, tryGetVal } from '../functions.mjs';

const map: Record<
  string,
  string | { key: string; model: 'px' | 'rem' | 'rem_no_zero' }
> = {
  'width': 'w',
  'min-width': 'min-w',
  'max-width': 'max-w',
  'height': 'h',
  'min-height': 'min-h',
  'max-height': 'max-h',
  'font-size': {
    key: 'text',
    model: 'rem_no_zero',
  },
  'font-weight': 'font',
  'letter-spacing': 'tracking',
  'line-height': {
    key: 'leading',
    model: 'rem_no_zero',
  },
  'text-underline-offset': {
    key: 'underline-offset',
    model: 'px',
  },
  'vertical-align': 'align',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  'inset-inline-start': 'start',
  'inset-inline-end': 'end',
  'border-width': {
    key: 'border',
    model: 'px',
  },
  'border-inline-start-width': {
    key: 'border-s',
    model: 'px',
  },
  'border-inline-end-width': {
    key: 'border-e',
    model: 'px',
  },
  'border-top-width': {
    key: 'border-t',
    model: 'px',
  },
  'border-right-width': {
    key: 'border-r',
    model: 'px',
  },
  'border-bottom-width': {
    key: 'border-b',
    model: 'px',
  },
  'border-left-width': {
    key: 'border-l',
    model: 'px',
  },
  'outline-width': {
    key: 'outline',
    model: 'px',
  },
  'outline-offset': {
    key: 'outline-offset',
    model: 'px',
  },
  'stroke-width': {
    key: 'stroke',
    model: 'px',
  },
};
const convertorMap = {
  'px': try2PX,
  'rem': try2REM,
  'rem_no_zero': (val: string) => try2REM(val, true),
};

const attrs = Object.keys(map);

export function sizing([key, value]: [string, string]) {
  if (!attrs.includes(key)) {
    return false;
  }

  const config = map[key];
  const convertor = isString(config)
    ? convertorMap.rem
    : convertorMap[config.model];

  const { tailwind, useful } = getTailwindBy({
    [key]: convertor(value),
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  const prefix = isString(config) ? config : config.key;

  return `${prefix}-[${tryGetVal(value)}]`;
}
