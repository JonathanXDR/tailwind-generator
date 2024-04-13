/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This file is used to change cjs/** files from .js to .mjs, and update the import source.
 */
// @ts-check
// TODO: https://github.com/nodejs/cjs-module-lexer/issues/2 require 不好做静态分析，先处理文件，再 build
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { init, parse } from 'es-module-lexer';
import { sync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  fs.cpSync(
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../copy'),
    { recursive: true },
  );

  console.log('Convert copy/**/*.mjs to copy/**/*.cjs');
  await init;
  sync(path.resolve(__dirname, '../copy/**/*.mts')).forEach((file) => {
    const source = fs.readFileSync(file, 'utf8');
    const [imports] = parse(source);
    const sb = source.split('');
    imports
      .filter((d) => d.n?.startsWith('./') || d.n?.startsWith('../'))
      .reverse()
      .forEach((d) => {
        sb.splice(d.s, d.e - d.s, `${d.n?.replace('.mjs', '')}.cjs`);
      });
    const targetFilename = file.replace(/\.mts$/, '.cts');
    fs.writeFile(targetFilename, sb.join(''), () => {
      try {
        fs.unlinkSync(file);
      } catch (e) {
        console.error(`Remove file (${file}) failed ❌`);
        console.error(e);
      }
    });
  });
}

main();
