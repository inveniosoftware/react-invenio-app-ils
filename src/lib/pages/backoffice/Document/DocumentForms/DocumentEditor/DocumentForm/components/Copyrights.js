import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { YearInputField } from '@forms/core/DateTimeFields';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';

export class Copyrights extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    return (
      <GroupField
        border
        grouped
        action={
          <DeleteActionButton
            size="large"
            onClick={() => arrayHelpers.remove(indexPath)}
          />
        }
      >
        <GroupField widths="equal">
          <StringField
            label="Copyright holder"
            fieldPath={`${arrayPath}.${indexPath}.holder`}
            optimized
          />
          <StringField
            label="Copyright notice"
            fieldPath={`${arrayPath}.${indexPath}.statement`}
            optimized
          />
          <YearInputField
            label="Year"
            mode="year"
            fieldPath={`${arrayPath}.${indexPath}.year`}
            optimized
            className="custom-year-margin"
          />
        </GroupField>
        <GroupField>
          <StringField
            label="Copyright notice URL"
            fieldPath={`${arrayPath}.${indexPath}.url`}
            optimized
          />

          <StringField
            label="Refers to material"
            fieldPath={`${arrayPath}.${indexPath}.material`}
            optimized
          />
        </GroupField>
      </GroupField>
    );
  }

  render() {
    return (
      <AccordionField
        label="Copyrights"
        fieldPath="copyrights"
        content={
          <ArrayField
            fieldPath="copyrights"
            defaultNewValue={{
              holder: '',
              material: '',
              statement: '',
              url: '',
              year: '',
            }}
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new copyright"
          />
        }
      />
    );
  }
}
