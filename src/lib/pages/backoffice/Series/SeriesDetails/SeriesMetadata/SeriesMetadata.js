import { MetadataTable } from '@components/backoffice/MetadataTable';
import { groupedSchemeValueList } from '@components/backoffice/utils';
import { SeriesAlternativeTitles } from '@modules/Series/SeriesAlternativeTitles';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { SeriesLanguages } from '@modules/Series/SeriesLanguages';
import _isEmpty from 'lodash/isEmpty';
import { SeriesPhysicalVolumes } from '@modules/Series/SeriesPhysicalVolumes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
        name: 'Type',
        value: seriesDetails.metadata.series_type,
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

        <SeriesAlternativeTitles
          alternativeTitles={series.metadata.alternative_titles}
        />
        {!_isEmpty(series.metadata.physical_volumes) ? (
          <SeriesPhysicalVolumes
            physicalVolumes={series.metadata.physical_volumes}
          />
        ) : (
          'There is no volumes description'
        )}
      </Container>
    );
  }
}

SeriesMetadata.propTypes = {
  seriesDetails: PropTypes.object.isRequired,
};
