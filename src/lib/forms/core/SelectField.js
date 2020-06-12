import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

export class SelectField extends Component {
  renderError = (errors, name, value, direction = 'above') => {
    const { options } = this.props;
    let error = null;
    if (!Array.isArray(value)) {
      if (
        !_isEmpty(options) &&
        !options.find(o => o.value === value) &&
        !_isEmpty(value)
      ) {
        error = `The current value "${value}" is invalid, please select another value.`;
      }
    }

    if (!error) {
      error = errors[name];
    }
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  };

  getAllOptions = (options, values) => {
    const { required, loading } = this.props;
    if (!Array.isArray(values)) {
      values = [values];
    }
    if (!required) {
      options = [
        {
          key: '',
          value: '',
          text: '-',
        },
        ...options,
      ];
    }
    if (!loading) {
      for (const value of values) {
        if (!_isEmpty(value) && !options.find(o => o.value === value)) {
          options.push({
            key: value,
            value: value,
            text: `Missing value: ${value}`,
            error: undefined, // set the key so we can check it in renderLabel
          });
        }
      }
    }
    return options;
  };

  renderLabel = (item, index, defaultLabelProps) => {
    const { loading } = this.props;
    if (!loading && 'error' in item) {
      defaultLabelProps.className = 'error';
    }
    return item.text;
  };

  renderFormField = props => {
    const {
      form: { values, setFieldValue, handleBlur, errors },
    } = props;
    const {
      defaultValue,
      error,
      fieldPath,
      label,
      loading,
      multiple,
      optimized,
      options,
      ...uiProps
    } = this.props;
    const value = getIn(values, fieldPath, multiple ? [] : defaultValue);
    return (
      <Form.Dropdown
        fluid
        selection
        searchInput={{ id: fieldPath }}
        label={{ children: label, htmlFor: fieldPath }}
        loading={loading}
        multiple={multiple}
        id={fieldPath}
        name={fieldPath}
        onChange={(event, data) => {
          setFieldValue(fieldPath, data.value);
        }}
        onBlur={handleBlur}
        value={value}
        error={error || this.renderError(errors, fieldPath, value)}
        options={this.getAllOptions(options, value)}
        renderLabel={this.renderLabel}
        {...uiProps}
      />
    );
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

SelectField.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.object,
  fieldPath: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  multiple: PropTypes.bool,
  optimized: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
};

SelectField.defaultProps = {
  defaultValue: '',
  multiple: false,
  optimized: false,
};
