import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ObjectArrayField } from '@forms/core/ObjectArrayField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';

export class Identifiers extends Component {
  render() {
    const { scheme } = this.props;
    return (
      <ObjectArrayField
        accordion
        fieldPath="identifiers"
        label="Identifiers"
        defaultNewValue={{
          scheme: '',
          value: '',
          material: '',
        }}
        objects={[
          {
            key: 'scheme',
            element: VocabularyField,
            props: {
              type: scheme,
              label: 'Scheme',
            },
          },
          {
            key: 'value',
            element: StringField,
            props: {
              inline: true,
              label: 'Value',
              required: true,
              optimized: true,
            },
          },
          {
            key: 'material',
            element: StringField,
            props: { inline: true, label: 'Material', optimized: true },
          },
        ]}
      />
    );
  }
}

Identifiers.propTypes = {
  scheme: PropTypes.string.isRequired,
};
