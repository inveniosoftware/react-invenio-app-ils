import React, { Component } from 'react';
import Overridable from 'react-overridable';
import PropTypes from 'prop-types';
import { Table, Grid, Icon } from 'semantic-ui-react';
import { DateTime } from 'luxon';
import { InfoMessage } from '@components/InfoMessage';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export class LocationOpeningHours extends Component {
  capitalizeFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  isInInterval = (today, exception) =>
    exception.start_date <= today && today <= exception.end_date;

  renderOpenClosed = isOpen => {
    return isOpen ? (
      <span className="success">Open</span>
    ) : (
      <span className="danger">Closed</span>
    );
  };

  renderDateRange = (startDate, endDate) => {
    return startDate !== endDate ? (
      <>
        {startDate} <Icon name="arrow right" fitted /> {endDate}
      </>
    ) : (
      startDate
    );
  };

  renderHours = weekday => {
    const hoursDisplay =
      !_isEmpty(weekday['times']) &&
      weekday['times'].map(e => e.start_time + ' - ' + e.end_time).join('; ');
    return hoursDisplay && <span>{hoursDisplay}</span>;
  };

  renderWeekdayRows = today => {
    const {
      location: { metadata },
    } = this.props;
    const isNotOverriden = !_get(metadata, 'opening_exceptions', []).some(ex =>
      this.isInInterval(today, ex)
    );
    return metadata.opening_weekdays.map((weekday, idx) => {
      const isCurrent = DateTime.fromISO(today).weekday - 1 === idx;
      return (
        <Table.Row key={weekday.weekday} active={isNotOverriden && isCurrent}>
          <Table.Cell textAlign="center">
            {this.capitalizeFirst(weekday.weekday)}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {this.renderHours(weekday)}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {this.renderOpenClosed(weekday.is_open)}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  renderExceptionRows = today => {
    const { location } = this.props;
    return location.metadata.opening_exceptions.map((exception, idx) => {
      const startDate = exception.start_date,
        endDate = exception.end_date;
      const isCurrent = this.isInInterval(today, exception);
      return (
        <Table.Row key={idx} active={isCurrent}>
          <Table.Cell textAlign="left">{exception.title}</Table.Cell>
          <Table.Cell textAlign="center">
            {this.renderDateRange(startDate, endDate)}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {this.renderOpenClosed(exception.is_open)}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  render() {
    const { location } = this.props;
    const metadata = location.metadata;
    const today = DateTime.local().toISODate();
    return (
      <Grid centered columns={2}>
        <Grid.Column computer={7} mobile={16}>
          <Table striped>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell colSpan="4">Weekly schedule</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderWeekdayRows(today)}</Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column computer={9} mobile={16}>
          <Table striped>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell colSpan={4}>
                  Closures and exceptions
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderExceptionRows(today)}</Table.Body>
          </Table>
          {!metadata.opening_exceptions.length && (
            <InfoMessage message="There are no exceptions planned in the near future." />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

LocationOpeningHours.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Overridable.component(
  'LocationOpeningHours',
  LocationOpeningHours
);
