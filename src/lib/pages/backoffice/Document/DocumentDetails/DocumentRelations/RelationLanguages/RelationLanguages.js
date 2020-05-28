import { Error, Loader } from '@components';
import { DocumentLanguages, DocumentTitle } from '@modules/Document';
import { DocumentDetailsLink, InfoMessage } from '@components/backoffice';
import {
  ExistingRelations,
  RelationRemover,
} from '@modules/Relations/backoffice';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { RelationLanguagesModal } from '../RelationLanguages';

export default class RelationLanguage extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'language';
  }

  viewDetails = ({ row }) => {
    return (
      <DocumentDetailsLink pidValue={row.pid_value}>
        <DocumentTitle metadata={row.record_metadata} />
      </DocumentDetailsLink>
    );
  };

  removeHandler = ({ row }) => {
    const { documentDetails } = this.props;

    if (!isEmpty(documentDetails)) {
      return (
        <RelationRemover
          referrer={documentDetails}
          related={row}
          relationType={row.relation_type}
          buttonContent="Remove relation"
        />
      );
    }
  };

  languagesFormatter = ({ row }) => {
    return <DocumentLanguages metadata={row.record_metadata} />;
  };

  render() {
    const { relations, showMaxRows, isLoading, error } = this.props;
    const languages = relations[this.relationType] || [];

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      {
        title: 'Language(s)',
        field: 'languages',
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
  documentDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationLanguage.defaultProps = {
  showMaxRows: 3,
  error: null,
};
