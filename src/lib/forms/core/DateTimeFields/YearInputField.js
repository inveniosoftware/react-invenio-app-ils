import { YearPicker } from '@components/YearPicker';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'semantic-ui-react';
import { CalendarInputField } from './CalendarInputField';

export class YearInputField extends React.Component {
  renderFormField = props => {
    const { required, label, placeholder, fieldPath, className } = this.props;
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <YearPicker
          className={className}
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
      <Form.Field>
        <CalendarInputField
          fieldPath={fieldPath}
          component={this.renderFormField}
        />
      </Form.Field>
    );
  }
}

YearInputField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

YearInputField.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
  className: '',
};
