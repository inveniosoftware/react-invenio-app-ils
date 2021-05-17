import { SeriesDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/SeriesDetailsLink';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { ExistingRelations } from '@modules/Relations/backoffice/components/ExistingRelations';
import { RelationRemover } from '@modules/Relations/backoffice/components/RelationRemover';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RelationSerialModal } from './RelationSerialModal';

export default class RelationSerial extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'serial';
  }

  viewDetails = ({ row }) => {
    return (
      <SeriesDetailsLink pidValue={row.pid_value}>
        <LiteratureTitle
          title={row.record_metadata.title}
          edition={row.record_metadata.edition}
          publicationYear={row.record_metadata.publication_year}
        />
      </SeriesDetailsLink>
    );
  };

  removeHandler = ({ row }) => {
    const { recordDetails } = this.props;

    if (!_isEmpty(recordDetails)) {
      return (
        <RelationRemover
          referrer={recordDetails}
          related={row}
          relationType={row.relation_type}
          buttonContent="Remove from this serial"
        />
      );
    }
  };

  render() {
    const { relations, showMaxRows, isLoading, error, recordDetails } =
      this.props;
    const serial = relations[this.relationType] || [];

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      { title: 'Volume', field: 'volume' },
      { title: 'Actions', field: '', formatter: this.removeHandler },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RelationSerialModal
            relationType={this.relationType}
            recordDetails={recordDetails}
          />

          <ExistingRelations
            rows={serial}
            showMaxRows={showMaxRows}
            columns={columns}
            emptyMessage={
              <InfoMessage
                header="No serials"
                content="Use the button above to add this literature to a serial."
              />
            }
          />
        </Error>
      </Loader>
    );
  }
}

RelationSerial.propTypes = {
  relations: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  recordDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationSerial.defaultProps = {
  showMaxRows: 3,
  error: null,
};
