import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class SeriesAdditionalInfo extends Component {
  prepareData = () => {
    const { series } = this.props;
    return series.metadata.alternative_titles.map((entry) => ({
      name: entry.type,
      value: entry.value,
    }));
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
