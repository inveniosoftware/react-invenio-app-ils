import React from 'react';

import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Container, Header } from 'semantic-ui-react';
import { BarcodeScanner } from '@components/BarcodeScanner';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { SelfCheckoutModal } from './SelfCheckoutModal';
import { invenioConfig } from '@config';

class SelfCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scanner: null,
      showModal: false,
    };
  }

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  onScanSuccess = async (decodedText, decodedResult) => {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('result').textContent = decodedText;
    // Send to selfCheckout
    const { selfCheckOutSearch } = this.props;
    await selfCheckOutSearch(decodedText.trim());
    // open modal
    this.toggleModal();
    // this.stopScanner();
  };

  onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    console.warn(`Code scan error = ${error}`);
  }

  startScanner = (selectedDeviceId, onScanSuccess, onScanFailure) => {
    const scanner = new Html5Qrcode(selectedDeviceId, {
      formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
    });
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
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.status),
    isOnShelf: () => !item.circulation,
  });

  isItemLoanable = () => {
    const { item } = this.props;
    if (item !== null && item !== undefined) {
      if (
        this.itemStatus(item).isOnShelf &&
        this.itemStatus(item).canCirculate
      ) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { showModal } = this.state;
    return (
      <Container>
        <Header as="h2">Self Checkout</Header>
        <BarcodeScanner
          getCameras={Html5Qrcode.getCameras}
          startScanner={this.startScanner}
          stopScanner={this.stopScanner}
          onScanSuccess={this.onScanSuccess}
          // onScanFailure={this.onScanFailure}
        />
        <SelfCheckoutModal
          modalOpened={showModal && this.isItemLoanable()}
          toggleModal={this.toggleModal}
        />
      </Container>
    );
  }
}

SelfCheckout.propTypes = {
  /* REDUX */
  selfCheckOutSearch: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  item: PropTypes.object,
};

SelfCheckout.defaultProps = {
  item: null,
};

export default Overridable.component('SelfCheckout', SelfCheckout);
