import { DatePicker } from '@components/DatePicker';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'semantic-ui-react';
import { CalendarInputField } from './CalendarInputField';

export class DateInputField extends React.Component {
  cleanValueIfEmpty = (value, props) => {
    const { fieldPath } = this.props;
    const {
      form: { values, setValues },
    } = props;
    if (_isEmpty(value)) {
      if (fieldPath.includes('.')) {
        let [keyPath, nestedKeyPath] = fieldPath.split('.');
        values[keyPath][nestedKeyPath] = undefined;
      } else {
        values[fieldPath] = undefined;
      }
      setValues(values);
    }
  };

  renderFormField = (props) => {
    const { required, placeholder, fieldPath, label } = this.props;

    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <DatePicker
          id={fieldPath}
          name={fieldPath}
          placeholder={placeholder}
          required={required}
          error={props.error}
          defaultValue={props.value}
          handleBlur={props.form.handleBlur}
          handleDateChange={(value, name) => {
            props.onChange(value, name);
            this.cleanValueIfEmpty(value, props);
          }}
        />
      </Form.Field>
    );
  };

  render() {
    const { fieldPath } = this.props;
    return (
      <CalendarInputField
        optimized
        fieldPath={fieldPath}
        component={this.renderFormField}
      />
    );
  }
}

DateInputField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

DateInputField.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
};
