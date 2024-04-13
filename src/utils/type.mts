export type CamelCaseToKebabCase<S extends string | number | symbol> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? '-'
        : ''}${Lowercase<T>}${CamelCaseToKebabCase<U>}`
    : S;
