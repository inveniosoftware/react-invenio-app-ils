import React from 'react';

import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Container, Header } from 'semantic-ui-react';
import { BarcodeScanner } from '@components/BarcodeScanner';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { SelfCheckoutModal } from './SelfCheckoutModal';
import { invenioConfig } from '@config';
import _get from 'lodash/get';

class SelfCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scanner: null,
      showModal: false,
      barcode: null,
    };
  }

  toggleModal = () => {
    const { showModal, scanner } = this.state;
    const shouldShowModal = !showModal && this.isItemLoanable();
    this.setState({ showModal: shouldShowModal });
    if (shouldShowModal) {
      scanner.pause();
    } else if (!scanner.isScanning) {
      scanner.resume();
    }
  };

  onScanSuccess = async (decodedText, decodedResult) => {
    // Send to selfCheckout if different barcode
    const { barcode } = this.state;
    if (decodedText.trim() !== barcode) {
      this.setState({ barcode: decodedText.trim() });

      const { selfCheckOutSearch } = this.props;
      await selfCheckOutSearch(decodedText.trim());
      // open modal
      this.toggleModal();
    }
  };

  startScanner = (selectedDeviceId, onScanSuccess, onScanFailure) => {
    const scanner = new Html5Qrcode(selectedDeviceId, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128, // config
        Html5QrcodeSupportedFormats.CODE_39,
      ],
    });
    // config
    scanner.start(
      selectedDeviceId,
      {
        fps: 1, // frame per second for qr code scanning
        qrbox: { width: 300, height: 100 }, // bounding box UI
        // aspectRatio: 0.5625,
      },
      onScanSuccess,
      onScanFailure,
      /* verbose= */ false
    );
    this.setState({ scanner: scanner });
    return scanner;
  };

  stopScanner = () => {
    const { scanner } = this.state;
    scanner.stop();
  };

  itemStatus = (item) => ({
    canCirculate: () =>
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.metadata.status),
    isOnShelf: () => !item.metadata.circulation, // on shelf if circulation doesn't exist
  });

  isItemLoanable = () => {
    const { item, notifyResultMessage } = this.props;
    const { barcode } = this.state;
    var resultMessage = `Physical copy with barcode: ${barcode} doesn't exist.`;

    if (item !== null && item !== undefined) {
      const itemBarcode = _get(item, 'metadata.barcode');
      if (this.itemStatus(item).canCirculate()) {
        if (this.itemStatus(item).isOnShelf()) {
          return true;
        } else {
          resultMessage = `Physical copy with barcode: ${itemBarcode} is currently on loan!`;
        }
      } else {
        const status = invenioConfig.ITEMS.statuses.find(
          (x) => x.value === item.metadata.status
        );
        resultMessage = `Physical copy with barcode: ${itemBarcode} is ${status.text}!`;
      }
    }

    notifyResultMessage(resultMessage);
    return false;
  };

  render() {
    const { showModal } = this.state;
    return (
      <Container className="spaced">
        <Header as="h2">Self Checkout</Header>
        <BarcodeScanner
          getCameras={Html5Qrcode.getCameras}
          startScanner={this.startScanner}
          stopScanner={this.stopScanner}
          onScanSuccess={this.onScanSuccess}
        />
        <SelfCheckoutModal
          modalOpened={showModal}
          toggleModal={this.toggleModal}
        />
        {/* Add visual example and description */}
      </Container>
    );
  }
}

SelfCheckout.propTypes = {
  /* REDUX */
  selfCheckOutSearch: PropTypes.func.isRequired,
  item: PropTypes.object,
  notifyResultMessage: PropTypes.func.isRequired,
};

SelfCheckout.defaultProps = {
  item: null,
};

export default Overridable.component('SelfCheckout', SelfCheckout);
