import { ObjectArrayField } from '@forms/core/ObjectArrayField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Identifiers extends Component {
  render() {
    const { scheme, materialObject } = this.props;
    const objects = [
      {
        key: 'scheme',
        element: VocabularyField,
        props: {
          type: scheme,
          required: true,
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
    ];
    const defaultMaterialObject = {
      key: 'material',
      element: StringField,
      props: { inline: true, label: 'Material', optimized: true },
    };
    materialObject
      ? objects.push(materialObject)
      : objects.push(defaultMaterialObject);
    return (
      <ObjectArrayField
        accordion
        fieldPath="identifiers"
        label="Identifiers"
        defaultNewValue={{
          scheme: undefined,
          value: undefined,
          material: undefined,
        }}
        objects={objects}
      />
    );
  }
}

Identifiers.propTypes = {
  scheme: PropTypes.string.isRequired,
  materialObject: PropTypes.object,
};

Identifiers.defaultProps = {
  materialObject: null,
};
