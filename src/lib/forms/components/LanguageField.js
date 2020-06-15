import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VocabularyField } from '@forms/core/VocabularyField';

export class LanguageField extends Component {
  render() {
    const { multiple, type, fieldPath } = this.props;
    return (
      <VocabularyField
        multiple={multiple}
        type={type}
        fieldPath={fieldPath}
        label={multiple ? 'Languages' : 'Language'}
        placeholder={multiple ? 'Select languages...' : 'Select language'}
      />
    );
  }
}

LanguageField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

LanguageField.defaultProps = {
  multiple: false,
};
