import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import Overridable from 'react-overridable';

export class LoanPendingRequestAmount extends Component {
  render() {
    const { circulation } = this.props;

    const pendingLoansExist = circulation.pending_loans_count > 0;

    return pendingLoansExist ? (
      <Overridable id="LoanPendingRequestsAmount.layout">
        <List.Item>
          <List.Icon name="clock" />
          <List.Content>
            <span>{circulation.pending_loans_count} </span>
            user(s) waiting for this literature
          </List.Content>
        </List.Item>
      </Overridable>
    ) : null;
  }
}

LoanPendingRequestAmount.propTypes = {
  circulation: PropTypes.object.isRequired,
};

export default Overridable.component(
  'LoanPendingRequestAmount',
  LoanPendingRequestAmount
);
