import React from 'react';
import PropTypes from 'prop-types';
import { recordToPidType } from '@api/utils';
import { Loader } from '@components/Loader';
import { Modal, Button } from 'semantic-ui-react';
import _get from 'lodash/get';

export default class SelfCheckoutModal extends React.Component {
  handleCheckoutClick = () => {
    const { user, item, toggleModal, checkoutItem } = this.props;
    // Checkout function
    const itemPid = {
      type: recordToPidType(item),
      value: item.metadata.pid,
    };
    checkoutItem(item.metadata.document_pid, itemPid, user.id.toString());
    toggleModal();
  };

  render() {
    const { isLoading, item, modalOpened, toggleModal } = this.props;
    const itemBarcode = _get(item, 'metadata.barcode');
    // const { visible } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Modal open={modalOpened} size="large" centered onClose={toggleModal}>
          <Modal.Header>{`You are about to checkout the physical copy with barcode ${itemBarcode}`}</Modal.Header>
          <Modal.Actions>
            <Button color="black" onClick={toggleModal}>
              Close
            </Button>
            <Button
              positive
              disabled={isLoading}
              icon="checkmark"
              labelPosition="left"
              content="Confirm checkout"
              onClick={this.handleCheckoutClick}
            />
          </Modal.Actions>
        </Modal>
      </Loader>
    );
  }
}

SelfCheckoutModal.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  checkoutItem: PropTypes.func.isRequired,
  // resultMessage: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SelfCheckoutModal.defaultProps = {
  modalOpened: false,
  isLoading: false,
};
