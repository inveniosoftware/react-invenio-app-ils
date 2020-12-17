import React from 'react';
import { AccordionField } from '@forms/core/AccordionField';
import { VocabularyField } from '@forms/core/VocabularyField';
import { invenioConfig } from '@config';
import { ArrayField } from '@forms/core/ArrayField';
import { DeleteActionButton } from '@forms/components';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import _pickBy from 'lodash/pickBy';

export class LicensesField extends React.Component {
  serializer = (hit) => {
    const {
      metadata: {
        id,
        text,
        data: { status, maintainer, url },
      },
    } = hit;
    const value = { id, status, maintainer, title: text, url };
    return {
      key: id,
      value: _pickBy(value, (o) => o), // Remove empty fields
      text: text,
    };
  };

  renderFormField = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const objectPath = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        border
        grouped
        widths="equal"
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <VocabularyField
          type={invenioConfig.VOCABULARIES.document.license}
          fieldPath={`${objectPath}.license`}
          serializer={this.serializer}
          label="License"
          placeholder="Select license..."
        />
        <StringField label="Material" fieldPath={`${objectPath}.material`} />
        <TextField
          label="Internal notes"
          fieldPath={`${objectPath}.internal_notes`}
          rows={3}
        />
      </GroupField>
    );
  };

  render() {
    return (
      <AccordionField
        label="Licenses"
        fieldPath="licenses"
        content={
          <ArrayField
            fieldPath="licenses"
            defaultNewValue=""
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new license"
          />
        }
      />
    );
  }
}
