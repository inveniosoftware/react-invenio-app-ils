import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Modal, Label, Popup } from 'semantic-ui-react';
import { emailApi } from '@api/emails';
import { withCancel } from '@api/utils';

export default class OverdueLoanSendMailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: {},
      isModalOpen: false,
    };
  }

  componentDidMount() {
    const { loan } = this.props;
    this.fetchOverdueLoansMailReminders(loan.metadata.pid);
  }

  componentWillUnmount() {
    this.cancellableFetchReminders && this.cancellableFetchReminders.cancel();
  }

  fetchOverdueLoansMailReminders = async (loanPid) => {
    this.cancellableFetchReminders = withCancel(
      emailApi.list(
        emailApi
          .query()
          .withEmailAction('overdue_reminder')
          .withPidType('loanid')
          .withPidValue(loanPid)
          .qs()
      )
    );
    const response = await this.cancellableFetchReminders.promise;
    this.setState({ reminders: response.data });
  };

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
    const { isLoading } = this.props;
    const remindersCount = this.state.reminders.length;
    return (
      <Button
        labelPosition="right"
        fluid
        onClick={this.toggle}
        loading={isLoading}
        disabled={isLoading}
      >
        <Button
          labelPosition="left"
          fluid
          icon
          className="send-overdue-reminder-middle-button"
        >
          <Icon name="mail" />
          Send return reminder
        </Button>
        <Label basic className="send-overdue-reminder-button">
          {remindersCount}
          <Popup
            className="send-overdue-reminder-button"
            trigger={
              <Icon
                name="question circle"
                fitted
                className="send-overdue-reminder-button"
              />
            }
            content="Number of reminders sent might be inaccurate in case of queued emails not sent yet."
            position="top left"
          />
        </Label>
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
  sendOverdueLoansMailReminder: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

OverdueLoanSendMailModal.defaultProps = {
  isLoading: false,
};
