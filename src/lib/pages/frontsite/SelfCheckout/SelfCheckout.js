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
      this.toggleModal(true);
    }
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
};

export default Overridable.component('SelfCheckout', SelfCheckout);
