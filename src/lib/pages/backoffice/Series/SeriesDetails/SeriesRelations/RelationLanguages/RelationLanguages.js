import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { SeriesLanguages } from '@modules/Series/SeriesLanguages';
import { SeriesDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/SeriesDetailsLink';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { ExistingRelations } from '@modules/Relations/backoffice/components/ExistingRelations';
import { RelationRemover } from '@modules/Relations/backoffice/components/RelationRemover';
import DocumentTitle from '@modules/Document/DocumentTitle';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { RelationLanguagesModal } from '../RelationLanguages/RelationLanguagesModal';

export default class RelationLanguage extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'language';
  }

  viewDetails = ({ row }) => {
    return (
      <SeriesDetailsLink pidValue={row.pid_value}>
        <DocumentTitle metadata={row.record_metadata} />
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

  languagesFormatter = ({ row }) => {
    return <SeriesLanguages languages={row.record_metadata.languages} />;
  };

  render() {
    const { relations, showMaxRows, isLoading, error } = this.props;
    const languages = relations[this.relationType] || [];

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      {
        title: 'Language(s)',
        field: '',
        formatter: this.languagesFormatter,
      },
      { title: 'Actions', field: '', formatter: this.removeHandler },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RelationLanguagesModal relationType={this.relationType} />

          <ExistingRelations
            rows={languages}
            showMaxRows={showMaxRows}
            columns={columns}
            emptyMessage={
              <InfoMessage
                header="No related languages"
                content="Use the button above to add related languages."
              />
            }
          />
        </Error>
      </Loader>
    );
  }
}

RelationLanguage.propTypes = {
  relations: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationLanguage.defaultProps = {
  showMaxRows: 3,
  error: null,
};
