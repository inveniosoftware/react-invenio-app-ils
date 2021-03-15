import { documentRequestApi } from '@api/documentRequests';
import { documentApi } from '@api/documents';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { RJSForm } from '@forms/rjsf';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { schema } from './schema';
import { uiSchema } from './uiSchema';

export class DocumentEditor extends Component {
  constructor(props) {
    super(props);

    const isEditing = !!props.match.params.documentPid;
    this.state = {
      data: {},
      isLoading: isEditing,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.documentPid) {
      this.fetch(match.params.documentPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
    this.cancellableAttachDocument && this.cancellableAttachDocument.cancel();
  }

  fetch = async (documentPid) => {
    this.cancellableFetch = withCancel(documentApi.get(documentPid));
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
        params: { documentPid },
      },
    } = this.props;

    // delete the custom authors field so that it is not sent to backend
    delete formData._tooManyAuthorsCustomField;

    const isEditing = !!documentPid;
    return isEditing
      ? await documentApi.update(documentPid, formData)
      : await documentApi.create(formData);
  };

  attachCreatedDocumentToDocumentRequest = async (
    documentPid,
    documentRequestPid
  ) => {
    this.cancellableAttachDocument = withCancel(
      documentRequestApi.addDocument(documentRequestPid, {
        document_pid: documentPid,
      })
    );
    await this.cancellableAttachDocument.promise;
  };

  successCallback = async (response) => {
    const newDocumentPid = response.data.metadata.pid;

    const extraData = _get(this.props, 'location.state.extraData', {});
    const shouldAttachCreatedDocumentToDocumentRequest = _get(
      extraData,
      'attachCreatedDocumentToDocumentRequest',
      false
    );
    if (shouldAttachCreatedDocumentToDocumentRequest) {
      // attach document and go back to the document request details page
      const documentRequestPid = extraData.documentRequestPid;

      try {
        await this.attachCreatedDocumentToDocumentRequest(
          newDocumentPid,
          documentRequestPid
        );
      } catch (error) {
        console.error(error);
      }
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(BackOfficeRoutes.documentDetailsFor(newDocumentPid));
    }
  };

  render() {
    const {
      match: {
        params: { documentPid },
      },
    } = this.props;
    const { isLoading, error, data } = this.state;

    const isEditing = !!documentPid;
    if (isEditing) {
      const formTitle = `Document - Edit #${documentPid}`;

      // when there are too many authors, it will not be possible to manually edit them
      // via the form. In this case, a custom disabled field will be displayed with an
      // explanation
      const tooManyAuthors =
        data.metadata &&
        data.metadata.authors.length >
          invenioConfig.DOCUMENTS.authors.maxEditable;
      if (data.metadata && tooManyAuthors) {
        // copy in the custom `_tooManyAuthorsCustomField` field the first `n` authors
        // to display a message in the form
        data.metadata._tooManyAuthorsCustomField =
          data.metadata.authors
            .map((author) => author.full_name)
            .slice(0, invenioConfig.DOCUMENTS.authors.maxEditable)
            .join(', ') + ' ...';
      }

      return (
        <Loader isLoading={isLoading}>
          <Error error={error}>
            <RJSForm
              schema={schema()}
              uiSchema={uiSchema(formTitle, { tooManyAuthors: tooManyAuthors })}
              formData={data.metadata}
              submitAction={this.submitAction}
              successCallback={this.successCallback}
              successMessage="The document was successfully updated."
            />
          </Error>
        </Loader>
      );
    } else {
      const formTitle = 'Document - Create';
      const prefilledFormData = _get(this.props, 'location.state.formData', {});
      return (
        <RJSForm
          schema={schema()}
          uiSchema={uiSchema(formTitle)}
          formData={prefilledFormData}
          submitAction={this.submitAction}
          successCallback={this.successCallback}
          successMessage="The document was successfully created."
        />
      );
    }
  }
}

DocumentEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentPid: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      formData: PropTypes.object,
      extraData: PropTypes.object,
    }),
  }),
};

DocumentEditor.defaultProps = {
  location: {
    state: null,
  },
};
