import React from 'react';

import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Container, Header, Image, List, Grid } from 'semantic-ui-react';
import { BarcodeScanner } from '@components/BarcodeScanner';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { SelfCheckoutModal } from './SelfCheckoutModal';
import { invenioConfig } from '@config';
import _get from 'lodash/get';

class SelfCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      barcode: null,
    };
  }

  toggleModal = () => {
    const { showModal } = this.state;
    const shouldShowModal = !showModal && this.isItemLoanable();
    this.setState({ showModal: shouldShowModal });
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

  setScannerArea = (cameraBoxWidth, cameraBoxHeight) => {
    return {
      width: cameraBoxWidth * 0.9,
      height: cameraBoxHeight * 0.3,
    };
  };

  startScanner = (deviceId, onScanSuccess, onScanFailure) => {
    const scanner = new Html5Qrcode(deviceId, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
      ],
    });
    scanner.start(
      { facingMode: 'environment' },
      {
        fps: 1, // frame per second for qr code scanning
        qrbox: this.setScannerArea, // bounding box UI
      },
      onScanSuccess,
      onScanFailure,
      /* verbose= */ false
    );
    return scanner;
  };

  stopScanner = (scanner) => {
    scanner.stop();
  };

  itemStatus = (item) => ({
    canCirculate: () =>
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.metadata.status),
    isOnShelf: () => !item.metadata.circulation.state, // on shelf if circulation.state doesn't exist
  });

  isItemLoanable = () => {
    const { user, item, notifyResultMessage } = this.props;
    const { barcode } = this.state;
    var resultMessage = `Book with barcode: ${barcode} doesn't exist.`;

    if (item !== null && item !== undefined) {
      const itemBarcode = _get(item, 'metadata.barcode');
      if (this.itemStatus(item).canCirculate()) {
        if (this.itemStatus(item).isOnShelf()) {
          return true;
        } else {
          if (item.metadata.circulation.patron_pid === user.id.toString()) {
            resultMessage = `You already loaned this book with barcode: ${itemBarcode}!`;
          } else {
            resultMessage = `Book with barcode: ${itemBarcode} is currently on loan!`;
          }
        }
      } else {
        const status = invenioConfig.ITEMS.statuses.find(
          (x) => x.value === item.metadata.status
        );
        resultMessage = `Book with barcode: ${itemBarcode} is ${status.text}!`;
      }
    }

    notifyResultMessage(resultMessage);
    return false;
  };

  renderInstructions = () => {
    return (
      <>
        <Header as="h3">How to scan:</Header>
        <List>
          <List.Item>Scan the barcode inside the box.</List.Item>
          <List.Item>
            Scan the library barcode at the start of the book.
          </List.Item>
          <List.Item>
            Don't scan publication barcode a tthe back of the book.
          </List.Item>
        </List>
        {/* Here for now for demo, move to assets when finalised? */}
        <Grid>
          <Grid.Column>
            <Image
              src={
                process.env.PUBLIC_URL +
                '/images/correct-self-checkout-method.png'
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              src={
                process.env.PUBLIC_URL +
                '/images/wrong-self-checkout-method.png'
              }
            />
          </Grid.Column>
        </Grid>
      </>
    );
  };

  render() {
    const { showModal } = this.state;
    return (
      <Container className="spaced" textAlign="center">
        <Header as="h1">SELF CHECKOUT</Header>
        <BarcodeScanner
          startScanner={this.startScanner}
          stopScanner={this.stopScanner}
          onScanSuccess={this.onScanSuccess}
        />
        <SelfCheckoutModal
          modalOpened={showModal}
          toggleModal={this.toggleModal}
        />
        {this.renderInstructions()}
      </Container>
    );
  }
}

SelfCheckout.propTypes = {
  /* REDUX */
  selfCheckOutSearch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  item: PropTypes.object,
  notifyResultMessage: PropTypes.func.isRequired,
};

SelfCheckout.defaultProps = {
  item: null,
};

export default Overridable.component('SelfCheckout', SelfCheckout);
