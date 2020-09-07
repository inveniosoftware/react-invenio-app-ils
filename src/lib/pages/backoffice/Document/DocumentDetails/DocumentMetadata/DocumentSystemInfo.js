import { toShortDateTime } from '@api/date';
import { CreatedBy, UpdatedBy } from '@components/backoffice/ChangedBy';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class DocumentSystemInfo extends Component {
  renderInternalNotes = () => {
    const { document } = this.props;

    if (!_isEmpty(document.metadata.internal_notes)) {
      return document.metadata.internal_notes.map((entry, index) => (
        <>
          User {entry.user} noted for field {entry.field}:<br />
          <p>{entry.value}</p>
          <br />
        </>
      ));
    }
  };

  prepareData = () => {
    const { document } = this.props;
    let rows = [
      {
        name: 'Created',
        value: toShortDateTime(document.created),
      },
      {
        name: 'Last updated',
        value: toShortDateTime(document.updated),
      },
    ];

    rows.push({
      name: 'Created by',
      value: <CreatedBy metadata={document.metadata} />,
    });

    rows.push({
      name: 'Updated by',
      value: <UpdatedBy metadata={document.metadata} />,
    });

    rows.push({
      name: 'Source',
      value: document.metadata.source,
    });

    return rows;
  };

  render() {
    return <MetadataTable rows={this.prepareData()} />;
  }
}

DocumentSystemInfo.propTypes = {
  document: PropTypes.object.isRequired,
};
