import React from 'react';
import { getDisplayVal } from '@config/invenioConfig';
import PropTypes from 'prop-types';
import { Statistic } from 'semantic-ui-react';
import { formatPrice } from '@api/utils';
import { toShortDate } from '@api/date';

export class OrderStatistics extends React.Component {
  renderStatusCancelled(status) {
    const { order } = this.props;

    return (
      <Statistic color="grey">
        <Statistic.Value>{status}</Statistic.Value>
        <Statistic.Label>Reason: {order.cancel_reason || '-'}</Statistic.Label>
      </Statistic>
    );
  }

  renderStatusReceived() {
    const { order } = this.props;

    return (
      <Statistic color="green">
        <Statistic.Label>Delivered</Statistic.Label>
        <Statistic.Value>{toShortDate(order.received_date)}</Statistic.Value>
      </Statistic>
    );
  }

  renderStatusOrdered() {
    const { order } = this.props;

    return (
      <Statistic color="yellow">
        <Statistic.Label>Expected delivery</Statistic.Label>
        <Statistic.Value>
          {toShortDate(order.expected_delivery_date)}
        </Statistic.Value>
      </Statistic>
    );
  }

  renderStatusPending(status) {
    return (
      <Statistic>
        <Statistic.Label>Status</Statistic.Label>
        <Statistic.Value>{status}</Statistic.Value>
      </Statistic>
    );
  }

  renderStatus() {
    const { status } = this.props.order;
    const humanReadableStatus = getDisplayVal('acqOrders.statuses', status);
    switch (status) {
      case 'CANCELLED':
        return this.renderStatusCancelled(humanReadableStatus);
      case 'PENDING':
        return this.renderStatusPending(humanReadableStatus);
      case 'ORDERED':
        return this.renderStatusOrdered();
      case 'RECEIVED':
        return this.renderStatusReceived();
      default:
        return null;
    }
  }

  renderItemCount() {
    const { order } = this.props;
    let received = 0;
    let ordered = 0;
    for (const orderLine of order.order_lines) {
      received += orderLine.copies_received || 0;
      ordered += orderLine.copies_ordered || 0;
    }
    return (
      <Statistic>
        <Statistic.Label>Received</Statistic.Label>
        <Statistic.Value>
          {received}/{ordered}
        </Statistic.Value>
        <Statistic.Label>copies</Statistic.Label>
      </Statistic>
    );
  }

  renderGrandTotal() {
    const { order } = this.props;

    return (
      <Statistic>
        <Statistic.Label>Total</Statistic.Label>
        <Statistic.Value>
          {formatPrice(order.grand_total, false)}
        </Statistic.Value>
        <Statistic.Label>{order.grand_total.currency}</Statistic.Label>
      </Statistic>
    );
  }

  render() {
    const {
      order: { status },
    } = this.props;
    const widths = status === 'CANCELLED' ? 'one' : 'three';
    return (
      <Statistic.Group widths={widths} className="detail-statistics">
        {this.renderStatus()}
        {status !== 'CANCELLED' && this.renderItemCount()}
        {status !== 'CANCELLED' && this.renderGrandTotal()}
      </Statistic.Group>
    );
  }
}

OrderStatistics.propTypes = {
  order: PropTypes.object.isRequired,
};
