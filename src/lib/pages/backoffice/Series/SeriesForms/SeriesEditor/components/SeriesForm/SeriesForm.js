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
  Keywords,
  TagsField,
} from '@pages/backoffice/Document/DocumentForms/DocumentEditor/DocumentForm/components';
import { InternalNotes } from '@pages/backoffice/Document/DocumentForms/DocumentEditor/DocumentForm/components/InternalNotes';
import { BackOfficeRoutes } from '@routes/urls';
import { getIn } from 'formik';
import _isEmpty from 'lodash/isEmpty';
import _pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { AccessUrls } from './AccessUrls';
import { SeriesMetadataExtensions } from './SeriesMetadataExtensions';
import { Segment, Header, Grid } from 'semantic-ui-react';

export class SeriesForm extends Component {
  prepareData = data => {
    return _pick(data, [
      'abbreviated_title',
      'abstract',
      'access_urls',
      'alternative_titles',
      'authors',
      'edition',
      'extensions',
      'identifiers',
      'internal_notes',
      'issn',
      'keywords',
      'languages',
      'mode_of_issuance',
      'note',
      'publication_year',
      'publisher',
      'tags',
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
    const { extensions } = metadata;
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
        <Header as="h3" attached="top">
          Basic Info
        </Header>
        <Segment attached>
          <StringField label="Title" fieldPath="title" required />
          <GroupField widths="equal">
            <StringField
              label="Abbreviated title"
              fieldPath="abbreviated_title"
            />
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
            <LanguageField
              multiple
              fieldPath="languages"
              type={invenioConfig.VOCABULARIES.language}
            />
          </GroupField>
          <ArrayField
            fieldPath="authors"
            label="Authors"
            defaultNewValue=""
            renderArrayItem={this.renderAuthorsField}
            addButtonLabel="Add new author"
          />

          <Identifiers
            scheme={invenioConfig.VOCABULARIES.series.identifier.scheme}
          />
        </Segment>
        <Header as="h3" attached="top">
          Publication
        </Header>
        <Segment attached>
          <GroupField widths="equal">
            <StringField label="Edition" fieldPath="edition" />
            <StringField
              label="Publication year"
              fieldPath="publication_year"
            />
            <StringField fieldPath="publisher" label="Publisher" />
          </GroupField>
        </Segment>
        <Header as="h3" attached="top">
          URLs
        </Header>
        <Segment attached>
          <UrlsField />
          <AccessUrls />
        </Segment>

        <Segment basic>
          <Grid columns={3} stackable>
            <Grid.Column width="4">
              <Header as="h3" attached="top">
                Content
              </Header>
              <Segment attached>
                <TextField label="Abstract" fieldPath="abstract" rows={10} />
                <TagsField
                  fieldPath="tags"
                  type={invenioConfig.VOCABULARIES.document.tags}
                />
                <Keywords />
              </Segment>
            </Grid.Column>
            <Grid.Column width="4">
              <Header as="h3" attached="top">
                Notes
              </Header>
              <Segment attached>
                <TextField label="Notes" fieldPath="note" rows={5} optimized />
                <InternalNotes />
              </Segment>
            </Grid.Column>
            <Grid.Column width="8">
              <Header as="h3" attached="top">
                Additional Info
              </Header>
              <Segment attached>
                <AlternativeTitles />
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>

        {!_isEmpty(extensions) &&
          !_isEmpty(invenioConfig.SERIES.extensions.fields) && (
            <Overridable id="SeriesForm.Extensions" extensions={extensions}>
              <SeriesMetadataExtensions extensions={extensions} />
            </Overridable>
          )}
      </BaseForm>
    );
  }
}

SeriesForm.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
};
