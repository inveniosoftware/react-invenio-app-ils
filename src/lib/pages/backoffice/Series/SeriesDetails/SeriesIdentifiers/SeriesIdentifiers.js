import { InfoMessage, MetadataTable } from '@components/backoffice';
import { groupedSchemeValueList } from '@components/backoffice/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class SeriesIdentifiers extends Component {
  render() {
    const { series } = this.props;
    return series.metadata.identifiers ? (
      <MetadataTable
        rows={groupedSchemeValueList(series.metadata.identifiers)}
      />
    ) : (
      <InfoMessage
        header="No stored identifiers."
        content="Edit series to add identifiers"
      />
    );
  }
}

SeriesIdentifiers.propTypes = {
  series: PropTypes.object.isRequired,
};
