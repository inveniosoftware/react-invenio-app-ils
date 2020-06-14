import { borrowingRequestApi } from '@api/ill';
import { delay, withCancel } from '@api/utils';
import { invenioConfig } from '@config';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

const CONFIG_EXPIRE_DAYS = invenioConfig.circulation.loanWillExpireDays;

const INFO_MESSAGES = {
  SUCCESS:
    'The extension for this loan has been requested to the library and you should receive an answer soon.',
  IS_PENDING: 'Extension requested and pending library validation.',
  IS_DECLINED: 'Extension declined by the library.',
  IS_TOO_EARLY: reqDate =>
    `It is too early for extending the loan. You can request an extension from
${reqDate
  .minus({ days: CONFIG_EXPIRE_DAYS })
  .toLocaleString({ month: 'long', day: 'numeric' })}.`,
  MAX_EXTENSIONS:
    'You have reached the max number of extensions for this loan!',
};

class BrwReqLoanExtendButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentWillUnmount() {
    this.cancellableRequestExtension &&
      this.cancellableRequestExtension.cancel();
  }

  async requestExtension(brwReqPid) {
    const response = await borrowingRequestApi.requestExtension(brwReqPid);
    await delay();
    return response;
  }

  triggerExtension = async () => {
    const { brwReqLoan, onSuccess, onError } = this.props;
    const brwReqPid = brwReqLoan.metadata.item_pid.value;
    this.setState({ isLoading: true });

    try {
      this.cancellableRequestExtension = withCancel(
        this.requestExtension(brwReqPid)
      );
      await this.cancellableRequestExtension.promise;
      this.setState({ isLoading: false });
      onSuccess(INFO_MESSAGES.SUCCESS);
    } catch (error) {
      this.setState({ isLoading: false });
      onError(error.response.data.message);
    }
  };

  validate = brwReqLoan => {
    const extensionStatus = _get(
      brwReqLoan,
      'metadata.item.patron_loan.extension.status'
    );
    const isPending = extensionStatus === 'PENDING';
    if (isPending) {
      return {
        isValid: false,
        msg: INFO_MESSAGES.IS_PENDING,
      };
    }

    const isDeclined = extensionStatus === 'DECLINED';
    if (isDeclined) {
      return {
        isValid: false,
        msg: INFO_MESSAGES.IS_DECLINED,
      };
    }

    const isTooEarly =
      brwReqLoan.metadata.end_date.diffNow('days').days > CONFIG_EXPIRE_DAYS;
    if (isTooEarly) {
      return {
        isValid: false,
        msg: INFO_MESSAGES.IS_TOO_EARLY(brwReqLoan.metadata.end_date),
      };
    }

    const maxExtensionsReached =
      _get(brwReqLoan, 'metadata.extension_count', 0) >
      invenioConfig.circulation.extensionsMaxCount;
    if (maxExtensionsReached)
      return {
        isValid: false,
        msg: INFO_MESSAGES.MAX_EXTENSIONS,
      };

    return { isValid: true, msg: '' };
  };

  render() {
    const { brwReqLoan } = this.props;
    const { isLoading } = this.state;
    const validation = this.validate(brwReqLoan);
    const isDisabled = !validation.isValid;

    return (
      <>
        {isDisabled && (
          <Popup
            content={validation.msg}
            trigger={<Icon name="info" />}
            position="top right"
          />
        )}
        <Button
          color="blue"
          size="small"
          content="Request extension"
          disabled={isDisabled}
          loading={isLoading}
          onClick={this.triggerExtension}
        />
      </>
    );
  }
}

BrwReqLoanExtendButton.propTypes = {
  brwReqLoan: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export { BrwReqLoanExtendButton };
