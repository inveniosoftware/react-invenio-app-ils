import { DeleteActionButton } from '@forms/components';
import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';

export class Keywords extends Component {
  renderKeyword = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const path = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        basic
        border
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <GroupField widths="equal">
          <StringField fluid label="Keyword" fieldPath={`${path}.value`} />
          <StringField
            fluid
            label="Keyword source"
            fieldPath={`${path}.source`}
          />
        </GroupField>
      </GroupField>
    );
  };
  render() {
    return (
      <AccordionField
        label="Keywords"
        fieldPath="keywords"
        content={
          <ArrayField
            fieldPath="keywords"
            defaultNewValue={{ value: '', source: '' }}
            renderArrayItem={this.renderKeyword}
            addButtonLabel="Add keyword"
          />
        }
      />
    );
  }
}
