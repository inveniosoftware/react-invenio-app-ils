import { VocabularyField } from '@forms/core/VocabularyField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class TagsField extends Component {
  render() {
    const { type, fieldPath, label, placeholder } = this.props;
    return (
      <VocabularyField
        multiple
        type={type}
        fieldPath={fieldPath}
        label={label}
        placeholder={placeholder}
      />
    );
  }
}

TagsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
};

TagsField.defaultProps = {
  label: 'Tags',
  placeholder: 'Search for a tag...',
};
