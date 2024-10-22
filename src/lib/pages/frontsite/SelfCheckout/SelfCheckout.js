import React from 'react';

import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import {
  Container,
  Header,
  Image,
  List,
  Grid,
  Message,
} from 'semantic-ui-react';
import { BarcodeScanner } from '@components/BarcodeScanner';
import { SelfCheckoutModal } from './SelfCheckoutModal';
import { ManualCheckout } from './ManualCheckout';
import { invenioConfig } from '@config';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';

class SelfCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      barcode: null,
    };
  }

  toggleModal = (shouldShowModal = false) => {
    this.setState((prevState) => ({
      showModal: shouldShowModal,
      barcode: shouldShowModal ? prevState.barcode : null,
    }));
  };

  onBarcodeDetected = async (detectedBarcode) => {
    const { barcode: oldBarcode } = this.state;
    // Execute logic if new barcode detected
    if (detectedBarcode !== oldBarcode) {
      this.setState({ barcode: detectedBarcode });
      const { selfCheckOutSearch } = this.props;
      await selfCheckOutSearch(detectedBarcode);

      // open modal if item is loanable
      const shouldShowModal = this.isItemLoanable(detectedBarcode);
      if (shouldShowModal) {
        this.toggleModal(true);
      } else {
        this.toggleModal(false);
      }
    }
  };

  itemStatus = (item) => ({
    canCirculate: () =>
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.metadata.status),
    isOnShelf: () => !item.metadata.circulation.state, // on shelf if circulation.state doesn't exist
  });

  isItemLoanable = (itemBarcode) => {
    const { user, item, notifyResultMessage } = this.props;
    var resultMessage = `Book with barcode ${itemBarcode} not found.`;

    if (!_isEmpty(item)) {
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
        const status = _find(invenioConfig.ITEMS.statuses, {
          value: item.metadata?.status,
        });
        resultMessage = `Book with barcode: ${itemBarcode} is ${status?.text}!`;
      }
    }

    notifyResultMessage(resultMessage);
    return false;
  };

  renderInstructions = () => {
    return (
      <>
        <Header as="h3">How to scan:</Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image
                src={
                  process.env.PUBLIC_URL +
                  '/images/correct-self-checkout-method.png'
                }
                size="large"
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Image
                src={
                  process.env.PUBLIC_URL +
                  '/images/incorrect-self-checkout-method.png'
                }
                size="large"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List bulleted size="big">
          <List.Item>
            Look for the library's unique barcode sticker, typically found on
            the inside cover or the first page.
          </List.Item>
          <List.Item>
            Hold the scanner directly over the barcode and scan inside the box
            as depicted. Ensure that the barcode is inside the scanner box.
          </List.Item>
          <List.Item>
            Wait for the confirmation light and a popup prompting the checkout
            process, indicating that the barcode is successfully scanned!
          </List.Item>
          <List.Item>
            Check the popup window to ensure the correct book details are
            displayed before checking out the book.
          </List.Item>
          <List.Item>
            <b>Important Reminder:</b> Please do not scan the publication
            barcode on the back cover of the book.
            <br />
            The publication barcode is for retail purposes and will not work
            with our library system.
          </List.Item>
        </List>
      </>
    );
  };

  render() {
    const { showModal } = this.state;
    return (
      <Container className="spaced" textAlign="center">
        <Header as="h1">SELF-CHECKOUT</Header>
        <Container>
          <BarcodeScanner onBarcodeDetected={this.onBarcodeDetected} />
          <ManualCheckout show onBarcodeInput={this.onBarcodeDetected} />
          <Message warning compact>
            Barcode not detected while scanning?
            <br />
            Try using another browser. (Recommended:{' '}
            <a href="https://www.google.com/chrome/">Google Chrome</a>)
          </Message>
        </Container>
        <SelfCheckoutModal
          modalOpened={showModal}
          toggleModal={this.toggleModal}
          onBarcodeDetected={this.onBarcodeDetected}
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
