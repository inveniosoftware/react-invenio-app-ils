import { fromISO, toShortDate } from '@api/date';
import { DatePicker } from '@components/DatePicker';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'semantic-ui-react';
import { CalendarInputField } from './CalendarInputField';

export class DateInputField extends React.Component {
  renderFormField = props => {
    const { required, placeholder, fieldPath, label } = this.props;
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <DatePicker
          id={fieldPath}
          name={fieldPath}
          placeholder={placeholder}
          error={props.error}
          defaultValue={toShortDate(props.value)}
          handleBlur={props.form.handleBlur}
          handleDateChange={(value, name) => {
            props.onChange(fromISO(value), name);
          }}
        />
      </Form.Field>
    );
  };

  render() {
    const { fieldPath } = this.props;
    return (
      <CalendarInputField
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
};
