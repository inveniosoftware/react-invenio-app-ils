import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import get from 'lodash/get';
import { Container, Divider, List } from 'semantic-ui-react';
import { UrlList } from '@components/backoffice/UrlList';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import _isEmpty from 'lodash/isEmpty';

export class SeriesUrls extends Component {
  prepareData = () => {
    const urls = get(this.props, 'series.metadata.urls', []);

    return [{ name: 'Urls', value: <UrlList urls={urls} /> }];
  };

  displayAccessRestriction = ({ col, row }) => {
    return !_isEmpty(row[col.field]) ? (
      <List className="no-list-margin" as="ul">
        {row[col.field].map((item) => (
          <List.Item key={item} as="td">
            {item}
          </List.Item>
        ))}
      </List>
    ) : (
      '-'
    );
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
      {
        title: 'Restrictions',
        field: 'access_restriction',
        formatter: this.displayAccessRestriction,
      },
    ];

    const hasAccessUrls = !_isEmpty(series.metadata.access_urls);
    return series.metadata.urls || series.metadata.access_urls ? (
      <Container fluid className="series-metadata">
        <MetadataTable rows={rows} />

        {hasAccessUrls && (
          <>
            <Divider horizontal>Access URLS</Divider>
            <ResultsTable
              fixed
              columns={columns}
              data={series.metadata.access_urls}
            />
          </>
        )}
      </Container>
    ) : (
      <InfoMessage header="No urls." content="Edit series to add urls" />
    );
  }
}

SeriesUrls.propTypes = {
  series: PropTypes.object.isRequired,
};
