import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { loanApi } from '@api/loans';
import { dateFormatter } from '@api/date';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';

export default class DocumentPendingLoans extends Component {
  componentDidMount() {
    const {
      documentDetails: { pid },
      fetchPendingLoans,
    } = this.props;
    fetchPendingLoans(pid);
  }

  seeAllButton = () => {
    const {
      documentDetails: { pid },
    } = this.props;
    const path = BackOfficeRoutes.loansListWithQuery(
      loanApi
        .query()
        .withDocPid(pid)
        .withState(invenioConfig.CIRCULATION.loanRequestStates)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Link
        to={BackOfficeRoutes.loanDetailsFor(row.metadata.pid)}
        data-test={row.metadata.pid}
      >
        {row.metadata.pid}
      </Link>
    );
  };

  renderTable(data) {
    const { showMaxPendingLoans } = this.props;
    const columns = [
      { title: 'Loan ID', field: 'metadata.pid', formatter: this.viewDetails },
      {
        title: 'Patron',
        field: 'metadata.patron.name',
        formatter: ({ row }) => (
          <Link to={BackOfficeRoutes.patronDetailsFor(row.metadata.patron_pid)}>
            {row.metadata.patron.name}
          </Link>
        ),
      },
      {
        title: 'Request start date',
        field: 'metadata.request_start_date',
        formatter: dateFormatter,
      },
      {
        title: 'Request end date',
        field: 'metadata.request_expire_date',
        formatter: dateFormatter,
      },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="pending loan requests"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxPendingLoans}
      />
    );
  }

  render() {
    const { documentPendingLoans, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>{this.renderTable(documentPendingLoans)}</Error>
      </Loader>
    );
  }
}

DocumentPendingLoans.propTypes = {
  documentPendingLoans: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  fetchPendingLoans: PropTypes.func.isRequired,
  showMaxPendingLoans: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

DocumentPendingLoans.defaultProps = {
  showMaxPendingLoans: 5,
  isLoading: false,
  error: null,
};
