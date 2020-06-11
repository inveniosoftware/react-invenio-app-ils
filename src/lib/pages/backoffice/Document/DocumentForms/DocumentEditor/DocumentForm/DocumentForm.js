import { documentRequestApi } from '@api/documentRequests';
import { documentApi } from '@api/documents';
import { extensionsConfig, invenioConfig } from '@config';
import { UrlsField } from '@forms/components';
import { BaseForm } from '@forms/core/BaseForm';
import { BooleanField } from '@forms/core/BooleanField';
import { GroupField } from '@forms/core/GroupField';
import { SelectField } from '@forms/core/SelectField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import { getIn } from 'formik';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import {
  AlternativeAbstracts,
  AlternativeIdentifiers,
  AlternativeTitles,
  AuthorsField,
  ConferenceInfoField,
  Copyrights,
  Identifiers,
  Imprint,
  InternalNotes,
  Keywords,
  LicensesField,
  MetadataExtensions,
  PublicationInfoField,
  Subjects,
  TableOfContent,
  TagsField,
} from './components';
import documentSubmitSerializer from './documentSubmitSerializer';

export class DocumentForm extends Component {
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
        type: 'button',
      },
      {
        name: 'create-with-eitem',
        content: 'Create document and eitem',
        secondary: true,
        type: 'button',
      },
    ];
  }

  updateDocument = (pid, data) => {
    return documentApi.update(pid, data);
  };

  createDocument = data => {
    return documentApi.create(data);
  };

  successCallback = async (response, submitButton) => {
    const doc = getIn(response, 'data');
    const documentRequestPid = _get(
      this.props,
      'data.documentRequestPid',
      null
    );
    if (submitButton === 'create-with-item') {
      goTo(BackOfficeRoutes.itemCreate, { document: doc });
    } else if (submitButton === 'create-with-eitem') {
      goTo(BackOfficeRoutes.eitemCreate, { document: doc });
    } else if (documentRequestPid) {
      await documentRequestApi.addDocument(documentRequestPid, {
        document_pid: doc.pid,
      });
      goTo(BackOfficeRoutes.documentRequestDetailsFor(documentRequestPid));
    } else {
      goTo(BackOfficeRoutes.documentDetailsFor(doc.metadata.pid));
    }
  };

  render() {
    const { data, successSubmitMessage, title, pid } = this.props;
    const extensions = _get(data, 'metadata.extensions', {});
    return (
      <BaseForm
        initialValues={data ? data.metadata : {}}
        editApiMethod={this.updateDocument}
        createApiMethod={this.createDocument}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid}
        submitSerializer={documentSubmitSerializer}
        documentRequestPid={_get(data, 'documentRequestPid', null)}
        buttons={this.buttons}
      >
        <StringField label="Title" fieldPath="title" required optimized />
        <GroupField widths="equal">
          <SelectField
            options={invenioConfig.documents.types}
            fieldPath="document_type"
            label="Document type"
          />
          <StringField label="Edition" fieldPath="edition" optimized />
          <StringField
            label="Number of pages"
            fieldPath="number_of_pages"
            optimized
          />
        </GroupField>
        <StringField
          label="Source of the metadata"
          fieldPath="source"
          optimized
        />
        <StringField
          label="Publication year"
          fieldPath="publication_year"
          required
          optimized
        />
        <AuthorsField fieldPath="authors" />
        <BooleanField label="Other authors" fieldPath="other_authors" toggle />
        <BooleanField label="Restricted" fieldPath="restricted" toggle />
        <BooleanField label="Document is curated" fieldPath="curated" toggle />
        <TextField label="Abstract" fieldPath="abstract" rows={5} optimized />
        <TextField label="Notes" fieldPath="note" rows={5} optimized />
        <ConferenceInfoField />
        <AlternativeAbstracts />
        <LicensesField fieldPath="licenses" />
        <TableOfContent />
        <TagsField
          fieldPath="tags"
          type={invenioConfig.vocabularies.document.tags}
        />
        <UrlsField />
        <Subjects />
        <InternalNotes />
        <Identifiers
          vocabularies={{
            scheme: invenioConfig.vocabularies.document.identifier.scheme,
          }}
        />
        <AlternativeIdentifiers />
        <AlternativeTitles />
        <Copyrights />
        <PublicationInfoField />
        <Imprint />
        <Keywords />
        {!_isEmpty(extensions) && !_isEmpty(extensionsConfig.document.fields) && (
          <Overridable id="DocumentForm.Extensions" extensions={extensions}>
            <MetadataExtensions extensions={extensions} />
          </Overridable>
        )}
      </BaseForm>
    );
  }
}

DocumentForm.propTypes = {
  data: PropTypes.object,
  pid: PropTypes.string,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
};

DocumentForm.defaultProps = {
  data: null,
  pid: null,
  successSubmitMessage: null,
  title: null,
};
