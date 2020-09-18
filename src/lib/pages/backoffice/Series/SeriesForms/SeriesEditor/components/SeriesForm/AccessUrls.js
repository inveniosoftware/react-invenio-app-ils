import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { BooleanField } from '@forms/core/BooleanField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';
import React, { Component } from 'react';

export class AccessUrls extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    const objectPath = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        border
        widths="equal"
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <StringField required label="Url" fieldPath={`${objectPath}.value`} />
        <StringField
          label="Description"
          fieldPath={`${objectPath}.description`}
        />
        <BooleanField
          toggle
          fieldPath={`${objectPath}.open_access`}
          rightLabel="Open Access"
        />
        <VocabularyField
          type="series_url_access_restriction"
          fieldPath={`${objectPath}.access_restriction`}
          label="Access Restriction"
        />
      </GroupField>
    );
  }

  render() {
    return (
      <AccordionField
        label="Access urls"
        fieldPath="access_urls"
        content={
          <ArrayField
            fieldPath="access_urls"
            defaultNewValue={{
              url: undefined,
              description: undefined,
              open_access: true,
            }}
            renderArrayItem={this.renderFormField.bind(this)}
            addButtonLabel="Add new access url"
          />
        }
      />
    );
  }
}
