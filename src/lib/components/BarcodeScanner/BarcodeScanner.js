import React from 'react';

import { Container, Divider, Segment } from 'semantic-ui-react';
import Overridable from 'react-overridable';
import PropTypes from 'prop-types';

class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDeviceId: null,
    };

    this.scanner = null;
  }

  componentDidMount() {
    this.initializeScanner();
  }

  componentWillUnmount() {
    const { stopScanner } = this.props;
    stopScanner(this.scanner);
  }

  initializeScanner = async () => {
    const { getCameras, startScanner, onScanSuccess, onScanFailure } =
      this.props;
    try {
      const videoInputDevices = await getCameras();
      if (videoInputDevices.length >= 1) {
        this.setState({ selectedDeviceId: videoInputDevices[0].id });
      }
    } catch (err) {
      console.error(err);
    }

    const { selectedDeviceId } = this.state;
    this.scanner = startScanner(selectedDeviceId, onScanSuccess, onScanFailure);
  };

  handleSourceSelectChange = (_, { value }) => {
    this.setState({ selectedDeviceId: value });
  };

  render() {
    const { selectedDeviceId } = this.state;

    return (
      <Container text>
        <Segment>
          <Divider />
          <Container
            id={selectedDeviceId}
            key="scanner"
            style={{ width: '80%' }}
          />
          <Divider />
        </Segment>
      </Container>
    );
  }
}

BarcodeScanner.propTypes = {
  getCameras: PropTypes.func.isRequired,
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
