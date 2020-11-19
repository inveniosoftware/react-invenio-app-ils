import { documentApi } from '@api/documents';
import { itemApi } from '@api/items';
import { internalLocationApi } from '@api/locations';
import {
  DocumentIcon,
  InternalLocationIcon,
} from '@components/backoffice/icons';
import { invenioConfig } from '@config';
import { DeleteActionButton } from '@forms/components';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { BaseForm } from '@forms/core/BaseForm';
import { GroupField } from '@forms/core/GroupField';
import { PriceField } from '@forms/core/PriceField';
import { SelectField } from '@forms/core/SelectField';
import { SelectorField } from '@forms/core/SelectorField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { VocabularyField } from '@forms/core/VocabularyField';
import { goTo } from '@history';
import {
  serializeDocument,
  serializeInternalLocation,
} from '@modules/ESSelector/serializer';
import { BackOfficeRoutes } from '@routes/urls';
import { getIn } from 'formik';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import itemSubmitSerializer from './itemSubmitSerializer';
import * as Yup from 'yup';

const ItemSchema = Yup.object().shape({
  barcode: Yup.string().required(),
  document: Yup.object().shape({
    pid: Yup.string().required(),
  }),
  medium: Yup.string().required(),
  internal_location: Yup.object().shape({
    pid: Yup.string().required(),
  }),
  status: Yup.string().required(),
  circulation_restriction: Yup.string().required(),
  isbns: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
    })
  ),
});

export class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.config = invenioConfig.ITEMS;
  }

  serializer = hit => ({
    key: hit.metadata.key,
    value: hit.metadata.key,
    text: hit.metadata.key,
  });

  prepareData = data => {
    return pick(data, [
      'acquisition_pid',
      'barcode',
      'circulation_restriction',
      'description',
      'document_pid',
      'document',
      'internal_location_pid',
      'internal_location',
      'internal_notes',
      'isbns',
      'legacy_id',
      'legacy_library_id',
      'medium',
      'number_of_pages',
      'physical_description',
      'price',
      'shelf',
      'status',
    ]);
  };

  update = (pid, data) => {
    return itemApi.update(pid, data);
  };

  create = data => {
    return itemApi.create(data);
  };

  successCallback = response => {
    goTo(BackOfficeRoutes.itemDetailsFor(getIn(response, 'data.metadata.pid')));
  };

  render() {
    const {
      data: { metadata },
      data,
      successSubmitMessage,
      title,
      pid,
    } = this.props;
    const initialValues = data ? this.prepareData(metadata) : {};
    return (
      <BaseForm
        initialValues={{
          circulation_restriction: 'NO_RESTRICTION',
          status: 'CAN_CIRCULATE',
          ...initialValues,
        }}
        editApiMethod={this.update}
        createApiMethod={this.create}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid}
        submitSerializer={itemSubmitSerializer}
        validationSchema={ItemSchema}
      >
        <Segment>
          <Header dividing>Basic Metadata</Header>
          <GroupField widths="equal">
            <StringField required label="Barcode" fieldPath="barcode" />
          </GroupField>
          <GroupField widths="2">
            <SelectorField
              required
              emptyHeader="No document selected"
              emptyDescription="Please select a document."
              fieldPath="document"
              errorPath="document_pid"
              label="Document"
              placeholder="Search for a document..."
              icon={<DocumentIcon />}
              query={documentApi.list}
              serializer={serializeDocument}
              width={8}
            />
            <VocabularyField
              type={invenioConfig.VOCABULARIES.item.mediums}
              fieldPath="medium"
              label="Medium"
              placeholder="Select medium ..."
              required
            />
          </GroupField>
          <GroupField widths="2">
            <SelectorField
              required
              emptyHeader="No internal location selected"
              emptyDescription="Please select an internal location."
              fieldPath="internal_location"
              errorPath="internal_location_pid"
              label="Internal location"
              placeholder="Search for an internal location..."
              icon={<InternalLocationIcon />}
              query={internalLocationApi.list}
              serializer={serializeInternalLocation}
              width={8}
            />
            <StringField label="Shelf" fieldPath="shelf" width={8} />
          </GroupField>
          <GroupField widths="equal">
            <SelectField
              required
              search
              label="Status"
              fieldPath="status"
              options={this.config.statuses}
            />
            <SelectField
              required
              search
              label="Circulation restriction"
              fieldPath="circulation_restriction"
              options={this.config.circulationRestrictions}
            />
          </GroupField>
          <AccordionField
            label="ISBN"
            fieldPath="isbn"
            content={
              <ArrayField
                fieldPath="isbns"
                defaultNewValue={{
                  value: undefined,
                  description: undefined,
                }}
                renderArrayItem={({
                  arrayPath,
                  indexPath,
                  ...arrayHelpers
                }) => {
                  const objectPath = `${arrayPath}.${indexPath}`;
                  return (
                    <GroupField
                      border
                      widths="equal"
                      fieldPath={objectPath}
                      action={
                        <DeleteActionButton
                          onClick={() => arrayHelpers.remove(indexPath)}
                        />
                      }
                    >
                      <StringField
                        required
                        label="Value"
                        fieldPath={`${objectPath}.value`}
                      />
                      <TextField
                        label="Description"
                        fieldPath={`${objectPath}.description`}
                        rows={2}
                      />
                    </GroupField>
                  );
                }}
                addButtonLabel="Add new ISBN"
              />
            }
          />
        </Segment>

        <Segment>
          <Header dividing>Content</Header>
          <GroupField widths="8">
            <StringField
              label="Number of pages"
              fieldPath="number_of_pages"
              width={8}
            />
          </GroupField>
          <GroupField widths="equal">
            <TextField label="Description" fieldPath="description" rows={5} />
            <TextField
              label="Physical description"
              fieldPath="physical_description"
              rows={5}
            />
          </GroupField>
        </Segment>

        <Segment>
          <Header dividing>Cataloging</Header>
          <GroupField widths="equal">
            <StringField label="Legacy ID" fieldPath="legacy_id" />
            <StringField
              label="Legacy library ID"
              fieldPath="legacy_library_id"
            />
          </GroupField>
          <GroupField widths="equal">
            <StringField label="Acquisition Pid" fieldPath="acquisition_pid" />
            <PriceField
              label="Price"
              fieldPath="price"
              defaultCurrency={invenioConfig.APP.DEFAULT_CURRENCY}
            />
          </GroupField>
          <GroupField widths="equal">
            <TextField
              label="Internal Notes"
              fieldPath="internal_notes"
              rows={5}
            />
          </GroupField>
        </Segment>
      </BaseForm>
    );
  }
}

ItemForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};

ItemForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
