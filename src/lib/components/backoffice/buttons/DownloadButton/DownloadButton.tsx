import React, { Component, ReactNode } from 'react';
import { Button, Icon } from 'semantic-ui-react';

interface DownloadButtonProps {
  to: string;
  text?: string;
  fluid?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export default class DownloadButton extends Component<DownloadButtonProps> {
  static defaultProps = {
    children: null,
    text: 'Download',
    fluid: false,
    disabled: false,
  };

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
