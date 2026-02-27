import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react';

interface RemoveItemButtonProps {
  onClick: (dataPid: string) => void;
  dataPid: string;
  popup?: string;
}

export default class RemoveItemButton extends Component<RemoveItemButtonProps> {
  static defaultProps = {
    popup: '',
  };

  render() {
    const { onClick, dataPid, popup } = this.props;
    const button = (
      <Button
        icon="close"
        size="mini"
        attached="left"
        negative
        onClick={() => onClick(dataPid)}
        className="bo-remove-item"
      />
    );

    if (popup) {
      return <Popup content={popup} trigger={button} />;
    }
    return button;
  }
}
