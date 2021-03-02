import { documentRequestApi } from '@api/documentRequests';
import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class BorrowingRequestEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.borrowingRequestPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { borrowingRequestPid },
      },
    } = this.props;
    if (borrowingRequestPid) {
      this.fetch(borrowingRequestPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async (borrowingRequestPid) => {
    this.cancellableFetch = withCancel(
      borrowingRequestApi.get(borrowingRequestPid)
    );
    try {
      const response = await this.cancellableFetch.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  submitAction = async (formData) => {
    const {
      match: {
        params: { borrowingRequestPid },
      },
    } = this.props;

    const isEditing = !!borrowingRequestPid;
    return isEditing
      ? await borrowingRequestApi.update(borrowingRequestPid, formData)
      : await borrowingRequestApi.create(formData);
  };

  attachCreatedBrwReqToDocumentRequest = async (
    borrowingRequestPid,
    documentRequestPid
  ) => {
    this.cancellableAttachOrder = withCancel(
      documentRequestApi.addProvider(documentRequestPid, {
        physical_item_provider: {
          pid: borrowingRequestPid,
          pid_type:
            invenioConfig.DOCUMENT_REQUESTS.physicalItemProviders.ill.pid_type,
        },
      })
    );
    await this.cancellableAttachOrder.promise;
  };

  successCallback = async (response) => {
    const brwReq = _get(response, 'data');
    const newBrwReqPid = brwReq.metadata.pid;

    const extraData = _get(this.props, 'location.state.extraData', {});
    const shouldAttachCreatedOrderToDocumentRequest = _get(
      extraData,
      'attachCreatedBrwReqToDocumentRequest',
      false
    );
    if (shouldAttachCreatedOrderToDocumentRequest) {
      // attach brwReq and go back to the document request details page
      const documentRequestPid = extraData.documentRequestPid;

      try {
        await this.attachCreatedBrwReqToDocumentRequest(
          newBrwReqPid,
          documentRequestPid
        );
      } catch (error) {
        console.error(error);
      }
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(ILLRoutes.borrowingRequestDetailsFor(newBrwReqPid));
    }
  };

  render() {
    const {
      match: {
        params: { borrowingRequestPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!borrowingRequestPid;
    if (isEditing) {
      const formTitle = `Borrowing request - Edit #${borrowingRequestPid}`;
      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema}
              uiSchema={uiSchema(formTitle)}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The borrowing request was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Borrowing request - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The borrowing request was successfully created."
        />
      );
    }
  }
}

BorrowingRequestEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      borrowingRequestPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

BorrowingRequestEditor.defaultProps = {
  location: {
    state: null,
  },
};
