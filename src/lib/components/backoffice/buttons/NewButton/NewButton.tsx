import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, ButtonProps } from 'semantic-ui-react';

interface NewButtonProps
  extends Omit<
    ButtonProps,
    'as' | 'icon' | 'positive' | 'size' | 'labelPosition'
  > {
  text?: string;
  fluid?: boolean;
  disabled?: boolean;
  to?: string;
}

export default class NewButton extends Component<NewButtonProps> {
  static defaultProps = {
    text: 'New',
    fluid: false,
    disabled: false,
  };

  render() {
    const { text, ...rest } = this.props;
    return (
      <Button
        icon
        positive
        as={Link}
        size="small"
        labelPosition="left"
        {...rest}
      >
        <Icon name="plus" />
        {text}
      </Button>
    );
  }
}
