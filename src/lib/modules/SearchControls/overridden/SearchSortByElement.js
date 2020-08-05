import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

export const SortByElement = ({ currentSortBy, options, onValueChange }) => {
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });
  return (
    <Dropdown
      selection
      options={_options}
      value={currentSortBy}
      onChange={(e, { value }) => onValueChange(value)}
    />
  );
};

SortByElement.propTypes = {
  currentSortBy: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
