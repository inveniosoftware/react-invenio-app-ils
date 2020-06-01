import { AccordionField } from '@forms/core/AccordionField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';

export class Imprint extends Component {
  render() {
    return (
      <AccordionField
        label="Imprint"
        fieldPath="imprint"
        content={
          <>
            <GroupField widths="equal">
              <StringField
                label="Publisher"
                fieldPath="imprint.publisher"
                optimized
              />
              <StringField
                label="Date of publication"
                fieldPath="imprint.date"
                optimized
              />
            </GroupField>
            <GroupField widths="equal">
              <StringField
                label="Place of publication"
                fieldPath="imprint.place"
                optimized
              />
              <StringField
                label="Date of reprint"
                fieldPath="imprint.reprint_date"
                optimized
              />
            </GroupField>
          </>
        }
      />
    );
  }
}
