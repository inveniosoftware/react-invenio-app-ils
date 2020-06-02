import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { UrlList } from '@components/backoffice/UrlList';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { SeriesLanguages } from '@modules/Series/SeriesLanguages';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';

export default class SeriesMetadata extends Component {
  prepareData = () => {
    const { seriesDetails } = this.props;

    const urls = get(this.props, 'seriesDetails.metadata.urls', []);

    return [
      { name: 'Title', value: seriesDetails.metadata.title },
      {
        name: 'Title abbreviation',
        value: seriesDetails.metadata.abbreviated_title,
      },
      {
        name: 'Authors',
        value: <SeriesAuthors authors={seriesDetails.metadata.authors} />,
      },
      {
        name: 'Publication Year',
        value: seriesDetails.metadata.publication_year,
      },
      {
        name: 'Mode of Issuance',
        value: seriesDetails.metadata.mode_of_issuance,
      },
      {
        name: 'Languages',
        value: <SeriesLanguages languages={seriesDetails.metadata.languages} />,
      },
      { name: 'Publisher', value: seriesDetails.metadata.publisher },
      { name: 'Urls', value: <UrlList urls={urls} /> },
    ];
  };

  render() {
    const { seriesDetails: series } = this.props;
    const rows = this.prepareData();
    const columns = [
      {
        title: 'URL',
        field: 'url',
      },
      {
        title: 'Description',
        field: 'description',
      },
      { title: 'Open access', field: 'open_access' },
      { title: 'Restrictions', field: 'access_restriction' },
    ];

    const hasAccessUrls = !_isEmpty(series.metadata.access_urls);

    return (
      <Container fluid className="series-metadata">
        <MetadataTable rows={rows} />

        {hasAccessUrls && (
          <>
            <Divider horizontal>Access URLS</Divider>
            <ResultsTable
              columns={columns}
              data={series.metadata.access_urls}
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
