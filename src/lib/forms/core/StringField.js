import { FastField, Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export class StringField extends Component {
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
    const {
      fieldPath,
      inline,
      width,
      optimized,
      customLabel,
      label,
      ...uiProps
    } = this.props;
    const {
      form: { values, handleChange, handleBlur, errors, status, isSubmitting },
    } = props;
    return (
      <Form.Field inline={inline} width={width} disabled={isSubmitting}>
        {customLabel && customLabel}
        <Form.Input
          fluid
          id={fieldPath}
          name={fieldPath}
          onChange={handleChange}
          onBlur={handleBlur}
          value={getIn(values, fieldPath, '')}
          error={this.renderError(status || errors, fieldPath)}
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

StringField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  optimized: PropTypes.bool,
  width: PropTypes.number,
  customLabel: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  label: PropTypes.string,
};

StringField.defaultProps = {
  inline: false,
  optimized: true,
  width: 16,
  customLabel: null,
  label: '',
};
