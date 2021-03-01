import { documentRequestApi } from '@api/documentRequests';
import { documentApi } from '@api/documents';
import { withCancel } from '@api/utils';
import { Loader } from '@components/Loader';
import { BaseForm } from '@forms/core/BaseForm';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import { invenioConfig } from '@config';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { DocumentAdditionalInfo } from './DocumentAdditionalInfo';
import { DocumentBasicMetadata } from './DocumentBasicMetadata';
import { DocumentContent } from './DocumentContent';
import { DocumentCurationCatalog } from './DocumentCurationCatalog';
import { DocumentLicensesCopyright } from './DocumentLicensesCopyright';
import { DocumentPublishing } from './DocumentPublishing';
import documentSubmitSerializer from './documentSubmitSerializer';

const DocumentSchema = Yup.object().shape({
  document_type: Yup.string().required(),
  identifiers: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
      scheme: Yup.string().required(),
    })
  ),
  urls: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().url().required(),
    })
  ),
  subjects: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
      scheme: Yup.string().required(),
    })
  ),
  alternative_identifiers: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
    }),
    Yup.object().shape({
      scheme: Yup.string().required(),
    })
  ),
  alternative_titles: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
    })
  ),
  internal_notes: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
    })
  ),
  licenses: Yup.array().of(
    Yup.object().shape({
      license: Yup.object().shape({
        id: Yup.string().required(),
      }),
    })
  ),
});

export class DocumentForm extends Component {
  componentWillUnmount() {
    this.cancellableAttachDocument && this.cancellableAttachDocument.cancel();
  }

  get buttons() {
    const { pid } = this.props;
    if (pid) {
      return null;
    }

    return [
      {
        name: 'create',
        content: 'Create document',
        primary: true,
        type: 'submit',
      },
      {
        name: 'create-with-item',
        content: 'Create document and item',
        secondary: true,
        type: 'submit',
      },
      {
        name: 'create-with-eitem',
        content: 'Create document and eitem',
        secondary: true,
        type: 'submit',
      },
    ];
  }

  updateDocument = (pid, data) => {
    return documentApi.update(pid, data);
  };

  createDocument = (data) => {
    return documentApi.create(data);
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
    try {
      await this.cancellableAttachDocument.promise;
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        const { sendErrorNotification } = this.props;
        sendErrorNotification(error);
      }
    }
  };

  successCallback = async (response, submitButton, extraData) => {
    const newlyCreatedDocument = response.data;
    const newDocumentPid = newlyCreatedDocument.metadata.pid;

    const shouldAttachCreatedDocumentToDocumentRequest = _get(
      extraData,
      'attachCreatedDocumentToDocumentRequest',
      false
    );

    if (submitButton === 'create-with-item') {
      goTo(BackOfficeRoutes.itemCreate, { document: newlyCreatedDocument });
    } else if (submitButton === 'create-with-eitem') {
      const createEItemFormData = {
        formData: {
          document_pid: newDocumentPid,
        },
      };
      goTo(BackOfficeRoutes.eitemCreate, createEItemFormData);
    } else if (shouldAttachCreatedDocumentToDocumentRequest) {
      // attach document and go back to the document request details page
      const documentRequestPid = extraData.documentRequestPid;
      await this.attachCreatedDocumentToDocumentRequest(
        newDocumentPid,
        documentRequestPid
      );
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(BackOfficeRoutes.documentDetailsFor(newDocumentPid));
    }
  };

  render() {
    const { data, successSubmitMessage, title, pid, isCreate } = this.props;
    const extensions = _get(data, 'metadata.extensions', {});
    return (
      <BaseForm
        initialValues={
          data
            ? data.metadata
            : {
                languages: [invenioConfig.APP.DEFAULT_LANGUAGE],
              }
        }
        editApiMethod={this.updateDocument}
        createApiMethod={this.createDocument}
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
        submitSerializer={documentSubmitSerializer}
        buttons={this.buttons}
        validationSchema={DocumentSchema}
      >
        <Header as="h3" attached="top">
          Basic information
        </Header>
        <Segment attached>
          <Loader>
            <DocumentBasicMetadata isCreate={isCreate} />
          </Loader>
        </Segment>

        <Header as="h3" attached="top">
          Content
        </Header>
        <Segment attached>
          <Loader>
            <DocumentContent />
          </Loader>
        </Segment>

        <Header as="h3" attached="top">
          Publishing
        </Header>
        <Segment attached>
          <Loader>
            <DocumentPublishing />
          </Loader>
        </Segment>

        <Header as="h3" attached="top">
          Curation & Cataloging
        </Header>
        <Segment attached>
          <Loader>
            <DocumentCurationCatalog />
          </Loader>
        </Segment>

        <Header as="h3" attached="top">
          Licenses & Copyrights
        </Header>
        <Segment attached>
          <Loader>
            <DocumentLicensesCopyright />
          </Loader>
        </Segment>

        <Header as="h3" attached="top">
          Additional information
        </Header>
        <Segment attached>
          <Loader>
            <DocumentAdditionalInfo extensions={extensions} />
          </Loader>
        </Segment>
      </BaseForm>
    );
  }
}

DocumentForm.propTypes = {
  data: PropTypes.object,
  pid: PropTypes.string,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  isCreate: PropTypes.bool,
  sendErrorNotification: PropTypes.func.isRequired,
};

DocumentForm.defaultProps = {
  data: null,
  pid: null,
  successSubmitMessage: null,
  title: null,
  isCreate: false,
};
