import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VocabularyField } from '@forms';

export class TagsField extends Component {
  render() {
    const { type, fieldPath, label, placeholder } = this.props;
    return (
      <VocabularyField
        accordion
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
