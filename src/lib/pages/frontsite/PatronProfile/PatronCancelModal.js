import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Button, Header, Modal } from 'semantic-ui-react';

class PatronCancelModal extends Component {
  render() {
    const {
      data,
      documentTitle,
      headerContent,
      headerIcon,
      onConfirm,
      onClose,
      isOpened,
    } = this.props;
    return isOpened ? (
      <Modal open={isOpened} onClose={onClose} closeIcon size="small">
        <Header icon={headerIcon} content={headerContent} />
        <Modal.Content>
          Your request for "<strong>{documentTitle}</strong>" will be cancelled.
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>No, take me back</Button>
          <Button negative onClick={() => onConfirm(data)}>
            Yes, I am sure
          </Button>
        </Modal.Actions>
      </Modal>
    ) : null;
  }
}

PatronCancelModal.propTypes = {
  data: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  headerContent: PropTypes.string.isRequired,
  headerIcon: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
};

PatronCancelModal.defaultProps = {
  headerIcon: 'exclamation',
};

export default Overridable.component('PatronCancelModal', PatronCancelModal);
