import { isPercentage } from '../../utils/validator.mjs';
import { splitByCommas, splitBySpaces } from './split.mjs';

export function transitionParser(value: string) {
  const list = splitByCommas(value);

  return list.map((item) => {
    const opts = splitBySpaces(item);
    let name = '';
    let duration = '';
    let func = '';
    let delay = '';

    if (opts.length === 3) {
      if (isPercentage(opts[3])) {
        [name, duration, delay] = opts;
      } else {
        [name, duration, func] = opts;
      }
    } else {
      [name, duration, func, delay] = opts;
    }

    return {
      name,
      duration,
      func,
      delay,
    };
  });
}
