export function undefinedToNull<T>(param: T) {
  if (typeof param === 'undefined') return null;
  return param as Exclude<T, undefined>;
}
