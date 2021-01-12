import { dateFormatter } from '@api/date';
import { borrowingRequestApi } from '@api/ill';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { invenioConfig } from '@config';
import { ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default class PendingILLPatronLoanExtensions extends Component {
  componentDidMount() {
    const { fetchPendingILLPatronLoanExtensions } = this.props;
    fetchPendingILLPatronLoanExtensions();
  }

  seeAllButton = () => {
    const path = ILLRoutes.borrowingRequestListWithQuery(
      borrowingRequestApi
        .query()
        .withState(invenioConfig.ILL_BORROWING_REQUESTS.activeStatuses)
        .withPatronLoanExtensionStatus(
          invenioConfig.ILL_BORROWING_REQUESTS.extensionPendingStatuses
        )
        .qs()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={ILLRoutes.borrowingRequestDetailsFor(row.metadata.pid)}
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
      { title: 'Document ID', field: 'metadata.document_pid' },
      {
        title: 'Request start date',
        field: 'metadata.patron_loan.extension.request_date',
        formatter: dateFormatter,
      },
    ];
    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCounts={data.total}
        title="ILL - Pending patron loan extension requests"
        subtitle="ILLs with a pending extension request from a patron."
        name="pending ILL patron loan extension requests"
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

PendingILLPatronLoanExtensions.propTypes = {
  showMaxEntries: PropTypes.number,
  /* redux */
  fetchPendingILLPatronLoanExtensions: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

PendingILLPatronLoanExtensions.defaultProps = {
  showMaxEntries: 5,
  error: {},
};
