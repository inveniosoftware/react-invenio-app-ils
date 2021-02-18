import { documentRequestApi } from '@api/documentRequests';
import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { invenioConfig } from '@config';
import { BaseForm } from '@forms/core/BaseForm';
import { goTo } from '@history';
import { BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import { getIn } from 'formik';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { OrderInfo } from './OrderInfo';
import { Payment } from './Payment';

const submitSerializer = (values) => {
  const submitValues = { ...values };
  _isEmpty(values.library)
    ? (submitValues.library_pid = undefined)
    : (submitValues.library_pid = values.library.pid);
  _isEmpty(values.document)
    ? (submitValues.document_pid = undefined)
    : (submitValues.document_pid = values.document.pid);
  _isEmpty(values.patron)
    ? (submitValues.patron_pid = undefined)
    : (submitValues.patron_pid = values.patron.pid);

  return submitValues;
};

export class BorrowingRequestForm extends Component {
  componentWillUnmount() {
    this.cancellableAttachBrwRew && this.cancellableAttachBrwRew.cancel();
  }
  updateBorrowingRequest = (pid, data) => {
    return borrowingRequestApi.update(pid, data);
  };

  createBorrowingRequest = (data) => {
    return borrowingRequestApi.create(data);
  };

  attachCreatedBrwReqToDocumentRequest = async (
    newBrwReqPid,
    documentRequestPid
  ) => {
    this.cancellableAttachBrwRew = withCancel(
      documentRequestApi.addProvider(documentRequestPid, {
        physical_item_provider: {
          pid: newBrwReqPid,
          pid_type:
            invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.ill.pid_type,
        },
      })
    );
    try {
      await this.cancellableAttachBrwRew.promise;
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        const { sendErrorNotification } = this.props;
        sendErrorNotification(error);
      }
    }
  };

  successCallback = async (response, _, extraData) => {
    const borrowingRequest = getIn(response, 'data');
    const newBrwReqPid = borrowingRequest.metadata.pid;

    const shouldAttachCreatedBrwReqToDocumentRequest = _get(
      extraData,
      'attachCreatedBrwReqToDocumentRequest',
      false
    );
    if (shouldAttachCreatedBrwReqToDocumentRequest) {
      // attach borrowing request and go back to the document request details page
      const documentRequestPid = extraData.documentRequestPid;
      await this.attachCreatedBrwReqToDocumentRequest(
        newBrwReqPid,
        documentRequestPid
      );
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(ILLRoutes.borrowingRequestDetailsFor(newBrwReqPid));
    }
  };

  render() {
    const { data, successSubmitMessage, title, pid } = this.props;
    return (
      <BaseForm
        initialValues={data ? data.metadata : {}}
        editApiMethod={this.updateBorrowingRequest}
        createApiMethod={this.createBorrowingRequest}
        successCallback={(response, submitButton) =>
          this.successCallback(
            response,
            submitButton,
            _get(data, 'extraData', {})
          )
        }
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid}
        submitSerializer={submitSerializer}
        buttons={this.buttons}
      >
        <Header as="h3" attached="top">
          Order information
        </Header>
        <Segment attached>
          <OrderInfo />
        </Segment>
        <Header as="h3" attached="top">
          Payment information
        </Header>
        <Segment attached>
          <Payment />
        </Segment>
      </BaseForm>
    );
  }
}

BorrowingRequestForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
  sendErrorNotification: PropTypes.func.isRequired,
};

BorrowingRequestForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
