export function varParser(
  target: string,
  keys: string[] = [],
  val?: string,
): [string[], string | undefined] {
  const res = Array.from(
    target.replaceAll(/\s/g, '').matchAll(/var\(--([^\,\)]+)\,?([^\)]*)\)?/g),
  );

  if (!res.length) {
    return [keys, val];
  }

  const [[, key, value]] = res;

  if (!value) {
    return [[...keys, key], undefined];
  }

  return varParser(value, [...keys, key], value);
}
