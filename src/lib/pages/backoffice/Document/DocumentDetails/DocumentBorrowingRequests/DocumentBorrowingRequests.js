import { dateFormatter } from '@api/date';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { borrowingRequestApi } from '@api/ill';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { Loader } from '@components/Loader';
import { Link } from 'react-router-dom';
import { ILLRoutes } from '@routes/urls';
import { invenioConfig } from '@config';
import _difference from 'lodash/difference';
import { InfoMessage } from '@components/backoffice/InfoMessage';

export default class DocumentBorrowingRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      borrowingRequests: {},
      isLoading: true,
      hasError: false,
    };
  }

  componentDidMount() {
    this.fetchBorrowingRequests();
  }

  componentWillUnmount() {
    this.cancellableBorrowingRequests &&
      this.cancellableBorrowingRequests.cancel();
  }

  currentBorrowingRequestsQuery = () => {
    const {
      documentDetails: { pid },
    } = this.props;
    const illConfig = invenioConfig.ILL_BORROWING_REQUESTS;
    const statuses = _difference(
      illConfig.orderedValidStatuses,
      illConfig.completedStatuses
    );
    return borrowingRequestApi.list(
      borrowingRequestApi.query().withDocPid(pid).withState(statuses).qs()
    );
  };

  fetchBorrowingRequests = async () => {
    try {
      this.cancellableBorrowingRequests = withCancel(
        this.currentBorrowingRequestsQuery()
      );
      const response = await this.cancellableBorrowingRequests.promise;
      this.setState({
        borrowingRequests: response.data,
        hasError: false,
        isLoading: false,
      });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ hasError: true, isLoading: false });
      }
    }
  };

  seeAllButton = () => {
    const path = ILLRoutes.borrowingRequestListWithQuery(
      this.currentBorrowingRequestsQuery()
    );
    return <SeeAllButton to={path} />;
  };

  viewDetails = ({ row }) => {
    return (
      <Link to={ILLRoutes.borrowingRequestDetailsFor(row.id)}>{row.id}</Link>
    );
  };

  renderTable(data) {
    const { showMaxBorrowingRequests } = this.props;
    const columns = [
      {
        title: 'Loan',
        formatter: this.viewDetails,
      },
      {
        title: 'Provider',
        formatter: 'metadata.provider.name',
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
        formatter: dateFormatter,
      },
      {
        title: 'Expected delivery',
        field: 'metadata.expected_delivery_date',
        formatter: dateFormatter,
      },
      {
        title: 'Received on',
        field: 'metadata.received_date',
        formatter: dateFormatter,
      },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="ongoing interlibrary loans"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxBorrowingRequests}
      />
    );
  }

  render() {
    const { borrowingRequests, isLoading, hasError } = this.state;
    return (
      <Loader isLoading={isLoading}>
        {hasError ? (
          <InfoMessage
            header="Error"
            content="There was an error loading the ongoing interlibrary loans."
          />
        ) : (
          this.renderTable(borrowingRequests)
        )}
      </Loader>
    );
  }
}

DocumentBorrowingRequests.propTypes = {
  documentDetails: PropTypes.object.isRequired,
  showMaxBorrowingRequests: PropTypes.number,
};

DocumentBorrowingRequests.defaultProps = {
  showMaxBorrowingRequests: 5,
};
