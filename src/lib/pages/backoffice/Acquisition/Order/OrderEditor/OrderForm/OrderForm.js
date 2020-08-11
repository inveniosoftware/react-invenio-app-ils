import { orderApi } from '@api/acquisition';
import { withCancel } from '@api/utils';
import { vocabularyApi } from '@api/vocabularies';
import { sessionManager } from '@authentication/services/SessionManager';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { BaseForm } from '@forms/core/BaseForm';
import { goTo } from '@history';
import { AcquisitionRoutes } from '@routes/urls';
import { getIn } from 'formik';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { OrderInfo } from './OrderInfo';
import { OrderLines } from './OrderLines';
import { Payment } from './Payment';

const orderSubmitSerializer = values => {
  const submitValues = { ...values };

  _isEmpty(values.vendor)
    ? (submitValues.vendor_pid = undefined)
    : (submitValues.vendor_pid = values.vendor.pid);
  _isEmpty(values.order_lines)
    ? (submitValues.order_lines = undefined)
    : (submitValues.order_lines = values.order_lines.map(line => {
        if (line.document) {
          line.document_pid = _has(line.document, 'id')
            ? line.document.id
            : line.document.pid;
        }
        if (line.patron) {
          line.patron_pid = _has(line.patron, 'id')
            ? line.patron.id
            : line.patron.pid;
        }
        return line;
      }));

  return submitValues;
};

export class OrderForm extends Component {
  state = {
    isLoading: true,
    // eslint-disable-next-line react/no-unused-state
    error: null,
    currencies: [],
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentWillUnmount() {
    this.cancellableFetchData && this.cancellableFetchData.cancel();
  }

  get buttons() {
    const { pid: isEditing } = this.props;
    if (isEditing) {
      return [
        {
          name: 'update',
          content: 'Update order',
          primary: true,
          type: 'submit',
        },
      ];
    }

    return [
      {
        name: 'create',
        content: 'Create order',
        primary: true,
        type: 'submit',
      },
    ];
  }

  query = () => {
    const searchQuery = vocabularyApi
      .query()
      .withType(invenioConfig.VOCABULARIES.currencies)
      .qs();
    return vocabularyApi.list(searchQuery);
  };

  serializer = hit => ({
    key: hit.metadata.key,
    value: hit.metadata.key,
    text: hit.metadata.key,
  });

  fetchCurrencies = async () => {
    this.cancellableFetchData = withCancel(this.query());
    try {
      const response = await this.cancellableFetchData.promise;
      const currencies = response.data.hits.map(hit => this.serializer(hit));
      // eslint-disable-next-line react/no-unused-state
      this.setState({ isLoading: false, currencies: currencies, error: null });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          isloading: false,
          currencies: [
            { key: '', value: '', text: 'Failed to load currencies.' },
          ],
          // eslint-disable-next-line react/no-unused-state
          error: {
            content: 'Failed to load currencies.',
            pointing: 'above',
          },
        });
      }
    }
  };

  createOrder = data => {
    return orderApi.create(data);
  };

  updateOrder = (pid, data) => {
    return orderApi.update(pid, data);
  };

  successCallback = response => {
    goTo(
      AcquisitionRoutes.orderDetailsFor(getIn(response, 'data.metadata.pid'))
    );
  };

  getDefaultValues() {
    return {
      create_by: sessionManager.user.id,
    };
  }

  render() {
    const { currencies, isLoading } = this.state;
    const { successSubmitMessage, data, title, pid, isCreate } = this.props;

    return (
      <BaseForm
        initialValues={data ? data.metadata : this.getDefaultValues()}
        editApiMethod={this.updateOrder}
        createApiMethod={this.createOrder}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid}
        submitSerializer={orderSubmitSerializer}
        buttons={this.buttons}
      >
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <Segment raised>
                <Header dividing>Order information</Header>
                <Loader isLoading={isLoading}>
                  <OrderInfo currencies={currencies} />
                </Loader>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Header dividing>Payment information</Header>
                <Loader isLoading={isLoading}>
                  <Payment currencies={currencies} />
                </Loader>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Header dividing>Order lines</Header>
        <Loader isLoading={isLoading}>
          <OrderLines isCreate={isCreate} currencies={currencies} />
        </Loader>
      </BaseForm>
    );
  }
}

OrderForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
  isCreate: PropTypes.bool,
};

OrderForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
  isCreate: false,
};
