export const keys = <T extends object>(object: T): Array<keyof T> =>
  Object.keys(object) as Array<keyof T>;
