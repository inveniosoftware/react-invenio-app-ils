import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _get from 'lodash/get';

/**
 * @callback customizedValueFunction
 * @param {*} value the value from the found property
 * @param {object} document origin object that was passed to the extractAndCreate function
 */

/**
 * @param {{mappings: [string , string, customizedValueFunction|undefined][], origin: object}} args
 *        all args are required
 *
 *
 * @description
 * Function that checks an array of arrays containing instructions in the following format [propertyToCheck, pathToPutPropertyValue, a function to customize the value of the property]
 *@description
 * it will check if the property (can be nested using the lodash dot syntax) exists in the origin object and if so it will set the property value on the chosen path in the destinationObject
 */

export default function mapFields({ origin, mappings }) {
  const destination = {};

  const argsAreEmpty = _isEmpty(origin) || _isEmpty(mappings);

  if (argsAreEmpty) return;

  mappings.forEach((map) => {
    const [propertyKey, destinationPath, customizedValueFunction] = map;
    const valueOfPropertyKey = _get(origin, propertyKey);
    const propertyExists = !!valueOfPropertyKey;

    if (propertyExists) {
      const valueToSet = customizedValueFunction
        ? customizedValueFunction(valueOfPropertyKey, origin)
        : valueOfPropertyKey;

      _set(destination, destinationPath, valueToSet);
    }
  });

  return destination;
}
