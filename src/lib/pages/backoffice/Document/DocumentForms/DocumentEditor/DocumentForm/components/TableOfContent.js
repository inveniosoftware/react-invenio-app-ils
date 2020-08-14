import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';

export class TableOfContent extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    return (
      <GroupField
        border
        widths="equal"
        action={
          <DeleteActionButton
            size="large"
            onClick={() => arrayHelpers.remove(indexPath)}
          />
        }
      >
        <StringField
          label={`Chapter ${indexPath + 1}`}
          fieldPath={`${arrayPath}.${indexPath}`}
          optimized
        />
      </GroupField>
    );
  }

  render() {
    return (
      <AccordionField
        label="Table of content"
        fieldPath="table_of_content"
        content={
          <ArrayField
            fieldPath="table_of_content"
            defaultNewValue=""
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new chapter"
          />
        }
      />
    );
  }
}
