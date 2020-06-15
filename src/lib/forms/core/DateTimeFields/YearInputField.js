import React from 'react';
import PropTypes from 'prop-types';
import { CalendarInputField } from './CalendarInputField';
import { YearPicker } from '@components/YearPicker';
import { Form } from 'semantic-ui-react';

export class YearInputField extends React.Component {
  renderFormField = props => {
    const { required, label, placeholder, fieldPath } = this.props;
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <YearPicker
          id={fieldPath}
          name={fieldPath}
          placeholder={placeholder}
          error={props.error}
          defaultValue={`${props.value}`}
          handleBlur={props.form.handleBlur}
          handleYearChange={props.onChange}
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

YearInputField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

YearInputField.defaultProps = {
  label: '',
  placeholder: '',
};
