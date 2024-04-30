import React from 'react';

import { Container, Divider, Label, Segment } from 'semantic-ui-react';
// import { Media } from '@components/Media';
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
    const { getCameras } = this.props;
    try {
      const videoInputDevices = await getCameras(); // Return promise or something
      if (videoInputDevices.length >= 1) {
        this.setState({ selectedDeviceId: videoInputDevices[0].id });
      }
    } catch (err) {
      console.error(err);
    }
    this.handleStartButtonClick();
  };

  handleStartButtonClick = () => {
    const { startScanner, onScanSuccess, onScanFailure } = this.props;
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
          <Container id={selectedDeviceId} style={{ width: '80%' }} />
          <Divider />
          <Label>Result:</Label>
          <pre>
            <code id="result" />
          </pre>
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
