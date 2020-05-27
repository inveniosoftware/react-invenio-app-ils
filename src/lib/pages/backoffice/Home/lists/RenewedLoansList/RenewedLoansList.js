import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Loader, Error, ResultsTable } from '@components';
import { BackOfficeRoutes } from '@routes/urls';
import { listQuery } from './state/listQuery';
import { dateFormatter } from '@api/date';
import { SeeAllButton } from '@components/backoffice/buttons';

export default class RenewedLoansList extends Component {
  componentDidMount() {
    const { fetchRenewedLoans } = this.props;
    fetchRenewedLoans();
  }

  seeAllButton = () => {
    return <SeeAllButton to={BackOfficeRoutes.loansListWithQuery(listQuery)} />;
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
      { title: 'State', field: 'metadata.state' },
      { title: 'Item Barcode', field: 'metadata.item.barcode' },
      {
        title: 'End date',
        field: 'metadata.end_date',
        formatter: dateFormatter,
      },
      { title: 'Renewals', field: 'metadata.extension_count' },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        title="Frequently renewed loans"
        subtitle="Loans renewed more than 3 times - last 7 days."
        name="frequently renewed loans"
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

RenewedLoansList.propTypes = {
  fetchRenewedLoans: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  showMaxEntries: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

RenewedLoansList.defaultProps = {
  showMaxEntries: 5,
  isLoading: false,
  error: {},
};
