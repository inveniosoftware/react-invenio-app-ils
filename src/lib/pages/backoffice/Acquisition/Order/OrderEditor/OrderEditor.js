import { orderApi } from '@api/acquisition';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { OrderForm } from './OrderForm';

export class OrderEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.orderPid,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { orderPid },
      },
    } = this.props;
    if (orderPid) {
      this.fetchOrder(orderPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchOrder && this.cancellableFetchOrder.cancel();
  }

  fetchOrder = async orderPid => {
    this.cancellableFetchOrder = withCancel(orderApi.get(orderPid));
    try {
      const response = await this.cancellableFetchOrder.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  renderForm = pid => {
    const { isLoading, error, data } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <OrderForm
            pid={pid}
            data={data}
            title="Edit order"
            successSubmitMessage="The order was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  get documentRequest() {
    const request = _get(this.props, 'location.state', null);
    if (!request) return null;
    return {
      documentRequestPid: request.pid,
      metadata: {
        order_lines: [
          {
            document_pid: _get(request, 'metadata.document_pid'),
          },
        ],
      },
    };
  }

  render() {
    const {
      match: {
        params: { orderPid },
      },
    } = this.props;
    const isEditForm = !!orderPid;
    return isEditForm ? (
      this.renderForm(orderPid)
    ) : (
      <OrderForm
        title="Create new acquisition order"
        successSubmitMessage="The order was successfully created."
        data={this.documentRequest}
        isCreate
      />
    );
  }
}

OrderEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderPid: PropTypes.string,
    }),
  }).isRequired,
};
