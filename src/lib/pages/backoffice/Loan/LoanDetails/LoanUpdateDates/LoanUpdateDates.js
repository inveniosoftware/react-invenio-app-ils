/*
 * SPDX-FileCopyrightText: 2020-2025 CERN.
 * SPDX-License-Identifier: MIT
 */

import { toShortDate } from '@api/date';
import { invenioConfig } from '@config';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Divider,
  Form,
  Icon,
  Message,
  Modal,
  Popup,
} from 'semantic-ui-react';
import { sessionManager } from '@authentication/services/SessionManager';
import { LocationDatePicker } from '@modules/Location';

export default class LoanUpdateDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      startDate: '',
      endDate: '',
      requestStartDate: '',
      requestExpireDate: '',
    };
  }

  today = () => {
    return toShortDate(DateTime.local());
  };

  isCancelled = () => {
    const {
      loan: { metadata },
    } = this.props;
    return metadata.state === 'CANCELLED';
  };

  isReturned = () => {
    const {
      loan: { metadata },
    } = this.props;
    return metadata.state === 'ITEM_RETURNED';
  };

  isActive = () => {
    const {
      loan: { metadata },
    } = this.props;
    return invenioConfig.CIRCULATION.loanActiveStates.includes(metadata.state);
  };

  isEditable = () => {
    return !this.isCancelled() && !this.isReturned();
  };

  handleStartDateChange = (value) => {
    this.setState(
      this.isActive() ? { startDate: value } : { requestStartDate: value }
    );
  };

  handleEndDateChange = (value) => {
    this.setState(
      this.isActive() ? { endDate: value } : { requestExpireDate: value }
    );
  };

  handleOpenModal = () => {
    const {
      loan: { metadata },
    } = this.props;
    this.setState({
      modalOpen: true,
      // Reset form state when modal is opened
      startDate: metadata.start_date,
      endDate: metadata.end_date,
      requestStartDate: metadata.request_start_date,
      requestExpireDate: metadata.request_expire_date,
    });
  };

  handleCloseModal = () => {
    const { clearError } = this.props;
    clearError();
    this.setState({ modalOpen: false });
  };

  isSelectionValid = () => {
    const { startDate, endDate, requestStartDate, requestExpireDate } =
      this.state;
    const active = this.isActive();
    const start = active ? startDate : requestStartDate;
    const end = active ? endDate : requestExpireDate;
    return start && end && DateTime.fromISO(start) < DateTime.fromISO(end);
  };

  handleUpdateLoanDates = () => {
    const {
      loan: {
        metadata: { pid },
      },
      loanUpdateDates,
    } = this.props;
    const { startDate, endDate, requestStartDate, requestExpireDate } =
      this.state;
    const data = this.isActive()
      ? {
          startDate: startDate,
          endDate: endDate,
        }
      : {
          requestStartDate: requestStartDate,
          requestExpireDate: requestExpireDate,
        };
    loanUpdateDates(pid, data);
  };

  renderWarning = (message) => {
    return <Message warning header="Warning" content={message} />;
  };

  renderHint = (message) => {
    return (
      <>
        <Divider hidden />
        <i>{message}</i>
      </>
    );
  };

  renderNotEditableMessage = () => {
    const reason = this.isCancelled()
      ? 'This loan has been cancelled.'
      : 'This loan has already been returned.';
    return (
      <Message
        info
        header="Dates cannot be edited"
        content={`${reason} Loan dates can only be edited while a loan is active or pending.`}
      />
    );
  };

  render() {
    const { isLoading, hasError, error } = this.props;
    const {
      modalOpen,
      startDate,
      endDate,
      requestStartDate,
      requestExpireDate,
    } = this.state;

    const editable = this.isEditable();
    const active = this.isActive();

    const title = active ? 'Edit loan dates' : 'Edit period of interest';
    const startLabel = active ? 'Start date' : 'Period of interest starts';
    const endLabel = active ? 'End date' : 'Period of interest ends';

    const warning =
      editable && !active && requestStartDate && requestStartDate < this.today()
        ? 'The requested start date is in the past, the loan will be cancelled.'
        : null;

    const hint = active ? 'The loan start date cannot be in the future.' : null;

    const notEditableReason = this.isCancelled()
      ? 'This loan has been cancelled.'
      : 'This loan has already been returned.';

    const editButton = (
      <Button
        icon
        primary
        labelPosition="left"
        fluid
        onClick={this.handleOpenModal}
        disabled={!editable}
      >
        <Icon name="edit" />
        {title}
      </Button>
    );

    return (
      <>
        {editable ? (
          editButton
        ) : (
          <Popup
            content={`${notEditableReason} Loan dates can only be edited while a loan is active or pending.`}
            trigger={<span>{editButton}</span>}
          />
        )}

        <Modal open={modalOpen}>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            {hasError && (
              <Message
                error
                header="Something went wrong"
                content={error.response.data.message}
              />
            )}

            {warning && this.renderWarning(warning)}

            <Form>
              <Form.Group>
                <Form.Field inline required>
                  <label>{startLabel}</label>
                  <LocationDatePicker
                    maxDate={active ? this.today() : null}
                    defaultValue={active ? startDate : requestStartDate}
                    locationPid={sessionManager.user.locationPid}
                    placeholder={startLabel}
                    handleDateChange={(value) =>
                      this.handleStartDateChange(value)
                    }
                  />
                </Form.Field>
                <Form.Field inline required>
                  <label>{endLabel}</label>
                  <LocationDatePicker
                    defaultValue={active ? endDate : requestExpireDate}
                    locationPid={sessionManager.user.locationPid}
                    placeholder={endLabel}
                    handleDateChange={(value) =>
                      this.handleEndDateChange(value)
                    }
                  />
                </Form.Field>
              </Form.Group>
              {hint && this.renderHint(hint)}
            </Form>
          </Modal.Content>
          <Modal.Actions key="modalActions">
            <Button onClick={this.handleCloseModal} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              primary
              disabled={!this.isSelectionValid() || isLoading}
              loading={isLoading}
              icon="checkmark"
              labelPosition="left"
              content="Submit"
              onClick={this.handleUpdateLoanDates}
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

LoanUpdateDates.propTypes = {
  loan: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loanUpdateDates: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

LoanUpdateDates.defaultProps = {
  error: null,
};
