import React from 'react';

import { Container } from 'semantic-ui-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Overridable from 'react-overridable';
import PropTypes from 'prop-types';

class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.deviceId = 'ScannerComponent';
  }

  componentDidMount() {
    this.initializeScanner();
  }

  componentWillUnmount() {
    this.stopScanner();
  }

  setScannerArea = (cameraBoxWidth, cameraBoxHeight) => {
    return {
      width: cameraBoxWidth * 0.9,
      height: cameraBoxHeight * 0.7,
    };
  };

  onScanSuccess = (decodedText, decodedResult) => {
    const { onBarcodeDetected } = this.props;
    onBarcodeDetected(decodedText.trim());
  };

  onScanFailure = (failureMessage) => {
    const { onBarcodeNotFound } = this.props;
    onBarcodeNotFound();
  };

  initializeScanner = async () => {
    this.scanner = new Html5Qrcode(this.deviceId, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
      ],
    });
    this.scanner.start(
      { facingMode: 'environment' },
      {
        fps: 2, // frame per second for qr code scanning
        aspectRatio: 2, // 2:1
        qrbox: this.setScannerArea, // bounding box UI
      },
      this.onScanSuccess,
      this.onScanFailure,
      /* verbose= */ false
    );
  };

  stopScanner = () => {
    this.scanner.stop();
  };

  render() {
    return <Container id={this.deviceId} />;
  }
}

BarcodeScanner.propTypes = {
  onBarcodeDetected: PropTypes.func,
  onBarcodeNotFound: PropTypes.func,
};

BarcodeScanner.defaultProps = {
  onBarcodeDetected: null,
  onBarcodeNotFound: null,
};

export default Overridable.component('BarcodeScanner', BarcodeScanner);
