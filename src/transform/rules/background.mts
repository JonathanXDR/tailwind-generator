import { twMerge } from 'tailwind-merge';
import { getTailwindBy } from '../../utils/index.mjs';
import { backgroundParser } from '../parsers/background.mjs';
import { arbitraryValues } from './arbitrary-values.mjs';
import { bgSize } from './bg-size.mjs';
import { color } from './color.mjs';

export function background([key, value]: [string, string]) {
  if (key !== 'background') {
    return false;
  }

  const background = backgroundParser(value);

  const res: string[] = [];

  if (background.attachment.length) {
    res.push(
      ...background.attachment.reduce((acc, cur) => {
        return [
          ...acc,
          ...getTailwindBy({ 'background-attachment': cur }).tailwind,
        ];
      }, [] as string[]),
    );
  }

  if (background.clip) {
    res.push(...getTailwindBy({ 'background-clip': background.clip }).tailwind);
  }

  if (background.color) {
    const val = color(['background-color', background.color]);

    if (val) {
      res.push(val);
    }
  }

  if (background.origin.length) {
    res.push(
      ...background.origin.reduce((acc, cur) => {
        return [
          ...acc,
          ...getTailwindBy({ 'background-origin': cur }).tailwind,
        ];
      }, [] as string[]),
    );
  }

  if (background.position.length !== 0) {
    const val = arbitraryValues([
      'background-position',
      background.position.join(' '),
    ]);

    if (val) {
      res.push(val);
    }
  }

  if (background.repeat.length !== 0) {
    res.push(
      ...background.repeat.reduce((acc, cur) => {
        return [
          ...acc,
          ...getTailwindBy({ 'background-repeat': cur }).tailwind,
        ];
      }, [] as string[]),
    );
  }

  if (background.size.length !== 0) {
    const val = bgSize(['background-size', background.size.join(' ')]);

    if (val) {
      res.push(val);
    }
  }

  if (background.image.length !== 0) {
    const val = arbitraryValues([
      'background-image',
      background.image.join(' '),
    ]);

    if (val) {
      res.push(val);
    }
  }

  return twMerge(res);
}
