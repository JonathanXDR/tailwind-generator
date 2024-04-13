import Color from 'color';

import { unitProcess } from './parsers/unit.mjs';
import {
  isColor,
  isHex,
  isPX,
  isREM,
  isRGB,
  isVAR,
} from '../utils/validator.mjs';

const ignoredValue = ['0em', '0ex', '0ch', '0rem', '0vw', '0vh', '0%', '0px'];

export function px2rem(value: string, noZero = false, conversionFactor = 16) {
  if (ignoredValue.includes(value)) {
    return '0px';
  }

  if (value === '1px') {
    return '1px';
  }

  const numericVal = parseFloat(value.split('px')[0]);

  const realVal = numericVal / conversionFactor;

  if (!noZero) {
    return `${realVal}rem`;
  }

  return `${String(realVal).replace(/^0/, '')}rem`;
}

export function rem2px(value: string, conversionFactor = 16) {
  if (ignoredValue.includes(value)) {
    return '0px';
  }

  const numericVal = parseFloat(value.split('rem')[0]);

  return `${numericVal * conversionFactor}px`;
}

export function tryGetVal(val: string) {
  return unitProcess(val, { model: 'length' });
}

export function try2PX(val: string) {
  if (isREM(val)) {
    return rem2px(val);
  }

  if (isVAR(val)) {
    return try2PX(unitProcess(val, { model: 'length' }));
  }

  return val;
}

export function try2REM(val: string, noZero = false) {
  if (isPX(val)) {
    return px2rem(val, noZero);
  }

  if (isVAR(val)) {
    return try2REM(unitProcess(val, { model: 'length' }));
  }

  return val;
}

export function formatValue(val: string) {
  return val
    .split('\n')
    .join('')
    .split(' ')
    .filter((v) => v === ' ')
    .join(' ');
}

export function try2RGB(val: string) {
  if (isHex(val) || isRGB(val)) {
    return Color(val).rgb().string();
  }

  if (isVAR(val)) {
    return try2RGB(unitProcess(val, { model: 'color' }));
  }

  return val;
}

export function try2HEX(val: string) {
  if (isColor(val)) {
    return Color(val).hex().toLowerCase();
  }

  if (isVAR(val)) {
    return try2HEX(unitProcess(val, { model: 'color' }));
  }

  return val;
}

export function noZero(value: string) {
  let realVal: number;

  if (value.endsWith('%')) {
    realVal = parseFloat(value) / 100;
  } else {
    realVal = parseFloat(value);
  }

  if (Number.isNaN(realVal)) {
    return value;
  }

  if (realVal < 1) {
    return String(realVal).replace(/^0/, '');
  }

  return String(realVal);
}
