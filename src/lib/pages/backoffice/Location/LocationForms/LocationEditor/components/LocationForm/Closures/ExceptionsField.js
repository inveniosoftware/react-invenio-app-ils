import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';
import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { BooleanField } from '@forms/core/BooleanField';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { Divider, Grid } from 'semantic-ui-react';

export class ExceptionsField extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    const objectPath = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        border
        grouped
        widths="equal"
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <Grid columns={4}>
          <Grid.Column width={2}>
            <Divider hidden />
            <BooleanField
              leftLabel="Closed"
              rightLabel="Opening"
              fieldPath={`${objectPath}.is_open`}
              toggle
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <StringField
              label="Title"
              fieldPath={`${objectPath}.title`}
              required
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <DateInputField
              label="Start date"
              fieldPath={`${objectPath}.start_date`}
              optimized
              required
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <DateInputField
              label="End date"
              fieldPath={`${objectPath}.end_date`}
              optimized
              required
            />
          </Grid.Column>
        </Grid>
      </GroupField>
    );
  }

  render() {
    return (
      <AccordionField
        label="Exceptions"
        fieldPath="opening_exceptions"
        content={
          <ArrayField
            fieldPath="opening_exceptions"
            defaultNewValue={{
              title: undefined,
              is_open: undefined,
              start_date: undefined,
              end_date: undefined,
            }}
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new exception"
          />
        }
      />
    );
  }
}
