import { Media } from '@components/Media';
import SeriesMetadataAccordion from '@modules/Series/SeriesMetadataAccordion';
import SeriesMetadataTabs from '@modules/Series/SeriesMetadataTabs';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SeriesMetadata extends Component {
  render() {
    const { series } = this.props;
    return (
      <Container className="document-metadata" data-test={series.metadata.pid}>
        <Media greaterThanOrEqual="tablet">
          <SeriesMetadataTabs metadata={series.metadata} />
        </Media>
        <Media at="mobile">
          <SeriesMetadataAccordion metadata={series.metadata} />
        </Media>
      </Container>
    );
  }
}

SeriesMetadata.propTypes = {
  series: PropTypes.object.isRequired,
};

export default Overridable.component('SeriesMetadata', SeriesMetadata);
