import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { invenioConfig } from '@config';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

const INFO_MESSAGES = {
  SUCCESS: documentTitle =>
    `The loan extension for "${documentTitle}" has been requested to the library and you should receive an answer soon.`,
  IS_TOO_EARLY: reqDate =>
    `It is too early for extending the loan. You can request an extension from
${reqDate
  .minus({ days: invenioConfig.CIRCULATION.loanWillExpireDays })
  .toLocaleString({ month: 'long', day: 'numeric' })}.`,
  MAX_EXTENSIONS:
    'You have reached the max number of extensions for this loan!',
};

const REQUEST_MESSAGES = {
  IS_PENDING: requestDate =>
    `Extension pending since ${requestDate.toLocaleString({
      month: 'long',
      day: 'numeric',
    })}`,
  IS_DECLINED: 'Extension declined by the library',
};

class BorrowingRequestFetcher {
  get = async pid => {
    this.cancellablePromise = withCancel(borrowingRequestApi.get(pid));
    const resp = await this.cancellablePromise.promise;
    return resp.data;
  };

  cancel = () => {
    this.cancellablePromise && this.cancellablePromise.cancel();
  };
}

class ExtensionRequester {
  doRequest = async brwReqPid => {
    this.cancellablePromise = withCancel(
      borrowingRequestApi.requestExtension(brwReqPid)
    );
    const resp = await this.cancellablePromise.promise;
    return resp.data;
  };

  cancel = () => {
    this.cancellablePromise && this.cancellablePromise.cancel();
  };
}

const validateLoanExtension = brwReqLoan => {
  let isValid = true;
  let msg = null;
  const { loanWillExpireDays } = invenioConfig.CIRCULATION;
  const isTooEarly =
    brwReqLoan.metadata.end_date.diffNow('days').days > loanWillExpireDays;
  if (isTooEarly) {
    isValid = false;
    msg = INFO_MESSAGES.IS_TOO_EARLY(brwReqLoan.metadata.end_date);
  }

  const maxExtensionsReached =
    _get(brwReqLoan, 'metadata.extension_count', 0) >
    invenioConfig.CIRCULATION.extensionsMaxCount;
  if (maxExtensionsReached) {
    isValid = false;
    msg = INFO_MESSAGES.MAX_EXTENSIONS;
  }

  return {
    isValid: isValid,
    cmp: msg ? (
      <Popup
        content={msg}
        trigger={<Icon name="info" />}
        position="top right"
      />
    ) : null,
  };
};

const validateExtensionRequest = extension => {
  let isValid = true;
  let msg = null;

  if (!_isEmpty(extension)) {
    const extensionStatus = extension.status;
    const isPending = extensionStatus === 'PENDING';
    if (isPending) {
      isValid = false;
      const requestDate = extension.request_date;
      msg = REQUEST_MESSAGES.IS_PENDING(requestDate);
    }

    const isDeclined = extensionStatus === 'DECLINED';
    if (isDeclined) {
      isValid = false;
      msg = REQUEST_MESSAGES.IS_DECLINED;
    }
  }

  return {
    isValid: isValid,
    cmp: msg ? (
      <>
        <span>{msg}</span>{' '}
      </>
    ) : null,
  };
};

class BrwReqLoanExtendButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestExtensionIsLoading: false,
      brwReqDetailsIsLoading: false,
      brwReqDetails: {},
      brwReqDetailsError: {},
    };
    this.borrowingRequestFetcher = new BorrowingRequestFetcher();
    this.extensionRequester = new ExtensionRequester();
  }

  componentDidMount() {
    const { brwReqLoan } = this.props;
    const brwReqPid = brwReqLoan.metadata.item_pid.value;
    this.fetchBorrowingRequestDetails(brwReqPid);
  }

  componentWillUnmount() {
    this.borrowingRequestFetcher.cancel();
    this.extensionRequester.cancel();
  }

  fetchBorrowingRequestDetails = async brwReqPid => {
    this.setState({ brwReqDetailsIsLoading: true });
    try {
      const data = await this.borrowingRequestFetcher.get(brwReqPid);
      this.setState({ brwReqDetails: data });
    } catch (error) {
      this.setState({ brwReqDetailsError: error });
    } finally {
      this.setState({ brwReqDetailsIsLoading: false });
    }
  };

  triggerExtensionRequest = async () => {
    const { brwReqLoan, onSuccess, onError } = this.props;
    const brwReqPid = brwReqLoan.metadata.item_pid.value;
    this.setState({ requestExtensionIsLoading: true });
    try {
      await this.extensionRequester.doRequest(brwReqPid);
      const documentTitle = brwReqLoan.metadata.document.title;
      onSuccess(INFO_MESSAGES.SUCCESS(documentTitle));
    } catch (error) {
      onError(error.response.data.message);
    } finally {
      this.setState({ requestExtensionIsLoading: false });
    }
  };

  render() {
    const { brwReqLoan } = this.props;
    const {
      requestExtensionIsLoading,
      brwReqDetailsIsLoading,
      brwReqDetails,
      brwReqDetailsError,
    } = this.state;

    const isLoading = brwReqDetailsIsLoading || requestExtensionIsLoading;

    const loanExtensionValidation = validateLoanExtension(brwReqLoan);

    const extension = _get(brwReqDetails, 'metadata.patron_loan.extension', {});
    const extensionRequestValidation = validateExtensionRequest(extension);

    const isValid =
      loanExtensionValidation.isValid && extensionRequestValidation.isValid;
    const isDisabled = !isValid;

    return (
      <Error error={brwReqDetailsError}>
        {!isLoading && extensionRequestValidation.cmp}
        {!isLoading && loanExtensionValidation.cmp}
        <Button
          color="blue"
          size="small"
          content="Request extension"
          disabled={isDisabled || isLoading}
          loading={isLoading}
          onClick={this.triggerExtensionRequest}
        />
      </Error>
    );
  }
}

BrwReqLoanExtendButton.propTypes = {
  brwReqLoan: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export { BrwReqLoanExtendButton };
