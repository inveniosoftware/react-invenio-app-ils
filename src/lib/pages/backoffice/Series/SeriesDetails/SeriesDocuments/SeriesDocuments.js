import { documentApi } from '@api/documents';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { DocumentDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/DocumentDetailsLink';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SeriesDocuments extends Component {
  componentDidMount() {
    const {
      fetchSeriesDocuments,
      seriesDetails: {
        metadata: { pid: seriesPid, mode_of_issuance: seriesType },
      },
    } = this.props;
    fetchSeriesDocuments(seriesPid, seriesType);
  }

  seeAllButton = () => {
    const {
      seriesDetails: {
        metadata: { pid: seriesPid, mode_of_issuance: seriesType },
      },
    } = this.props;
    const path = BackOfficeRoutes.documentsListWithQuery(
      documentApi
        .query()
        .withSeriesPid(seriesPid, seriesType)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    const recordMetadata = row.metadata;
    const titleCmp = (
      <LiteratureTitle
        title={recordMetadata.title}
        edition={recordMetadata.edition}
        publicationYear={recordMetadata.publication_year}
      />
    );
    return (
      <DocumentDetailsLink pidValue={recordMetadata.pid}>
        {titleCmp}
      </DocumentDetailsLink>
    );
  };

  volumeFormatter = ({ row }) => {
    const {
      seriesDetails: {
        metadata: { pid: seriesPid, mode_of_issuance: seriesType },
      },
    } = this.props;

    // Find the document volume for the parent series
    const relation = _get(
      row,
      `metadata.relations.${seriesType.toLowerCase()}`,
      []
    ).find(
      relation =>
        relation.pid_value === seriesPid && relation.pid_type === 'serid'
    );
    return relation ? relation.volume : '-';
  };

  render() {
    const { showMaxDocuments, seriesDocuments, isLoading, error } = this.props;
    const columns = [
      { title: 'PID', field: 'metadata.pid' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      { title: 'Volume', formatter: this.volumeFormatter },
    ];
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <ResultsTable
            data={seriesDocuments.hits}
            columns={columns}
            totalHitsCount={seriesDocuments.total}
            name="documents"
            seeAllComponent={this.seeAllButton()}
            showMaxRows={showMaxDocuments}
            renderEmptyResultsElement={() => (
              <InfoMessage
                header="No documents in this series"
                content="Start from the document details to attach it to this series"
                data-test="no-results"
              />
            )}
          />
        </Error>
      </Loader>
    );
  }
}

SeriesDocuments.propTypes = {
  showMaxDocuments: PropTypes.number,
  seriesDetails: PropTypes.object.isRequired,
  fetchSeriesDocuments: PropTypes.func.isRequired,
  seriesDocuments: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

SeriesDocuments.defaultProps = {
  showMaxDocuments: 5,
  isLoading: false,
  error: {},
};
