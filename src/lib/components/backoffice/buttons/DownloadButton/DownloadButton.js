import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class DownloadButton extends Component {
  render() {
    const { children, fluid, disabled, text, to } = this.props;
    return (
      <Button
        icon
        primary
        as="a"
        size="small"
        labelPosition="left"
        href={to}
        disabled={disabled}
        fluid={fluid}
      >
        <Icon name="download" />
        {children ? children : text}
      </Button>
    );
  }
}

DownloadButton.propTypes = {
  text: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

DownloadButton.defaultProps = {
  children: null,
  text: 'Download',
  fluid: false,
  disabled: false,
};
