import React from 'react';

import { Container } from 'semantic-ui-react';
import Overridable from 'react-overridable';
import PropTypes from 'prop-types';

class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.scanner = null;
    this.deviceId = 'scanner';
  }

  componentDidMount() {
    this.initializeScanner();
  }

  componentWillUnmount() {
    const { stopScanner } = this.props;
    stopScanner(this.scanner);
  }

  initializeScanner = async () => {
    const { startScanner, onScanSuccess, onScanFailure } = this.props;

    this.scanner = startScanner(this.deviceId, onScanSuccess, onScanFailure);
  };

  render() {
    return <Container id={this.deviceId} style={{ width: '80%' }} />;
  }
}

BarcodeScanner.propTypes = {
  startScanner: PropTypes.func.isRequired,
  stopScanner: PropTypes.func.isRequired,
  onScanSuccess: PropTypes.func,
  onScanFailure: PropTypes.func,
};

BarcodeScanner.defaultProps = {
  onScanSuccess: null,
  onScanFailure: null,
};

export default Overridable.component('BarcodeScanner', BarcodeScanner);
