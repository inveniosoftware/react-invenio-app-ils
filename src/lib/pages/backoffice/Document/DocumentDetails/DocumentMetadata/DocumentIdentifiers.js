import { InfoMessage, MetadataTable } from '@components/backoffice';
import { groupedSchemeValueList } from '@components/backoffice/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class DocumentIdentifiers extends Component {
  render() {
    const { document } = this.props;
    const identifiers = groupedSchemeValueList(document.metadata.identifiers);
    const alternativeIdentifiers = groupedSchemeValueList(
      document.metadata.alternative_identifiers
    );
    return document.metadata.identifiers ? (
      <MetadataTable rows={identifiers.concat(alternativeIdentifiers)} />
    ) : (
      <InfoMessage
        header="No stored identifiers."
        content="Edit document to add identifiers"
      />
    );
  }
}

DocumentIdentifiers.propTypes = {
  document: PropTypes.object.isRequired,
};
