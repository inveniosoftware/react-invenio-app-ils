import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';
import { Form } from 'semantic-ui-react';

export class TextField extends Component {
  renderError(errors, name, direction = 'above') {
    const error = errors[name];
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  }

  renderFormField = (props) => {
    const { fieldPath, optimized, label, customLabel, ...uiProps } = this.props;
    const {
      form: { values, handleChange, handleBlur, errors, isSubmitting },
    } = props;
    return (
      <Form.Field disabled={isSubmitting}>
        {customLabel && customLabel}
        <Form.TextArea
          id={fieldPath}
          name={fieldPath}
          onChange={handleChange}
          onBlur={handleBlur}
          value={getIn(values, fieldPath, '')}
          error={this.renderError(errors, fieldPath)}
          label={!customLabel ? label : null}
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

TextField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  optimized: PropTypes.bool,
  label: PropTypes.string,
  customLabel: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

TextField.defaultProps = {
  optimized: false,
  label: '',
  customLabel: null,
};
