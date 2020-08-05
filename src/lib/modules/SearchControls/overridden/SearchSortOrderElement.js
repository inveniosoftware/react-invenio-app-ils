import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

export const SearchSortOrderElement = ({
  currentSortOrder,
  options,
  onValueChange,
}) => {
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value };
  });
  return (
    <Dropdown
      options={_options}
      selection
      className="link item"
      value={currentSortOrder}
      onChange={(e, { value }) => onValueChange(value)}
    />
  );
};

SearchSortOrderElement.propTypes = {
  currentSortOrder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
