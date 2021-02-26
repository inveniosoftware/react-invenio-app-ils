import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TimeInput } from 'semantic-ui-calendar-react';
import { Form } from 'semantic-ui-react';

/**
 * Custom widget for a time field
 */
export class RJSFTimeWidget extends Component {
  render() {
    const {
      id,
      value,
      required,
      disabled,
      placeholder,
      readonly,
      label,
      onChange,
    } = this.props;
    return (
      <Form.Field
        id={id}
        key={id}
        required={required}
        disabled={disabled || readonly}
      >
        <label>{label}</label>
        <TimeInput
          placeholder={placeholder}
          value={value}
          disabled={disabled || readonly}
          iconPosition="left"
          closable
          onChange={(_, selected) => {
            onChange(selected['value']);
          }}
          required={required}
        />
      </Form.Field>
    );
  }
}

RJSFTimeWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RJSFTimeWidget.defaultProps = {
  value: '',
  required: false,
  disabled: false,
  placeholder: '',
  readonly: false,
  label: '',
};
