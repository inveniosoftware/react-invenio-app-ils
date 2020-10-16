import { loanApi } from '@api/loans';
import { searchReady, withCancel } from '@api/utils';
import { invenioConfig } from '@config';
import _get from 'lodash/get';
import _has from 'lodash/has';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { DateTime } from 'luxon';

const INFO_MESSAGES = {
  SUCCESS: documentTitle =>
    `Your loan for "${documentTitle}" has been extended.`,
  MISSING_ACTION_URL: 'It is not possible to extend this loan!',
  TOO_EARLY: reqDate =>
    `It is too early for extending the loan. You can request an extension from
    ${reqDate
      .minus({ days: invenioConfig.CIRCULATION.loanWillExpireDays })
      .toLocaleString({ month: 'long', day: 'numeric' })}.`,
  MAX_EXTENSIONS:
    'You have reached the max number of extensions for this loan!',
};

class LoanExtendButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentWillUnmount() {
    this.cancellableExtendLoan && this.cancellableExtendLoan.cancel();
  }

  async extendLoan(actionURL, documentPid, patronPid) {
    const response = await loanApi.doAction(actionURL, documentPid, patronPid);
    await searchReady();
    return response;
  }

  triggerExtension = async () => {
    const { loan, onSuccess, onError } = this.props;
    const { document, patron_pid: patronPid } = loan.metadata;
    const extendUrl = loan.availableActions.extend;
    this.setState({ isLoading: true });

    try {
      this.cancellableExtendLoan = withCancel(
        this.extendLoan(extendUrl, document.pid, patronPid)
      );
      await this.cancellableExtendLoan.promise;
      this.setState({ isLoading: false });
      const documentTitle = document.title;
      onSuccess(INFO_MESSAGES.SUCCESS(documentTitle));
    } catch (error) {
      this.setState({ isLoading: false });
      onError(error.response.data.message);
    }
  };

  validateMaxExtensions(loan) {
    return (
      _get(loan, 'metadata.extension_count', 0) <=
      invenioConfig.CIRCULATION.extensionsMaxCount
    );
  }

  validate = loan => {
    const hasExtendAction = _has(loan, 'availableActions.extend');
    if (!hasExtendAction)
      return { isValid: false, msg: INFO_MESSAGES.MISSING_ACTION_URL };
    const { loanWillExpireDays } = invenioConfig.CIRCULATION;
    const isTooEarly =
      DateTime.fromISO(loan.metadata.end_date).diffNow('days').days >
      loanWillExpireDays;
    if (isTooEarly) {
      return {
        isValid: false,
        msg: INFO_MESSAGES.TOO_EARLY(DateTime.fromISO(loan.metadata.end_date)),
      };
    }

    const maxExtensionsReached =
      _get(loan, 'metadata.extension_count', 0) >
      invenioConfig.CIRCULATION.extensionsMaxCount;
    if (maxExtensionsReached)
      return {
        isValid: false,
        msg: INFO_MESSAGES.maxMAX_EXTENSIONSExtensions,
      };

    return { isValid: true, msg: '' };
  };

  render() {
    const { loan } = this.props;
    const { isLoading } = this.state;
    const validation = this.validate(loan);
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
          disabled={isDisabled || isLoading}
          loading={isLoading}
          onClick={this.triggerExtension}
        />
      </>
    );
  }
}

LoanExtendButton.propTypes = {
  loan: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export { LoanExtendButton };
