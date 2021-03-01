import { MetadataTable } from '@components/backoffice/MetadataTable';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { SeriesLanguages } from '@modules/Series/SeriesLanguages';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { groupedSchemeValueList } from '@components/backoffice/utils';
import { Container, Divider } from 'semantic-ui-react';

export default class SeriesMetadata extends Component {
  prepareData = () => {
    const { seriesDetails } = this.props;

    return [
      { name: 'Title', value: seriesDetails.metadata.title },
      {
        name: 'Mode of Issuance',
        value: seriesDetails.metadata.mode_of_issuance,
      },
      {
        name: 'Languages',
        value: <SeriesLanguages languages={seriesDetails.metadata.languages} />,
      },
      {
        name: 'Authors',
        value: <SeriesAuthors authors={seriesDetails.metadata.authors} />,
      },
    ];
  };

  render() {
    const { seriesDetails: series } = this.props;
    const rows = this.prepareData();
    const hasIdentifiers = !_isEmpty(series.metadata.identifiers);

    return (
      <Container fluid className="series-metadata">
        <MetadataTable rows={rows} />

        {hasIdentifiers && (
          <>
            <Divider horizontal>Identifiers</Divider>
            <MetadataTable
              rows={groupedSchemeValueList(series.metadata.identifiers)}
            />
          </>
        )}
      </Container>
    );
  }
}

SeriesMetadata.propTypes = {
  seriesDetails: PropTypes.object.isRequired,
};
