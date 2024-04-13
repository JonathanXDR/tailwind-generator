import { getTailwindBy, removeSpace } from '../../utils/index.mjs';
import { isString, isVAR } from '../../utils/validator.mjs';
import { try2HEX, try2RGB } from '../functions.mjs';

const map: Record<string, string | { key: string; model: 'hex' | 'rgb' }> = {
  color: {
    key: 'text',
    model: 'rgb',
  },
  'text-decoration-color': {
    key: 'decoration',
    model: 'hex',
  },
  'background-color': {
    key: 'bg',
    model: 'rgb',
  },
  'border-color': {
    key: 'border',
    model: 'rgb',
  },
  'outline-color': {
    key: 'outline',
    model: 'hex',
  },
  'accent-color': {
    key: 'accent',
    model: 'hex',
  },
  'caret-color': {
    key: 'caret',
    model: 'hex',
  },
  // #region SVG
  fill: {
    key: 'fill',
    model: 'hex',
  },
  stroke: {
    key: 'stroke',
    model: 'hex',
  },
  // #endregion
};

const convertorMap = {
  rgb: (val: string) => try2RGB(val).replaceAll(/\s/g, ''),
  hex: try2HEX,
};

const attrs = Object.keys(map);

export function color([key, value]: [string, string]) {
  if (!attrs.includes(key)) {
    return false;
  }

  const config = map[key];
  const convertor = isString(config)
    ? convertorMap.rgb
    : convertorMap[config.model];
  const realVal = convertor(value);

  const { tailwind, useful } = getTailwindBy({
    [key]: realVal.replaceAll(',', ' '),
  });

  if (!useful) {
    return tailwind.join(' ');
  }

  const prefix = isString(config) ? config : config.key;

  return `${prefix}-[${
    isVAR(value)
      ? realVal
      : value
          .split(/[\s\/]/)
          .filter(Boolean)
          .join(',')
  }]`;
}
