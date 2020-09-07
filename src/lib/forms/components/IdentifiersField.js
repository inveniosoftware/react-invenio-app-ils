import { ObjectArrayField } from '@forms/core/ObjectArrayField';
import { StringField } from '@forms/core/StringField';
import { VocabularyField } from '@forms/core/VocabularyField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class IdentifiersField extends Component {
  getObjects = () => {
    const { schemeVocabularyType } = this.props;
    return [
      {
        key: 'scheme',
        element: VocabularyField,
        props: { type: schemeVocabularyType, label: 'Scheme', required: true },
      },
      {
        key: 'value',
        element: StringField,
        props: { label: 'Value', required: true },
      },
    ];
  };

  render() {
    const {
      accordion,
      fieldPath,
      label,
      defaultNewValue,
      addButtonLabel,
    } = this.props;
    return (
      <ObjectArrayField
        accordion={accordion}
        fieldPath={fieldPath}
        label={label}
        objects={this.getObjects()}
        defaultNewValue={defaultNewValue}
        addButtonLabel={addButtonLabel}
      />
    );
  }
}

IdentifiersField.propTypes = {
  accordion: PropTypes.bool,
  addButtonLabel: PropTypes.string,
  defaultNewValue: PropTypes.object,
  fieldPath: PropTypes.string,
  label: PropTypes.string,
  schemeVocabularyType: PropTypes.string,
};

IdentifiersField.defaultProps = {
  addButtonLabel: 'Add new identifier',
  accordion: false,
  fieldPath: 'identifiers',
  label: 'Identifiers',
  defaultNewValue: { scheme: '', value: '' },
  schemeVocabularyType: 'identifier_scheme',
};
