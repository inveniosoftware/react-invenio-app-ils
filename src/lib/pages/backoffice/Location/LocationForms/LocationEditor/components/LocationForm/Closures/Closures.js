import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Header,
  Message,
  Button,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { BooleanField } from '@forms/core/BooleanField';
import { HourField } from './HourField';
import { ExceptionsField } from './ExceptionsField';
import { Field, getIn } from 'formik';

class Weekday extends Component {
  state = {
    singlePeriod: null,
  };

  handleAddPeriod = (props, fieldPath) => {
    this.setState({ singlePeriod: false });
  };

  handleRemovePeriod = (props, fieldPath) => {
    const {
      form: { setFieldValue },
    } = props;
    setFieldValue(`${fieldPath}.1`, null);
    this.setState({ singlePeriod: true });
  };

  renderHourField = (fieldPath, index, placeholder) => {
    return (
      <Grid.Column>
        <HourField
          placeholder={placeholder}
          fieldPath={fieldPath}
          parentFieldPath="opening_weekdays"
          index={index}
          dependantValue="is_open"
          required
        />
      </Grid.Column>
    );
  };

  renderHoursPeriod = (arrayPath, fieldPath, idx) => {
    const arrayPrefix = `${fieldPath}.${idx}`;
    return (
      <>
        {this.renderHourField(`${arrayPrefix}.start_time`, arrayPath, 'From')}
        {this.renderHourField(`${arrayPrefix}.end_time`, arrayPath, 'To')}
      </>
    );
  };

  renderField = props => {
    const { pathPrefix, weekday, arrayPath, errorRenderer } = this.props;
    const {
      form: { values },
    } = props;
    const { singlePeriod: singlePeriodState } = this.state;
    const groupPath = `${pathPrefix}.${arrayPath}`;
    const fieldPathIsOpen = `${groupPath}.is_open`;
    const fieldPath = `${groupPath}.times`;
    const disabled = !getIn(values, fieldPathIsOpen, null);
    const singlePeriod =
      singlePeriodState !== null
        ? singlePeriodState
        : getIn(values, fieldPath, []).length !== 2;
    return (
      <Grid.Row key={arrayPath}>
        <Grid.Column width={16}>{errorRenderer(fieldPath)}</Grid.Column>
        <Grid.Column width={3}>
          <BooleanField
            rightLabel={weekday}
            fieldPath={fieldPathIsOpen}
            toggle
          />
        </Grid.Column>
        {this.renderHoursPeriod(arrayPath, fieldPath, 0)}
        {singlePeriod ? (
          <Grid.Column width={1}>
            <Button
              secondary
              basic
              onClick={this.handleAddPeriod}
              disabled={disabled}
            >
              <Icon name="add" fitted />
            </Button>
          </Grid.Column>
        ) : (
          <>
            <Grid.Column width={1} />
            {this.renderHoursPeriod(arrayPath, fieldPath, 1)}
            <Grid.Column width={1}>
              <Button
                secondary
                basic
                onClick={() => this.handleRemovePeriod(props, fieldPath)}
                disabled={disabled}
              >
                <Icon name="delete" fitted />
              </Button>
            </Grid.Column>
          </>
        )}
      </Grid.Row>
    );
  };

  render() {
    const { weekday } = this.props;
    return <Field name={weekday} component={this.renderField} />;
  }
}

Weekday.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
  weekday: PropTypes.string.isRequired,
  arrayPath: PropTypes.number.isRequired,
  errorRenderer: PropTypes.func.isRequired,
};

export default class Closures extends Component {
  renderError = fieldPath => {
    return (
      <Field
        name="error-message"
        component={({ form: { errors } }) =>
          fieldPath in errors && (
            <Message negative content={errors[fieldPath]} />
          )
        }
      />
    );
  };

  render() {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const weekdaysFieldPath = 'opening_weekdays';
    return (
      <>
        <Segment>
          <Header as="h4">Opening hours</Header>
          {this.renderError(weekdaysFieldPath)}
          <Grid columns={6}>
            {weekdays.map((weekday, i) => (
              <Weekday
                key={weekday}
                pathPrefix={weekdaysFieldPath}
                weekday={weekday}
                arrayPath={i}
                errorRenderer={this.renderError}
              />
            ))}
          </Grid>
        </Segment>
        <Segment>
          <ExceptionsField />
        </Segment>
      </>
    );
  }
}
