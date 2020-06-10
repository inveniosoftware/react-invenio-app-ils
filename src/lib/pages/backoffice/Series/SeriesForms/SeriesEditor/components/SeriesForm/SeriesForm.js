import { seriesApi } from '@api/series';
import { invenioConfig } from '@config';
import {
  DeleteActionButton,
  LanguageField,
  UrlsField,
} from '@forms/components';
import { ArrayField } from '@forms/core/ArrayField';
import { BaseForm } from '@forms/core/BaseForm';
import { GroupField } from '@forms/core/GroupField';
import { SelectField } from '@forms/core/SelectField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import {
  AlternativeTitles,
  Identifiers,
} from '@pages/backoffice/Document/DocumentForms/DocumentEditor/DocumentForm/components';
import { InternalNotes } from '@pages/backoffice/Document/DocumentForms/DocumentEditor/DocumentForm/components/InternalNotes';
import { BackOfficeRoutes } from '@routes/urls';
import { getIn } from 'formik';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AccessUrls } from './AccessUrls';

export class SeriesForm extends Component {
  prepareData = data => {
    return pick(data, [
      'abbreviated_title',
      'abstract',
      'access_urls',
      'alternative_titles',
      'authors',
      'edition',
      'identifiers',
      'internal_notes',
      'issn',
      'languages',
      'mode_of_issuance',
      'note',
      'publication_year',
      'publisher',
      'title',
      'urls',
    ]);
  };

  updateSeries = (pid, data) => {
    return seriesApi.update(pid, data);
  };

  createSeries = data => {
    return seriesApi.create(data);
  };

  successCallback = response => {
    goTo(
      BackOfficeRoutes.seriesDetailsFor(getIn(response, 'data.metadata.pid'))
    );
  };

  renderAuthorsField = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    return (
      <GroupField basic>
        <StringField
          fieldPath={`${arrayPath}.${indexPath}`}
          action={
            <DeleteActionButton
              icon="trash"
              onClick={() => arrayHelpers.remove(indexPath)}
            />
          }
        />
      </GroupField>
    );
  };

  render() {
    const {
      data: { metadata },
      data,
      title,
      pid,
    } = this.props;
    const initialValues = data ? this.prepareData(metadata) : {};
    return (
      <BaseForm
        initialValues={{
          mode_of_issuance: 'MULTIPART_MONOGRAPH',
          ...initialValues,
        }}
        editApiMethod={this.updateSeries}
        createApiMethod={this.createSeries}
        successCallback={this.successCallback}
        successSubmitMessage={this.successSubmitMessage}
        title={title}
        pid={pid}
      >
        <StringField label="Title" fieldPath="title" required />
        <StringField
          label="Abbreviated title"
          fieldPath="abbreviated_title"
          required
        />
        <AlternativeTitles />
        <SelectField
          required
          search
          label="Mode of issuance"
          fieldPath="mode_of_issuance"
          options={[
            {
              text: 'MULTIPART MONOGRAPH',
              value: 'MULTIPART_MONOGRAPH',
            },
            {
              text: 'SERIAL',
              value: 'SERIAL',
            },
          ]}
        />
        <StringField label="Publication year" fieldPath="publication_year" />
        <TextField label="Abstract" fieldPath="abstract" rows={10} />
        <ArrayField
          fieldPath="authors"
          label="Authors"
          defaultNewValue=""
          renderArrayItem={this.renderAuthorsField}
          addButtonLabel="Add new author"
        />
        <LanguageField
          multiple
          fieldPath="languages"
          type={invenioConfig.vocabularies.language}
        />
        <StringField label="Edition" fieldPath="edition" />
        <StringField fieldPath="publisher" label="Publisher" />
        <UrlsField />
        <AccessUrls />
        <Identifiers
          scheme={invenioConfig.vocabularies.series.identifier.scheme}
        />
        <TextField label="Notes" fieldPath="note" rows={5} optimized />
        <InternalNotes />
      </BaseForm>
    );
  }
}

SeriesForm.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
};
