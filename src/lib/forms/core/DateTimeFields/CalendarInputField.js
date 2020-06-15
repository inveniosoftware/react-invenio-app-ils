import React from 'react';
import PropTypes from 'prop-types';
import { FastField, Field, getIn } from 'formik';

export class CalendarInputField extends React.Component {
  renderFormField = props => {
    const { fieldPath, component } = this.props;
    const {
      form: { values, errors, setFieldValue },
    } = props;
    const value = getIn(values, fieldPath, '');
    const error = getIn(errors, fieldPath, null);

    const onChange = (value, name) => {
      setFieldValue(name, value);
    };

    const newProps = {
      error: error,
      form: props.form,
      onChange: onChange,
      value: value,
    };

    return component(newProps);
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

CalendarInputField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  optimized: PropTypes.bool,
};

CalendarInputField.defaultProps = {
  optimized: false,
};
