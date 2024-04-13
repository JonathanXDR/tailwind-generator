# tailwind-generator

Convert CSS declarations into TailwindCSS class names

[![codecov](https://codecov.io/gh/shiyangzhaoa/tailwind-generator/graph/badge.svg?token=8XKK9DE64P)](https://codecov.io/gh/shiyangzhaoa/tailwind-generator)
[![shields](https://img.shields.io/npm/dm/tailwind-generator?style=flat-square)](https://www.npmjs.com/package/tailwind-generator)

⚠️ TailwindCSS version support: >= 3.4.3

## Example

Base:

```ts
import { gen } from 'tailwind-generator';

const result = gen({
  'align-items': 'flex-start',
  background: '#FFF',
  display: 'flex',
  'flex-direction': 'column',
  gap: '16px',
  padding: '24px',
  width: '1152px',
});

console.log(result);

// {
//   success: 'items-start flex flex-col bg-white gap-[16px] p-6 w-[1152px]',
//   failed: [],
// }
```

CSS Variables:

```ts
import { gen } from 'tailwind-generator';

const result = gen(
  {
    height: 'var(--var-height)',
  },
  {
    'var-height': '12px',
  },
);

console.log(result);

// {
//   success: 'h-3',
//   failed: [],
// }
```
