import React from 'react';
import { AccordionField } from '@forms/core/AccordionField';
import { VocabularyField } from '@forms/core/VocabularyField';
import { invenioConfig } from '@config';

export class LicensesField extends React.Component {
  render() {
    return (
      <AccordionField
        label="Licenses"
        fieldPath="licenses"
        content={
          <VocabularyField
            multiple
            type={invenioConfig.vocabularies.document.license}
            fieldPath="licenses"
          />
        }
      />
    );
  }
}
