import { varParser } from './var.mjs';
import { context } from '../context.mjs';
import { assertNever } from '../../utils/index.mjs';
import { isCSSFunc, isVAR } from '../../utils/validator.mjs';

export function unitProcess(
  value: string,
  { model }: { model: 'color' | 'length' | 'var' },
) {
  if (isCSSFunc(value)) {
    return value.replaceAll(/\s/g, '');
  }

  if (isVAR(value)) {
    const [keys, val] = varParser(value);

    if (val) {
      return val;
    }

    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];

      const val = context.varMap[key];

      if (val) {
        return val;
      }

      context.unresolved_vars.push(key);
    }

    const key = keys[0];

    switch (model) {
      case 'color':
        return `color:var(--${key})`;
      case 'length':
        return `length:var(--${key})`;
      case 'var':
        return key;
      default:
        assertNever(model);
        return '';
    }
  }

  return value;
}
