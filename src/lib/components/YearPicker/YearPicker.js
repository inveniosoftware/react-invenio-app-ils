import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { YearInput } from 'semantic-ui-calendar-react';

class YearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: props.defaultValue,
    };
  }

  handleYearChange = (_, { name, value }) => {
    const { handleYearChange } = this.props;
    this.setState({ selectedYear: value });
    handleYearChange(value, name);
  };

  render() {
    const {
      initialYear,
      error,
      label,
      id,
      name,
      placeholder,
      className,
    } = this.props;
    const { selectedYear } = this.state;
    return (
      <YearInput
        className={className}
        autoComplete="off"
        clearable
        closable
        iconPosition="left"
        initialDate={initialYear}
        error={error}
        label={label}
        id={id}
        name={name}
        onChange={this.handleYearChange}
        placeholder={placeholder}
        value={selectedYear}
        data-test={selectedYear}
      />
    );
  }
}

YearPicker.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.object,
  handleYearChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  initialYear: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

YearPicker.defaultProps = {
  initialYear: '',
  defaultValue: '',
  placeholder: '',
  name: 'selectedYear',
  error: null,
  id: '',
  label: '',
  className: '',
};

export default Overridable.component('YearPicker', YearPicker);
