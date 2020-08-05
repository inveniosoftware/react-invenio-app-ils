import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class SearchSortOrderElementMobile extends Component {
  constructor(props) {
    super(props);
    const { currentSortOrder, options, onValueChange } = this.props;
    options.map((element, index) => {
      this.buttons[element.value] = (
        <Button
          icon
          basic
          value={element.value}
          onClick={(e, { value }) =>
            this.sortChangeHandler(onValueChange, currentSortOrder, options)
          }
          key={index}
          className="fs-button-sort-mobile"
        >
          <Icon
            name={
              element.value === 'asc'
                ? 'sort alphabet ascending'
                : 'sort alphabet descending'
            }
          />
        </Button>
      );
      return this.buttons;
    });
  }

  sortChangeHandler = (onValueChange, currentSortOrder, options) => {
    const value =
      currentSortOrder === options[0].value
        ? options[1].value
        : options[0].value;
    onValueChange(value);
  };

  render() {
    const { currentSortOrder } = this.props;

    return this.buttons[currentSortOrder];
  }
}

SearchSortOrderElementMobile.propTypes = {
  currentSortOrder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
