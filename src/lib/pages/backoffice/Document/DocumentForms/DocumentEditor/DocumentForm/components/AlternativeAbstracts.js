import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { TextField } from '@forms/core/TextField';
import React, { Component } from 'react';

export class AlternativeAbstracts extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    return (
      <GroupField
        basic
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <TextField
          label="Abstract"
          fieldPath={`${arrayPath}.${indexPath}`}
          width={14}
          optimized
        />
      </GroupField>
    );
  }

  render() {
    return (
      <AccordionField
        label="Alternative abstracts"
        fieldPath="alternative_abstracts"
        content={
          <ArrayField
            fieldPath="alternative_abstracts"
            defaultNewValue=""
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new abstract"
          />
        }
      />
    );
  }
}
