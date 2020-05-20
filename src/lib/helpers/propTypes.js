/**
 * until https://github.com/facebook/prop-types/issues/263 fixed
 */
import PropTypes from "prop-types";

export function conditionalPropType(
  condition,
  message,
  fullMessageOverride = false
) {
  if (typeof condition !== "function")
    throw new TypeError(
      `Wrong argument type 'condition' supplied to 'conditionalPropType'. Expected 'function', got '${typeof condition}'.`
    );

  return function(props, propName, componentName) {
    const conditionResult = condition(props, propName, componentName);
    if (conditionResult) {
      const parsedMessage =
        typeof message === "function"
          ? message(conditionResult, props, propName, componentName)
          : message;
      const defaultMessage = `Invalid prop '${propName}' '${props[propName]}' supplied to '${componentName}'. ${parsedMessage}`;
      return new Error(fullMessageOverride ? parsedMessage : defaultMessage);
    }
  };
}

export function strictProps(propTypes) {
  if (typeof propTypes !== "object") {
    throw new TypeError(
      `Wrong argument type 'propTypes' supplied to 'forbidExtraProps'. Expected 'object', got '${typeof propTypes}'.`
    );
  }

  const allowedPropKeys = Object.keys(propTypes);

  return {
    ...propTypes,
    _extraPropsCheck: conditionalPropType(
      props => {
        const unknownProps = Object.keys(props).filter(
          p => !allowedPropKeys.includes(p)
        );
        return unknownProps.length > 0 ? unknownProps : false;
      },
      (unknownProps, _p, _pN, componentName) =>
        `Unknown props found in component '${componentName}': ${unknownProps.join(
          ", "
        )}.`,
      true
    )
  };
}
