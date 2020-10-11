import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class ClearButton extends Component {
  render() {
    const { fluid, disabled, clickHandler, text } = this.props;
    return (
      <Button
        size="small"
        {...(disabled ? { disabled: true } : {})}
        {...(fluid ? { fluid: true } : {})}
        primary
        icon
        labelPosition="left"
        onClick={clickHandler}
      >
        <Icon name="close" />
        {text}
      </Button>
    );
  }
}

ClearButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
};

ClearButton.defaultProps = {
  text: 'Clear search',
  fluid: false,
  disabled: false,
};
