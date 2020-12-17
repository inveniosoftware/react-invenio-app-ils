import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export class SeriesAdditionalInfo extends Component {
  prepareData = () => {
    const { series } = this.props;
    let rows = [];
    rows.push({
      name: 'Alternative title',
      value: (
        <List bulleted>
          {series.metadata.alternative_titles.map((entry) => (
            <List.Item key={entry.value}>
              <List.Content>{entry.value}</List.Content>
            </List.Item>
          ))}
        </List>
      ),
    });
    return rows;
  };

  render() {
    const { series } = this.props;
    return series.metadata.alternative_titles ? (
      <MetadataTable rows={this.prepareData()} />
    ) : (
      <InfoMessage
        header="No additional info."
        content="Edit series to add additional info"
      />
    );
  }
}

SeriesAdditionalInfo.propTypes = {
  series: PropTypes.object.isRequired,
};
