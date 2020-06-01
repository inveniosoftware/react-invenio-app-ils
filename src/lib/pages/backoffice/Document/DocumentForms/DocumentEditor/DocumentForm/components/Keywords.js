import React, { Component } from 'react';
import { AccordionField } from '@forms/core/AccordionField';
import { StringField } from '@forms/core/StringField';
import { GroupField } from '@forms/core/GroupField';

export class Keywords extends Component {
  render() {
    return (
      <AccordionField
        label="Keywords"
        fieldPath="keywords"
        content={
          <GroupField widths="equal">
            <StringField label="Source" fieldPath="keywords.source" optimized />
            <StringField label="Value" fieldPath="keywords.value" optimized />
          </GroupField>
        }
      />
    );
  }
}
