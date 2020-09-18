import { FastField, Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';

export class HourField extends Component {
  renderError(errors, name, direction = 'above') {
    const error = errors[name];
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  }

  handleChange = (props, value, name) => {
    const {
      form: { setFieldValue },
    } = props;
    setFieldValue(name['name'], name['value']);
  };

  renderFormField = props => {
    const {
      inline,
      width,
      fieldPath,
      placeholder,
      parentFieldPath,
      index,
      dependantValue,
    } = this.props;
    const {
      form: { values, errors },
    } = props;
    let error;
    if (fieldPath in errors) {
      error = errors[fieldPath];
    }
    let isDisabled = false;
    if (values && parentFieldPath && (index || index === 0) && dependantValue) {
      isDisabled = !values[parentFieldPath][index][dependantValue];
    }
    const value = getIn(values, fieldPath, '');
    return (
      <Form.Field inline={inline} width={width}>
        <TimeInput
          error={error}
          name={fieldPath}
          placeholder={placeholder}
          value={isDisabled ? '' : value}
          disabled={isDisabled}
          iconPosition="left"
          closable
          onChange={(value, name) => {
            this.handleChange(props, value, name);
          }}
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

HourField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  parentFieldPath: PropTypes.string,
  index: PropTypes.number,
  dependantValue: PropTypes.string,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  optimized: PropTypes.bool,
  width: PropTypes.number,
};

HourField.defaultProps = {
  parentFieldPath: '',
  index: null,
  dependantValue: '',
  inline: false,
  optimized: false,
  width: 16,
  placeholder: '',
};
