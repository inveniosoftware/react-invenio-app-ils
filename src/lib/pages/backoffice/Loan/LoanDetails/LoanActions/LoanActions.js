import { OverdueLoanSenNotificationModal } from '@modules/Loan/backoffice/OverdueLoanSendNotificationModal';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'semantic-ui-react';
import { omit } from 'lodash/object';
import { CancelModal } from '@components/CancelModal';
import _isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';

export default class LoanActions extends Component {
  renderAvailableActions(pid, patronPid, documentPid, itemPid, actions = {}) {
    const { performLoanAction, isLoading } = this.props;

    // omit checkout because it must done in one of the available items
    if (!itemPid) {
      actions = omit(actions, 'checkout');
    }

    return Object.keys(actions).map((action) => {
      const cancelAction = (cancelReason = null) =>
        performLoanAction(actions[action], documentPid, patronPid, {
          cancelReason: cancelReason,
        });
      const loanAction = () =>
        performLoanAction(actions[action], documentPid, patronPid);
      return (
        <List.Item key={action}>
          {action === 'cancel' ? (
            <CancelModal
              header={`Cancel Loan #${pid}`}
              content={`You are about to cancel loan #${pid}.
                Please enter a reason for cancelling this loan.`}
              cancelText="Cancel Loan"
              buttonText={capitalize('cancel')}
              action={cancelAction}
              isLoading={isLoading}
            />
          ) : (
            <Button
              size="small"
              fluid
              primary
              onClick={loanAction}
              loading={isLoading}
              disabled={isLoading}
            >
              {capitalize(action)}
            </Button>
          )}
        </List.Item>
      );
    });
  }

  render() {
    const { loanDetails } = this.props;
    const { availableActions, pid } = loanDetails;
    const { document_pid, item_pid, patron_pid } = loanDetails.metadata;

    const loanActions = !_isEmpty(availableActions) && (
      <List>
        {this.renderAvailableActions(
          pid,
          patron_pid,
          document_pid,
          item_pid,
          availableActions
        )}
      </List>
    );
    const sendReminderButton = loanDetails.metadata.is_overdue && (
      <OverdueLoanSenNotificationModal loan={loanDetails} />
    );
    if (!_isEmpty(availableActions) || loanDetails.metadata.is_overdue) {
      return (
        <>
          {loanActions}
          {sendReminderButton}
        </>
      );
    } else {
      return (
        <InfoMessage
          fluid
          header="No actions available."
          content={"The loan can't be changed in its current state."}
        />
      );
    }
  }
}

LoanActions.propTypes = {
  loanDetails: PropTypes.object.isRequired,
  performLoanAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

LoanActions.defaultProps = {
  isLoading: false,
};
