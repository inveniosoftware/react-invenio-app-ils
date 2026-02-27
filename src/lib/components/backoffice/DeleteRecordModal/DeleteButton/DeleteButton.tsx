import React, { Component } from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';

interface DeleteButtonProps extends ButtonProps {}

export default class DeleteButton extends Component<DeleteButtonProps> {
  render() {
    return (
      <Button
        color="red"
        icon="trash alternate"
        size="small"
        title="Delete record"
        {...this.props}
      />
    );
  }
}
