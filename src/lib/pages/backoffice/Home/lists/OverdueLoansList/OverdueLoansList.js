import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { invenioConfig } from '@config';
import { loanApi } from '@api/loans';
import { dateFormatter } from '@api/date';
import { BackOfficeRoutes } from '@routes/urls';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { OverdueLoanSendMailModal } from '@modules/Loan/backoffice/OverdueLoanSendMailModal';

export default class OverdueLoansList extends Component {
  componentDidMount() {
    const { fetchOverdueLoans } = this.props;
    fetchOverdueLoans();
  }

  seeAllButton = () => {
    const path = BackOfficeRoutes.loansListWithQuery(
      loanApi
        .query()
        .overdue()
        .withState(invenioConfig.CIRCULATION.loanActiveStates)
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={BackOfficeRoutes.loanDetailsFor(row.metadata.pid)}
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
      { title: 'Patron ID', field: 'metadata.patron_pid' },
      { title: 'Item Barcode', field: 'metadata.item.barcode' },
      {
        title: 'End date',
        field: 'metadata.end_date',
        formatter: dateFormatter,
      },
      {
        title: 'Actions',
        field: '',
        formatter: ({ row }) => <OverdueLoanSendMailModal loan={row} />,
      },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Overdue loans"
        subtitle="Active loans that passed their end date."
        name="overdue loans"
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

OverdueLoansList.propTypes = {
  showMaxEntries: PropTypes.number,
  /* redux */
  fetchOverdueLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

OverdueLoansList.defaultProps = {
  showMaxEntries: 5,
  error: {},
  isLoading: false,
};
