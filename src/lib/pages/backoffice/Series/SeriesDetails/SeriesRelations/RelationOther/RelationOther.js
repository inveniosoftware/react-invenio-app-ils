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
import { RelationOtherModal } from '../RelationOther/RelationOtherModal';

export default class RelationOther extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'other';
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
    const { seriesDetails } = this.props;

    if (!_isEmpty(seriesDetails)) {
      return (
        <RelationRemover
          referrer={seriesDetails}
          related={row}
          relationType={row.relation_type}
          buttonContent="Remove relation"
        />
      );
    }
  };

  render() {
    const { relations, showMaxRows, isLoading, error } = this.props;
    const other = relations[this.relationType] || [];

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      {
        title: 'Note',
        field: 'note',
      },
      { title: 'Actions', field: '', formatter: this.removeHandler },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RelationOtherModal relationType={this.relationType} />

          <ExistingRelations
            rows={other}
            showMaxRows={showMaxRows}
            columns={columns}
            emptyMessage={
              <InfoMessage
                header="No relations"
                content="Use the button above to add relations."
              />
            }
          />
        </Error>
      </Loader>
    );
  }
}

RelationOther.propTypes = {
  relations: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationOther.defaultProps = {
  showMaxRows: 3,
  error: null,
};
