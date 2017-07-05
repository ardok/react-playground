import isEqualWith from 'lodash.isequalwith';

export function equalNoFunction(objValue, othValue) {
  if (typeof objValue === 'function' && typeof othValue === 'function') {
    // Always assume they're equal
    return true;
  }

  // Use original method from lodash
  return undefined;
}

export function isEqualNoFunction(objValue, othValue) {
  return isEqualWith(objValue, othValue, equalNoFunction);
}
