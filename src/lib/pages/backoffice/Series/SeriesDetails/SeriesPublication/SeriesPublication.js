import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { InfoMessage } from '@components/backoffice/InfoMessage';

export class SeriesPublication extends Component {
  prepareData = () => {
    const { seriesDetails } = this.props;

    return [
      {
        name: 'Edition',
        value: seriesDetails.metadata.edition,
      },
      {
        name: 'Publication Year',
        value: seriesDetails.metadata.publication_year,
      },
      { name: 'Publisher', value: seriesDetails.metadata.publisher },
    ];
  };

  render() {
    const rows = this.prepareData();
    const { seriesDetails } = this.props;

    return seriesDetails.metadata.edition ||
      seriesDetails.metadata.publication_year ||
      seriesDetails.metadata.publisher ? (
      <Container fluid className="series-metadata">
        <MetadataTable rows={rows} />
      </Container>
    ) : (
      <InfoMessage
        header="No stored publication content."
        content="Edit series to add publication content"
      />
    );
  }
}

SeriesPublication.propTypes = {
  seriesDetails: PropTypes.object.isRequired,
};
