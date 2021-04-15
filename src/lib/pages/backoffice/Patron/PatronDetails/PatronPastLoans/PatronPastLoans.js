import { dateFormatter } from '@api/date';
import { loanApi } from '@api/loans';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { DocumentDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/DocumentDetailsLink';
import { ItemDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/ItemDetailsLink';
import { LoanDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/LoanDetailsLink';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PatronPastLoans extends Component {
  componentDidMount() {
    const { patronDetails, fetchPatronPastLoans } = this.props;
    const patronPid = patronDetails.user_pid;
    fetchPatronPastLoans(patronPid);
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
      <LoanDetailsLink loanPid={row.metadata.pid}>
        {row.metadata.pid}
      </LoanDetailsLink>
    );
  };

  viewDocument = ({ row }) => {
    return (
      <DocumentDetailsLink pidValue={row.metadata.document_pid}>
        <LiteratureTitle
          title={row.metadata.document.title}
          edition={row.metadata.document.edition}
          publicationYear={row.metadata.document.publication_year}
        />
      </DocumentDetailsLink>
    );
  };

  viewItem = ({ row }) => {
    if (row.metadata.item_pid) {
      return (
        <ItemDetailsLink itemPid={row.metadata.item_pid.value}>
          {row.metadata.item.barcode}
        </ItemDetailsLink>
      );
    }
  };

  renderTable(data) {
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
        title: 'Physical copy',
        formatter: this.viewItem,
      },
      {
        title: 'State',
        field: 'metadata.state',
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

PatronPastLoans.propTypes = {
  patronDetails: PropTypes.object.isRequired,
  fetchPatronPastLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxLoans: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

PatronPastLoans.defaultProps = {
  showMaxLoans: 5,
  isLoading: false,
  error: null,
};
