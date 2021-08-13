import { dateFormatter } from '@api/date';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCancel } from '@api/utils';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { orderApi } from '@api/acquisition';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { Loader } from '@components/Loader';
import { Link } from 'react-router-dom';
import { AcquisitionRoutes } from '@routes/urls';
import { Message } from 'semantic-ui-react';

export default class DocumentPurchaseOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: {},
      isLoading: true,
      hasError: false,
    };
  }

  componentDidMount() {
    const {
      documentDetails: { pid },
    } = this.props;
    this.fetchPurchaseOrders(pid);
  }

  componentWillUnmount() {
    this.cancellablePurchaseOrders && this.cancellablePurchaseOrders.cancel();
  }

  seeAllButton = () => {
    const {
      documentDetails: { pid },
    } = this.props;
    const path = AcquisitionRoutes.ordersListWithQuery(
      orderApi.query().withDocPid(pid).qs()
    );
    return <SeeAllButton to={path} />;
  };

  fetchPurchaseOrders = async (pid) => {
    try {
      this.cancellablePurchaseOrders = withCancel(
        orderApi.list(orderApi.query().withDocPid(pid).qs())
      );
      const response = await this.cancellablePurchaseOrders.promise;
      this.setState({
        orders: response.data,
        hasError: false,
        isLoading: false,
      });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ hasError: true, isLoading: false });
      }
    }
  };

  viewDetails = ({ row }) => {
    return <Link to={AcquisitionRoutes.orderDetailsFor(row.id)}>{row.id}</Link>;
  };

  renderTable(data) {
    const { showMaxPurchaseOrders } = this.props;
    const columns = [
      { title: 'Order', formatter: this.viewDetails },
      {
        title: 'Status',
        field: 'metadata.status',
      },
      {
        title: 'Provider',
        field: 'metadata.provider.name',
      },
      {
        title: 'Created date',
        field: 'created',
        formatter: dateFormatter,
      },
      {
        title: 'Expected delivery date',
        field: 'metadata.expected_delivery_date',
        formatter: dateFormatter,
      },
    ];

    return (
      <ResultsTable
        data={data.hits}
        columns={columns}
        totalHitsCount={data.total}
        name="Orders"
        seeAllComponent={this.seeAllButton()}
        showMaxRows={showMaxPurchaseOrders}
      />
    );
  }

  renderResultsOrEmpty(data) {
    return data.total > 0 ? (
      this.renderTable(data)
    ) : (
      <Message info icon data-test="no-results">
        <Message.Content>
          <Message.Header>No results found</Message.Header>
          There are no purchase orders.
        </Message.Content>
      </Message>
    );
  }

  renderError() {
    return (
      <Message info icon data-test="no-results">
        <Message.Content>
          <Message.Header>Error</Message.Header>
          There was an error loading the purchase orders.
        </Message.Content>
      </Message>
    );
  }

  render() {
    const { orders, isLoading, hasError } = this.state;
    return (
      <>
        <Loader isLoading={isLoading}>
          {hasError ? this.renderError() : this.renderResultsOrEmpty(orders)}
        </Loader>
      </>
    );
  }
}

DocumentPurchaseOrders.propTypes = {
  documentDetails: PropTypes.object,
  showMaxPurchaseOrders: PropTypes.number,
};

DocumentPurchaseOrders.defaultProps = {
  showMaxPurchaseOrders: 5,
};
