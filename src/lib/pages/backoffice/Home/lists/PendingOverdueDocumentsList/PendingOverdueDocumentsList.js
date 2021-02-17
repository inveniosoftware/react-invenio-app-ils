import { documentApi } from '@api/documents';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default class PendingOverdueDocumentsList extends Component {
  componentDidMount() {
    const { fetchPendingOverdueDocuments } = this.props;
    fetchPendingOverdueDocuments();
  }

  seeAllButton = () => {
    const path = BackOfficeRoutes.documentsListWithQuery(
      documentApi.query().pendingOverdue().qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={BackOfficeRoutes.documentDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  formatDocumentTitle = ({ row }) => {
    return (
      <LiteratureTitle
        title={row.metadata.title}
        edition={row.metadata.edition}
        publicationYear={row.metadata.publication_year}
      />
    );
  };

  renderTable(data) {
    const { showMaxEntries } = this.props;
    const columns = [
      { title: '', field: '', formatter: this.viewDetails },
      { title: 'ID', field: 'metadata.pid' },
      {
        title: 'Title',
        field: 'metadata.title',
        formatter: this.formatDocumentTitle,
      },
      {
        title: 'Overdue Loans',
        field: 'metadata.circulation.overdue_loans_count',
      },
      {
        title: 'Pending Requests',
        field: 'metadata.circulation.pending_loans_count',
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Pending overdue documents"
        subtitle="Documents with pending loan requests, no available items and an active loan that's overdue."
        name="pending overdue documents"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxEntries}
      />
    );
  }

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable(data)}</Error>
      </Loader>
    );
  }
}

PendingOverdueDocumentsList.propTypes = {
  fetchPendingOverdueDocuments: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxEntries: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

PendingOverdueDocumentsList.defaultProps = {
  showMaxEntries: 5,
  isLoading: false,
  error: {},
};
