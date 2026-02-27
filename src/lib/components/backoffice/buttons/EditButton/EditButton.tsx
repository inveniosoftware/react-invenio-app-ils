import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

interface EditButtonProps {
  to: string;
  text?: string;
  fluid?: boolean;
  disabled?: boolean;
}

export default class EditButton extends Component<EditButtonProps> {
  static defaultProps = {
    text: 'Edit',
    fluid: false,
    disabled: false,
  };

  render() {
    const { fluid, disabled, to, text } = this.props;
    return (
      <Button
        icon
        primary
        as={Link}
        size="small"
        labelPosition="left"
        to={to}
        disabled={disabled}
        fluid={fluid}
      >
        <Icon name="edit" />
        {text}
      </Button>
    );
  }
}
