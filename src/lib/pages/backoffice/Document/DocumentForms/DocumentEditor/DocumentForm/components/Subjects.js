import React, { Component } from 'react';
import { ObjectArrayField } from '@forms/core/ObjectArrayField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';
import { invenioConfig } from '@config';

export class Subjects extends Component {
  getObjects = () => {
    return [
      {
        key: 'scheme',
        element: VocabularyField,
        props: {
          type: invenioConfig.VOCABULARIES.document.doc_subjects,
          label: 'Scheme',
          required: true,
        },
      },
      {
        key: 'value',
        element: StringField,
        props: { label: 'Subject value', required: true },
      },
    ];
  };

  render() {
    return (
      <ObjectArrayField
        accordion
        fieldPath="subjects"
        label="Subjects classification"
        objects={this.getObjects()}
        defaultNewValue={{ scheme: '', value: '' }}
        addButtonLabel="Add new subject"
      />
    );
  }
}
