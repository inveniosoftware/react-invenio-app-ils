import { locationApi } from '@api/locations';
import { DatePicker } from '@components/DatePicker';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class LocationDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledDates: [],
      isLoading: false,
      error: null,
    };
  }

  fetchData = () => {
    this.fetchLocationClosurePeriods();
  };

  fetchLocationClosurePeriods = async () => {
    const { locationPid } = this.props;

    if (!locationPid) {
      this.setState({
        isLoading: false,
        disabledDates: [],
        error: { message: 'Location PID is missing.' },
      });
      return;
    }

    this.setState({ isLoading: true, error: null });

    const currentYear = DateTime.now().year;
    const yearsToFetch = [currentYear - 1, currentYear, currentYear + 1];

    try {
      const promises = yearsToFetch.map((year) =>
        locationApi.getClosurePerdiods(locationPid, year)
      );

      const responses = await Promise.all(promises);

      let allDisabledDateRanges = [];
      responses.forEach((response, _) => {
        allDisabledDateRanges = allDisabledDateRanges.concat(response.data);
      });

      const disabledDates = [];
      allDisabledDateRanges.forEach((range) => {
        let currentDate = DateTime.fromISO(range.start);
        const endDate = DateTime.fromISO(range.end);

        while (currentDate <= endDate) {
          disabledDates.push(currentDate.toISODate());
          currentDate = currentDate.plus({ days: 1 });
        }
      });

      this.setState({
        disabledDates: disabledDates,
        isLoading: false,
      });
    } catch (fetchError) {
      console.error(
        'LocationDatePicker: Failed to fetch closure periods.',
        fetchError
      );
      this.setState({ isLoading: false, error: fetchError });
    }
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
    const { disabledDates, isLoading, error } = this.state;

    if (error) {
      console.error(error);
      return null;
    }

    return (
      <DatePicker
        {...otherProps}
        minDate={minDate}
        maxDate={maxDate}
        disable={disabledDates}
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
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
};

LocationDatePicker.defaultProps = {
  defaultValue: '',
  locationPid: null,
  minDate: null,
  maxDate: null,
};
