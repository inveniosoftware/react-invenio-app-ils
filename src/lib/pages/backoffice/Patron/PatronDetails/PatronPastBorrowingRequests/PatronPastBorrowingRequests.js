import { dateFormatter } from '@api/date';
import { DocumentTitle } from '@modules/Document/DocumentTitle';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { illBorrowingRequestApi as borrowingRequestApi } from '@api';
import { invenioConfig } from '@config';
import { ILLRoutes, BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class PatronPastBorrowingRequests extends Component {
  componentDidMount() {
    const { patronDetails, fetchPatronPastBorrowingRequests } = this.props;
    const patronPid = patronDetails.user_pid ? patronDetails.user_pid : null;
    fetchPatronPastBorrowingRequests(patronPid);
  }

  seeAllButton = () => {
    const { patronDetails } = this.props;
    const patronPid = patronDetails.user_pid;
    const path = ILLRoutes.borrowingRequestListWithQuery(
      borrowingRequestApi
        .query()
        .withPatron(patronPid)
        .withState(invenioConfig.illBorrowingRequests.completedStatuses)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Link
        to={ILLRoutes.borrowingRequestDetailsFor(row.metadata.pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.pid}
      </Link>
    );
  };

  viewDocument = ({ row }) => {
    return (
      <Link
        to={BackOfficeRoutes.documentDetailsFor(row.metadata.document_pid)}
        data-test={row.metadata.pid}
      >
        <DocumentTitle metadata={row.metadata.document} />
      </Link>
    );
  };

  viewLibrary = ({ row }) => {
    return (
      <Link
        to={ILLRoutes.libraryDetailsFor(row.metadata.library_pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.library.name}
      </Link>
    );
  };

  viewDate = date => {
    return <> {dateFormatter({ ...date }, '-')} </>;
  };

  renderTable(data) {
    const columns = [
      {
        title: 'PID',
        formatter: this.viewDetails,
      },
      {
        title: 'Document',
        formatter: this.viewDocument,
      },
      {
        title: 'Library',
        formatter: this.viewLibrary,
      },
      {
        title: 'Created on',
        field: 'created',
        formatter: dateFormatter,
      },
      {
        title: 'State',
        field: 'metadata.status',
      },
      {
        title: 'Requested on',
        field: 'metadata.request_date',
        formatter: this.viewDate,
      },
      {
        title: 'Received on',
        field: 'metadata.received_date',
        formatter: this.viewDate,
      },
    ];

    const { showMaxRequests } = this.props;

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="past borrowing requests"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxRequests}
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

PatronPastBorrowingRequests.propTypes = {
  showMaxRequests: PropTypes.number,
  // from redux
  patronDetails: PropTypes.object.isRequired,
  fetchPatronPastBorrowingRequests: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

PatronPastBorrowingRequests.defaultProps = {
  showMaxRequests: 5,
  error: null,
};
