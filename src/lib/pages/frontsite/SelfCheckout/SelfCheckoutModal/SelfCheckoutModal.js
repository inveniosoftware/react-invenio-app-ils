import React from 'react';
import PropTypes from 'prop-types';
import { recordToPidType } from '@api/utils';
import { Loader } from '@components/Loader';
import { DocumentCard } from './DocumentCard';
import { Modal, Button } from 'semantic-ui-react';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import { ManualCheckout } from '../ManualCheckout';

export default class SelfCheckoutModal extends React.Component {
  checkout = () => {
    const { user, item, checkoutItem } = this.props;
    // Checkout function
    const itemPid = {
      type: recordToPidType(item),
      value: item.metadata.pid,
    };
    checkoutItem(item.metadata.document_pid, itemPid, user.id.toString());
  };

  handleCheckoutAgainClick = () => {
    const { toggleModal } = this.props;
    this.checkout();
    toggleModal();
  };

  handleCheckoutFinishClick = () => {
    this.checkout();
    goTo(FrontSiteRoutes.patronProfile);
  };

  render() {
    const { isLoading, item, modalOpened, toggleModal, onBarcodeDetected } =
      this.props;
    if (_isEmpty(item)) {
      return null;
    }
    return (
      <Loader isLoading={isLoading}>
        <Modal
          open={modalOpened}
          size="large"
          centered
          onClose={() => toggleModal(false)}
        >
          <Modal.Header>
            {`You are about to checkout a book with barcode:
            ${item?.metadata.barcode}`}
          </Modal.Header>
          <Modal.Content>
            <DocumentCard item={item} />
            <ManualCheckout
              label="Wrong book?"
              autofocus
              show
              onBarcodeInput={onBarcodeDetected}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => toggleModal(false)}
              content="Cancel"
            />
            <Button
              positive
              disabled={isLoading}
              icon="checkmark"
              labelPosition="left"
              content="Checkout and scan again"
              onClick={this.handleCheckoutAgainClick}
            />
            <Button
              positive
              disabled={isLoading}
              icon="checkmark"
              labelPosition="left"
              content="Checkout and finish"
              onClick={this.handleCheckoutFinishClick}
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
  toggleModal: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool,
  isLoading: PropTypes.bool,
  onBarcodeDetected: PropTypes.func.isRequired,
};

SelfCheckoutModal.defaultProps = {
  modalOpened: false,
  isLoading: false,
};
