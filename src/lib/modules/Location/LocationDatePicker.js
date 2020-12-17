import { locationApi } from '@api/locations';
import { DatePicker } from '@components/DatePicker';
import _isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class LocationDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: false,
      error: {},
    };
  }

  fetchLocation = async (locationPid) => {
    this.setState({ isLoading: true });
    try {
      const response = await locationApi.get(locationPid);
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      this.setState({ isLoading: false, error: error });
    }
  };

  disableAllDates = (minDate, maxDate, disabled) => {
    let date = DateTime.fromISO(minDate);
    const dateMax = DateTime.fromISO(maxDate);
    while (date <= dateMax) {
      const dateISO = date.toISODate();
      disabled.push(dateISO);
      date = date.plus({ days: 1 });
    }
  };

  disableClosures = (maxDate, minDate, data, disabled) => {
    const weekdays = data.metadata.opening_weekdays,
      exceptions = data.metadata.opening_exceptions;
    let date = DateTime.fromISO(minDate);
    const dateMax = DateTime.fromISO(maxDate);
    while (date <= dateMax) {
      const dateISO = date.toISODate();
      let isOpen = weekdays[date.weekday - 1].is_open;
      exceptions.forEach((exception) => {
        if (exception.start_date <= dateISO && dateISO <= exception.end_date) {
          isOpen = exception.is_open;
        }
      });
      if (!isOpen) {
        disabled.push(dateISO);
      }
      date = date.plus({ days: 1 });
    }
  };

  listDisabled = () => {
    const { minDate, maxDate } = this.props;
    const { isLoading, error, data } = this.state;
    const disabled = [];
    if (isLoading) {
      this.disableAllDates(minDate, maxDate, disabled);
    } else if (!error.response && !_isEmpty(data)) {
      this.disableClosures(maxDate, minDate, data, disabled);
    }
    return disabled;
  };

  fetchData = () => {
    const { locationPid } = this.props;
    this.fetchLocation(locationPid);
  };

  render() {
    const {
      minDate,
      maxDate,
      handleDateChange,
      defaultValue,
      locationPid,
      ...otherProps
    } = this.props;
    const { isLoading } = this.state;
    return (
      <DatePicker
        {...otherProps}
        minDate={minDate}
        maxDate={maxDate}
        disable={this.listDisabled()}
        handleDateChange={handleDateChange}
        loading={isLoading}
        fetchData={this.fetchData}
        initialDate=""
        defaultValue={defaultValue}
        locationPid={locationPid}
      />
    );
  }
}

LocationDatePicker.propTypes = {
  defaultValue: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired,
  locationPid: PropTypes.string,
  maxDate: PropTypes.string.isRequired,
  minDate: PropTypes.string.isRequired,
};

LocationDatePicker.defaultProps = {
  defaultValue: '',
  locationPid: null,
};
