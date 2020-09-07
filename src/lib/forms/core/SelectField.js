import { FastField, Field, getIn } from 'formik';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

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
          value: undefined,
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
      error,
      fieldPath,
      label,
      loading,
      multiple,
      optimized,
      options,
      width,
      ...uiProps
    } = this.props;
    const value = getIn(values, fieldPath, multiple ? [] : '');
    return (
      <Form.Field width={width}>
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
          error={error || this.renderError(errors, fieldPath, value)}
          options={this.getAllOptions(options, value)}
          value={value}
          renderLabel={this.renderLabel}
          {...uiProps}
        />
      </Form.Field>
    );
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

SelectField.propTypes = {
  error: PropTypes.object,
  fieldPath: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  multiple: PropTypes.bool,
  optimized: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  width: PropTypes.number,
};

SelectField.defaultProps = {
  multiple: false,
  optimized: false,
  error: null,
  loading: false,
  required: false,
  label: '',
  width: 16,
};
