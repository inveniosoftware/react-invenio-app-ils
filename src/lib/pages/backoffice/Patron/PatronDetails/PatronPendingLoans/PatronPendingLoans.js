import { dateFormatter } from '@api/date';
import { loanApi } from '@api/loans';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PatronPendingLoans extends Component {
  componentDidMount() {
    const { patronDetails, fetchPatronPendingLoans } = this.props;
    const patronPid = patronDetails.user_pid ? patronDetails.user_pid : null;
    fetchPatronPendingLoans(patronPid);
  }

  seeAllButton = () => {
    const { patronDetails } = this.props;

    const patronPid = patronDetails.user_pid;
    const path = BackOfficeRoutes.loansListWithQuery(
      loanApi
        .query()
        .withPatronPid(patronPid)
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

  renderTable(data) {
    const columns = [
      {
        title: 'Loan request PID',
        formatter: this.viewDetails,
      },
      {
        title: 'Document',
        formatter: this.viewDocument,
      },
      {
        title: 'Request interest from',
        field: 'metadata.request_start_date',
        formatter: dateFormatter,
      },
      {
        title: 'Request expires on',
        field: 'metadata.request_expire_date',
        formatter: dateFormatter,
      },
    ];
    const { showMaxLoans } = this.props;
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="loan requests"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxLoans}
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

PatronPendingLoans.propTypes = {
  patronDetails: PropTypes.object.isRequired,
  fetchPatronPendingLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxLoans: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

PatronPendingLoans.defaultProps = {
  showMaxLoans: 5,
  isLoading: false,
  error: null,
};
