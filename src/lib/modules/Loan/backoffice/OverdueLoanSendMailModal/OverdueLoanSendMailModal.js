import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, Modal, Button, Icon } from 'semantic-ui-react';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';

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
        <Modal.Header>Email notification</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              {'Loan on '}
              <Link
                to={BackOfficeRoutes.documentDetailsFor(
                  loan.metadata.document.pid
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiteratureTitle
                  className="overdue-modal-text"
                  title={loan.metadata.document.title}
                  edition={loan.metadata.document.edition}
                  publicationYear={loan.metadata.document.publication_year}
                  displayInlineBlock
                />
              </Link>
              {' is overdue!'}
            </Header>
            <p>
              {'An email reminder will be sent to '}
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
              !
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
