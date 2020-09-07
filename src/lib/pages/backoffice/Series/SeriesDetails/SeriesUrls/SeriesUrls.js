import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import get from 'lodash/get';
import { Container, Divider } from 'semantic-ui-react';
import { UrlList } from '@components/backoffice/UrlList';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import _isEmpty from 'lodash/isEmpty';

export class SeriesUrls extends Component {
  prepareData = () => {
    const urls = get(this.props, 'series.metadata.urls', []);

    return [{ name: 'Urls', value: <UrlList urls={urls} /> }];
  };
  render() {
    const { series } = this.props;
    const rows = this.prepareData();
    const columns = [
      {
        title: 'URL',
        field: 'value',
      },
      {
        title: 'Description',
        field: 'description',
      },
      { title: 'Open access', field: 'open_access' },
      { title: 'Restrictions', field: 'access_restriction' },
    ];

    const hasAccessUrls = !_isEmpty(series.metadata.access_urls);
    return series.metadata.urls || series.metadata.access_urls ? (
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
    ) : (
      <InfoMessage header="No stored urls." content="Edit series to add urls" />
    );
  }
}

SeriesUrls.propTypes = {
  series: PropTypes.object.isRequired,
};
