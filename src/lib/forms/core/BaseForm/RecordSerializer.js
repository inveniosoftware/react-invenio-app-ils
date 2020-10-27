import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';

/**
 * Remove empty fields from object
 * @method
 * @param {object} obj - potentially empty object
 */
export const removeEmptyValues = obj => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && _isArray(val)) {
      val.forEach((elem, index) => {
        if (_isEmpty(elem)) {
          val.splice(index, 1);
        }
      });
      if (_isEmpty(val) || val.includes(undefined)) {
        obj[key] = undefined;
      } else {
        removeEmptyValues(val);
      }
    } else if (val && _isObject(val)) {
      removeEmptyValues(val);
      if (Object.entries(val).every(([k, v]) => v === undefined)) {
        obj[key] = undefined;
      }
    } else if (val === '') obj[key] = undefined;
  });
};
