import React, { Component } from 'react';
import { Segment, Grid, Header, Message } from 'semantic-ui-react';
import { BooleanField } from '@forms/core/BooleanField';
import { HourField } from './HourField';
import { ExceptionsField } from './ExceptionsField';
import { Field } from 'formik';

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

  renderWeekday = (pathPrefix, weekday, arrayPath) => {
    const fieldPathIsOpen = `${pathPrefix}.${arrayPath}.is_open`;
    const fieldPath = `${pathPrefix}.${arrayPath}.times`;
    return (
      <Grid.Row key={arrayPath}>
        <Grid.Column width={16}>{this.renderError(fieldPath)}</Grid.Column>
        <Grid.Column width={3}>
          <BooleanField
            rightLabel={weekday}
            fieldPath={fieldPathIsOpen}
            toggle
          />
        </Grid.Column>
        {this.renderHoursPeriod(arrayPath, fieldPath, 0)}
        <Grid.Column width={1} />
        {this.renderHoursPeriod(arrayPath, fieldPath, 1)}
      </Grid.Row>
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
            {weekdays.map((weekday, i) =>
              this.renderWeekday(weekdaysFieldPath, weekday, i)
            )}
          </Grid>
        </Segment>
        <Segment>
          <ExceptionsField />
        </Segment>
      </>
    );
  }
}
