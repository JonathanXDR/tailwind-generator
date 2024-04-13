export interface Context {
  unresolved_vars: string[];
  varMap: Record<string, string>;
}

export const context: Context = {
  unresolved_vars: [],
  varMap: {},
};
