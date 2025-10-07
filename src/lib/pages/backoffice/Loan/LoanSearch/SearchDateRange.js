import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { DatePicker } from '@components/DatePicker';
import { withState } from 'react-searchkit';

export class _SearchDateRange extends Component {
  getCurrentDates() {
    const {
      currentQueryState: { filters },
    } = this.props;
    let fromDate = '';
    let toDate = '';

    filters.forEach(([name, value]) => {
      if (name === 'loans_from_date') fromDate = value;
      if (name === 'loans_to_date') toDate = value;
    });
    return [fromDate, toDate];
  }

  onDateChange = (field, value) => {
    const { currentQueryState, updateQueryState } = this.props;

    const updatedFilters = currentQueryState.filters.filter(
      ([name]) => name !== field
    );

    if (value !== '') {
      updatedFilters.push([field, value]);
    }

    return updateQueryState({ filters: updatedFilters });
  };

  render() {
    const [fromDate, toDate] = this.getCurrentDates();

    return (
      <Card>
        <Card.Content>
          <Card.Header>Date</Card.Header>
          <Card.Meta>
            <span>*Loan start date</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <DatePicker
            maxDate={toDate}
            defaultValue={fromDate}
            placeholder="From"
            handleDateChange={(value) =>
              this.onDateChange('loans_from_date', value)
            }
          />
        </Card.Content>
        <Card.Content>
          <DatePicker
            minDate={fromDate}
            defaultValue={toDate}
            placeholder="To"
            handleDateChange={(value) =>
              this.onDateChange('loans_to_date', value)
            }
          />
        </Card.Content>
      </Card>
    );
  }
}

export const SearchDateRange = withState(_SearchDateRange);

_SearchDateRange.propTypes = {
  currentQueryState: PropTypes.object.isRequired,
  updateQueryState: PropTypes.func.isRequired,
};
