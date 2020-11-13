import { orderApi } from '@api/acquisition';
import { sessionManager } from '@authentication/services/SessionManager';
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
import * as Yup from 'yup';

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

const OrderSchema = Yup.object().shape({
  vendor: Yup.object().shape({
    pid: Yup.string().required(),
  }),
  status: Yup.string().required(),
  order_date: Yup.date().required(),
  expected_delivery_date: Yup.date(),
  received_date: Yup.date(),
  funds: Yup.array().of(Yup.string().required()),
  payment: Yup.object().shape({
    mode: Yup.string().required(),
  }),
  order_lines: Yup.array().of(
    Yup.object().shape({
      document: Yup.object().shape({
        pid: Yup.string().required(),
      }),
      medium: Yup.string().required(),
      unit_price: Yup.object().shape({
        value: Yup.number().required(),
      }),
      total_price: Yup.object().shape({
        value: Yup.number().required(),
      }),
      recipient: Yup.string().required(),
    })
  ),
});

export class OrderForm extends Component {
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
        validationSchema={OrderSchema}
        buttons={this.buttons}
      >
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Header attached="top" as="h3">
                Order information
              </Header>
              <Segment attached>
                <OrderInfo />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Header attached="top" as="h3">
                Payment information
              </Header>
              <Segment attached>
                <Payment />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Header attached="top" as="h3">
          Order lines
        </Header>
        <OrderLines isCreate={isCreate} />
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
