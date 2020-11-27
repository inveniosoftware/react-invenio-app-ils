import { borrowingRequestApi } from '@api/ill';
import { BaseForm } from '@forms/core/BaseForm';
import { goTo } from '@history';
import { ILLRoutes } from '@routes/urls';
import { getIn } from 'formik';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { OrderInfo } from './OrderInfo';
import { Payment } from './Payment';
import _get from 'lodash/get';
import { documentRequestApi } from '@api/documentRequests';
import { BackOfficeRoutes } from '@routes/urls';
import { invenioConfig } from '@config';

const submitSerializer = values => {
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
  updateBorrowingRequest = (pid, data) => {
    return borrowingRequestApi.update(pid, data);
  };

  createBorrowingRequest = data => {
    return borrowingRequestApi.create(data);
  };

  successCallback = async (response, submitButton) => {
    const borrowingRequest = getIn(response, 'data');
    const documentRequestPid = _get(
      this.props,
      'data.documentRequestPid',
      null
    );
    if (documentRequestPid) {
      await documentRequestApi.addProvider(documentRequestPid, {
        physical_item_provider: {
          pid: borrowingRequest.metadata.pid,
          pid_type:
            invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.ill.pid_type,
        },
      });
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(ILLRoutes.borrowingRequestDetailsFor(borrowingRequest.metadata.pid));
    }
  };

  render() {
    const { data, successSubmitMessage, title, pid } = this.props;
    return (
      <BaseForm
        initialValues={data ? data.metadata : {}}
        editApiMethod={this.updateBorrowingRequest}
        createApiMethod={this.createBorrowingRequest}
        successCallback={this.successCallback}
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
};

BorrowingRequestForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
