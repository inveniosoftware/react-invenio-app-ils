import { locationApi } from '@api/locations';
import { withCancel } from '@api/utils';
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
    this.cancellableFetches = [];
  }

  componentWillUnmount() {
    this.cancellableFetches.forEach((cancellable) => cancellable.cancel());
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
      const promises = yearsToFetch.map((year) => {
        const cancellable = withCancel(
          locationApi.getClosurePeriods(locationPid, year)
        );
        this.cancellableFetches.push(cancellable);
        return cancellable.promise;
      });

      const responses = await Promise.all(promises);
      const disabledDateRanges = responses.flatMap((response) => response.data);

      const disabledDates = disabledDateRanges.flatMap((dateRange) => {
        const dates = [];
        let currentDate = DateTime.fromISO(dateRange.start);
        const endDate = DateTime.fromISO(dateRange.end);

        while (currentDate <= endDate) {
          dates.push(currentDate.toISODate());
          currentDate = currentDate.plus({ days: 1 });
        }

        return dates;
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
