import { invenioConfig } from '@config';
import { IdentifiersField } from '@forms/components/IdentifiersField';
import React, { Component } from 'react';

export class AlternativeIdentifiers extends Component {
  render() {
    return (
      <IdentifiersField
        accordion
        fieldPath="alternative_identifiers"
        label="Alternative Identifiers"
        schemeVocabularyType={
          invenioConfig.vocabularies.document.alternativeIdentifier.scheme
        }
      />
    );
  }
}
