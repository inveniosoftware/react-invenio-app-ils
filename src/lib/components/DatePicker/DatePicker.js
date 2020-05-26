import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultValue,
    };
  }

  handleDateChange = (_, { name, value }) => {
    const { handleDateChange } = this.props;
    this.setState({ selectedDate: value });
    handleDateChange(value, name);
  };

  render() {
    const {
      initialDate,
      minDate,
      maxDate,
      error,
      label,
      id,
      name,
      placeholder,
    } = this.props;
    const { selectedDate } = this.state;
    return (
      <DateInput
        autoComplete="off"
        clearable
        closable
        iconPosition="left"
        initialDate={initialDate}
        minDate={minDate}
        maxDate={maxDate}
        error={error}
        label={label}
        id={id}
        name={name}
        onChange={this.handleDateChange}
        placeholder={placeholder}
        value={selectedDate}
        data-test={selectedDate}
        dateFormat="YYYY-MM-DD"
        animation="none"
      />
    );
  }
}

DatePicker.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.object,
  handleDateChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  initialDate: PropTypes.string,
  label: PropTypes.string,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

DatePicker.defaultProps = {
  initialDate: '',
  minDate: '',
  maxDate: '',
  defaultValue: '',
  placeholder: '',
  name: 'selectedDate',
  id: null,
  label: null,
  error: {},
};

export default Overridable.component('DatePicker', DatePicker);
