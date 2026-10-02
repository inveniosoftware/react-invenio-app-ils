/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Label, Message, Popup } from 'semantic-ui-react';
import { PopupIcon } from '@components/PopupIcon';
import LoansListItem from '../LoansListEntry';
import { BrwReqLoanExtendButton } from './BrwReqLoanExtendButton';
import { LoanExtendButton } from './LoanExtendButton';
import { DateTime } from 'luxon';

export default class LoansListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { actionMsgOpened: false, actionMsg: '' };
  }

  showSuccess = (msg) => {
    const { onSuccess } = this.props;
    // trigger a refresh of the list of the results
    onSuccess(msg);
  };

  showError = (msg) => {
    this.setState({
      actionMsgOpened: true,
      actionMsg: (
        <Message negative>
          <Message.Header>Request failed!</Message.Header>
          {msg}
        </Message>
      ),
    });
  };

  hideError = () => {
    this.setState({
      actionMsgOpened: false,
      actionMsg: '',
    });
  };

  getOverdueLabel = () => (
    <p className="loan-message" style={{ fontSize: '15px' }}>
      <strong>
        Your loan is overdue. Please return the literature as soon as possible!
      </strong>
    </p>
  );

  getReturnLabel = (endDate) => (
    <p className="loan-message" style={{ fontSize: '15px' }}>
      <strong>
        Please return the literature before date{' '}
        {DateTime.fromISO(endDate).toLocaleString()}
      </strong>
    </p>
  );

  getOngoingLabel = (startDate, isIllBrwReq) => {
    const illWarningCmp = isIllBrwReq ? (
      <PopupIcon
        content="This loan involves third party library, please return on time."
        icon="exclamation circle"
        iconProps={{ size: 'large', color: 'red' }}
      />
    ) : null;
    return (
      <div className="pt-default">
        <Label basic>
          Loaned on
          <Label.Detail>
            {DateTime.fromISO(startDate).toLocaleString()}
          </Label.Detail>
        </Label>
        {illWarningCmp}
      </div>
    );
  };

  render() {
    const { loan } = this.props;
    const { actionMsg, actionMsgOpened } = this.state;
    const isLoanOverdue = loan.metadata.is_overdue;

    const isIllBrwReq = loan.metadata.item_pid.type === 'illbid';
    const extraActionsCmp = isIllBrwReq ? (
      <BrwReqLoanExtendButton
        brwReqLoan={loan}
        onSuccess={this.showSuccess}
        onError={this.showError}
      />
    ) : (
      <LoanExtendButton
        loan={loan}
        onSuccess={this.showSuccess}
        onError={this.showError}
      />
    );

    return (
      <LoansListItem
        loan={loan}
        extraItemProps={{
          itemClass: isLoanOverdue ? 'bkg-danger' : null,
          itemMetaCmp: this.getOngoingLabel(
            loan.metadata.start_date,
            isIllBrwReq
          ),
          itemDescriptionCmp: isLoanOverdue
            ? this.getOverdueLabel()
            : this.getReturnLabel(loan.metadata.end_date),
          itemExtraCmp: (
            <Popup
              trigger={extraActionsCmp}
              content={actionMsg}
              position="top center"
              open={actionMsgOpened}
              wide
              onClick={this.hideError}
            />
          ),
        }}
      />
    );
  }
}

LoansListEntry.propTypes = {
  loan: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
