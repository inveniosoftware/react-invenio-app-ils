import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class RemoveItemButton extends Component {
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

RemoveItemButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataPid: PropTypes.string.isRequired,
  popup: PropTypes.string,
};

RemoveItemButton.defaultProps = {
  popup: '',
};
