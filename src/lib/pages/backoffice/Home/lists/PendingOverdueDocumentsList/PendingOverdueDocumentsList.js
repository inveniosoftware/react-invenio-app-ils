import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { documentApi } from '@api/documents';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class PendingOverdueDocumentsList extends Component {
  componentDidMount() {
    const { fetchPendingOverdueDocuments } = this.props;
    fetchPendingOverdueDocuments();
  }

  seeAllButton = () => {
    const path = BackOfficeRoutes.documentsListWithQuery(
      documentApi
        .query()
        .pendingOverdue()
        .qs()
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

  renderTable(data) {
    const { showMaxEntries } = this.props;
    const columns = [
      { title: '', field: '', formatter: this.viewDetails },
      { title: 'ID', field: 'metadata.pid' },
      { title: 'Title', field: 'metadata.title' },
      { title: 'Overdue Loans', field: 'metadata.circulation.overdue_loans' },
      {
        title: 'Pending Requests',
        field: 'metadata.circulation.pending_loans',
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
