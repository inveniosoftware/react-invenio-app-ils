import { getDisplayVal, invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import { Statistic } from 'semantic-ui-react';

export class BorrowingRequestStatistics extends React.Component {
  renderStatusCancelled(status) {
    const {
      brwReq: { cancel_reason: cancelReason },
    } = this.props;
    return (
      <Statistic color="grey">
        <Statistic.Value>{status}</Statistic.Value>
        <Statistic.Label>Reason: {cancelReason || '-'}</Statistic.Label>
      </Statistic>
    );
  }

  renderStatusOthers(status) {
    return (
      <Statistic>
        <Statistic.Label>Status</Statistic.Label>
        <Statistic.Value>{status}</Statistic.Value>
      </Statistic>
    );
  }

  renderStatus() {
    const {
      brwReq: { status },
    } = this.props;
    const humanReadableStatus = getDisplayVal(
      'ILL_BORROWING_REQUESTS.statuses',
      status
    );
    switch (status) {
      case 'PENDING':
      case 'REQUESTED':
      case 'ON_LOAN':
      case 'RETURNED':
        return this.renderStatusOthers(humanReadableStatus);
      case 'CANCELLED':
        return this.renderStatusCancelled(humanReadableStatus);
      default:
        return null;
    }
  }

  renderDueDate() {
    const {
      brwReq: { due_date: dueDate },
    } = this.props;
    const title = invenioConfig.ILL_BORROWING_REQUESTS.fieldOverrides.due_date;
    return (
      <Statistic>
        <Statistic.Label>{title}</Statistic.Label>
        <Statistic.Value>{dueDate ? dueDate : '-'}</Statistic.Value>
      </Statistic>
    );
  }

  render() {
    const {
      brwReq: { status },
    } = this.props;
    const widths = status === 'CANCELLED' ? 'one' : 'two';
    return (
      <Statistic.Group widths={widths} className="detail-statistics">
        {this.renderStatus()}
        {status !== 'CANCELLED' && this.renderDueDate()}
      </Statistic.Group>
    );
  }
}

BorrowingRequestStatistics.propTypes = {
  brwReq: PropTypes.object.isRequired,
};
