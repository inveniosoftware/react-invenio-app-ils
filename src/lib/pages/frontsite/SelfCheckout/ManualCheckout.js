import React from 'react';

import PropTypes from 'prop-types';
import { Container, Header, Message, Button, Input } from 'semantic-ui-react';

export class ManualCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      manualBarcode: null,
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const { show, autofocus } = this.props;
    if (show && autofocus) {
      // Focus the input field when the component is mounted
      this.inputRef.current.focus();
    }
  }

  render() {
    const { show, onChange, label } = this.props;
    const { manualBarcode } = this.state;
    if (show) {
      return (
        <Container className="pt-1 center">
          <Message compact>
            <Header className="pb-1" as="h5">
              {label} Add the barcode manually:
            </Header>
            <Input
              id="barcodeInput"
              type="text"
              placeholder="Barcode..."
              className="pb-1"
              ref={this.inputRef}
              onChange={(e) => this.setState({ manualBarcode: e.target.value })}
            />
            <Button
              onClick={() => onChange(manualBarcode)}
              className="ml-10"
              type="submit"
            >
              Search
            </Button>
          </Message>
        </Container>
      );
    } else {
      return null;
    }
  }
}

ManualCheckout.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  autofocus: PropTypes.bool,
};

ManualCheckout.defaultProps = {
  show: false,
  label: 'Can’t scan the barcode?',
  autofocus: false,
};
