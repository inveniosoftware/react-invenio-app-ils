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

export default class PatronCurrentLoans extends Component {
  componentDidMount() {
    const { patronDetails, fetchPatronCurrentLoans } = this.props;
    const patronPid = patronDetails.user_pid ? patronDetails.user_pid : null;
    fetchPatronCurrentLoans(patronPid);
  }

  seeAllButton = () => {
    const { patronDetails } = this.props;
    const patronPid = patronDetails.user_pid;
    const path = BackOfficeRoutes.loansListWithQuery(
      loanApi
        .query()
        .withPatronPid(patronPid)
        .withState(invenioConfig.CIRCULATION.loanActiveStates)
        .sortByNewest()
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

  render() {
    const { data, isLoading, error, showMaxLoans } = this.props;
    const columns = [
      {
        title: 'Loan',
        formatter: this.viewDetails,
      },
      {
        title: 'Document',
        formatter: this.viewDocument,
      },
      {
        title: 'Item barcode',
        formatter: ({ row }) => (
          <Link
            to={BackOfficeRoutes.itemDetailsFor(row.metadata.item_pid.value)}
          >
            {row.metadata.item.barcode}
          </Link>
        ),
      },
      {
        title: 'Start date',
        field: 'metadata.start_date',
        formatter: dateFormatter,
      },
      {
        title: 'End date',
        field: 'metadata.end_date',
        formatter: dateFormatter,
      },
      { title: 'Renewals', field: 'metadata.extension_count' },
    ];
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <ResultsTable
            data={data.hits}
            columns={columns}
            totalHitsCount={data.total}
            name="current loans"
            seeAllComponent={this.seeAllButton()}
            showMaxRows={showMaxLoans}
          />
        </Error>
      </Loader>
    );
  }
}

PatronCurrentLoans.propTypes = {
  patronDetails: PropTypes.object.isRequired,
  fetchPatronCurrentLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxLoans: PropTypes.number,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
};

PatronCurrentLoans.defaultProps = {
  showMaxLoans: 5,
  error: null,
  isLoading: false,
};
