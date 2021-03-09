import { dateFormatter } from '@api/date';
import { borrowingRequestApi } from '@api/ill';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes, ILLRoutes, ProviderRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        .withState(invenioConfig.ILL_BORROWING_REQUESTS.completedStatuses)
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
        <LiteratureTitle
          title={row.metadata.document.title}
          edition={row.metadata.document.edition}
          publicationYear={row.metadata.document.publication_year}
        />
      </Link>
    );
  };

  viewProvider = ({ row }) => {
    return (
      <Link
        to={ProviderRoutes.providerDetailsFor(row.metadata.provider_pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.provider.name}
      </Link>
    );
  };

  viewDate = (date) => {
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
        title: 'Provider',
        formatter: this.viewProvider,
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
