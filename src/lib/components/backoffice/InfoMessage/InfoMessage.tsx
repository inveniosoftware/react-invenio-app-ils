import React, { Component, ReactNode } from 'react';
import { Icon, Message, MessageProps } from 'semantic-ui-react';

interface InfoMessageProps extends Omit<MessageProps, 'icon' | 'info'> {
  header: string;
  content?: string;
  children?: ReactNode;
}

export default class InfoMessage extends Component<InfoMessageProps> {
  static defaultProps = {
    children: null,
    content: '',
  };

  render() {
    const { header, content, children, ...uiProps } = this.props;
    return (
      <Message icon info data-test="no-results" {...uiProps}>
        <Icon name="info circle" />
        <Message.Content>
          <Message.Header>{header}</Message.Header>
          <p>{content}</p>
          {children}
        </Message.Content>
      </Message>
    );
  }
}
