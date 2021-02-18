import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';

/**
 * Remove all empty values recursively
 * @param {*} object the input object
 */
export const removeEmptyValues = (object) => {
  let pos = -1;
  Object.entries(object).forEach(([k, v]) => {
    const isArray = _isArray(object);
    if (isArray) {
      pos += 1;
    }

    if (_isObject(v)) {
      removeEmptyValues(v);
    }

    const isEmptyObject = _isObject(v) && _isEmpty(v);
    if (isEmptyObject || v === '' || v === null || v === undefined) {
      if (isArray) {
        object.splice(pos, 1);
        // splice changes the size of the array and the `k` var does
        // not take that into account
        pos -= 1;
      } else {
        delete object[k];
      }
    }
  });
  return object;
};
