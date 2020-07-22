import SeriesMetadataAccordion from '@modules/Series/SeriesMetadataAccordion';
import SeriesMetadataTabs from '@modules/Series/SeriesMetadataTabs';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SeriesMetadata extends Component {
  render() {
    const { series } = this.props;
    return (
      <Container className="document-metadata" data-test={series.metadata.pid}>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <SeriesMetadataTabs metadata={series.metadata} />
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <SeriesMetadataAccordion metadata={series.metadata} />
        </Responsive>
      </Container>
    );
  }
}

SeriesMetadata.propTypes = {
  series: PropTypes.object.isRequired,
};

export default Overridable.component('SeriesMetadata', SeriesMetadata);
