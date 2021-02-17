import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Modal } from 'semantic-ui-react';

export default class OverdueLoanSendMailModal extends Component {
  state = { isModalOpen: false };

  toggle = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  sendMail = async () => {
    const { loan, sendOverdueLoansMailReminder } = this.props;
    this.toggle();
    sendOverdueLoansMailReminder({
      loanPid: loan.metadata.pid,
    });
  };

  renderTrigger = () => {
    const { buttonTriggerText } = this.props;
    return (
      <Button
        size="small"
        icon
        labelPosition="left"
        title="Send a reminder email to the user of the loan"
        onClick={this.toggle}
        className="send-overdue-reminder-button"
      >
        <Icon name="mail" />
        {buttonTriggerText ? buttonTriggerText : 'Reminder'}
      </Button>
    );
  };

  render() {
    const { loan } = this.props;
    const { isModalOpen } = this.state;
    if (!loan.metadata.is_overdue || _isEmpty(loan.metadata.item)) return null;
    return (
      <Modal trigger={this.renderTrigger()} open={isModalOpen}>
        <Modal.Header>E-mail reminder</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              Overdue loan for the literature:
              <strong>
                <Link
                  to={BackOfficeRoutes.documentDetailsFor(
                    loan.metadata.document.pid
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LiteratureTitle
                    title={loan.metadata.document.title}
                    edition={loan.metadata.document.edition}
                    publicationYear={loan.metadata.document.publication_year}
                  />
                </Link>
              </strong>
            </p>
            <p>
              {'Do you want to send a reminder e-mail to '}
              <strong>
                <Link
                  to={BackOfficeRoutes.patronDetailsFor(
                    loan.metadata.patron_pid
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {loan.metadata.patron.name}
                </Link>
              </strong>
              ?
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.toggle}>
            <Icon name="cancel" /> Cancel
          </Button>
          <Button color="green" onClick={this.sendMail}>
            <Icon name="send" /> Send
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

OverdueLoanSendMailModal.propTypes = {
  loan: PropTypes.object.isRequired,
  buttonTriggerText: PropTypes.string,
  sendOverdueLoansMailReminder: PropTypes.func.isRequired,
};

OverdueLoanSendMailModal.defaultProps = {
  buttonTriggerText: 'Send reminder',
};
