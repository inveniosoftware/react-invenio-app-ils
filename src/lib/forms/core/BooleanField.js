import { FastField, Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export class BooleanField extends Component {
  renderError(errors, name, direction = 'left') {
    const error = errors[name];
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  }

  renderFormField = props => {
    const {
      fieldPath,
      leftLabel,
      rightLabel,
      optimized,
      ...uiProps
    } = this.props;
    const {
      form: { values, handleBlur, errors, setFieldValue },
    } = props;
    const value = getIn(values, fieldPath, false);
    return (
      <Form.Group inline>
        <label htmlFor={fieldPath}>{leftLabel}</label>
        <Form.Checkbox
          id={fieldPath}
          name={fieldPath}
          onChange={() => setFieldValue(fieldPath, !value)}
          onBlur={handleBlur}
          checked={value}
          error={this.renderError(errors, fieldPath)}
          {...uiProps}
        />
        <label htmlFor={fieldPath}>{rightLabel}</label>
      </Form.Group>
    );
  };
  render() {
    const { fieldPath, optimized } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

BooleanField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  optimized: PropTypes.bool,
};

BooleanField.defaultProps = {
  leftLabel: '',
  rightLabel: '',
  optimized: false,
};
