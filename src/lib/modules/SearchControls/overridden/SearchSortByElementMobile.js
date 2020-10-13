import PropTypes from 'prop-types';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export const SortByElementMobile = ({
  currentSortBy,
  options,
  onValueChange,
}) => {
  return (
    <Dropdown
      text="Sort"
      size="small"
      pointing="top right"
      className="link item"
      item
    >
      <Dropdown.Menu>
        <Dropdown.Header icon="sort" content="Sort by" />
        {options.map(element => {
          return (
            <Dropdown.Item
              key={element.value}
              value={element.value}
              text={element.text}
              onClick={(e, { value }) => onValueChange(value)}
            />
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

SortByElementMobile.propTypes = {
  currentSortBy: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
