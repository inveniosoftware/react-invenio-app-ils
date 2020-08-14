import { invenioConfig } from '@config';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { PriceField } from '@forms/core/PriceField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { VocabularyField } from '@forms/core/VocabularyField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export class Payment extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <VocabularyField
              type={
                invenioConfig.VOCABULARIES.illBorrowingRequests.ill_payment_mode
              }
              fieldPath="payment.mode"
              label="Payment mode"
              placeholder="Select payment mode..."
              required
            />
          </Grid.Column>
          <Grid.Column>
            <PriceField
              label="Debit Cost"
              fieldPath="payment.debit_cost"
              currencies={currencies}
              defaultCurrency={invenioConfig.APP.defaultCurrency}
            />
          </Grid.Column>
          <Grid.Column>
            <PriceField
              label="Debit Cost in Main Currency"
              fieldPath="payment.debit_cost_main_currency"
              currencies={currencies}
              canSelectCurrency={false}
              defaultCurrency={invenioConfig.APP.defaultCurrency}
            />
          </Grid.Column>
          <Grid.Column>
            <DateInputField
              label="Debit Date"
              fieldPath="payment.debit_date"
              optimized
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <StringField
              label="Internal Purchase Requisition ID"
              fieldPath="payment.internal_purchase_requisition_id"
            />
          </Grid.Column>
          <Grid.Column>
            <StringField label="Budget code" fieldPath="payment.budget_code" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TextField
              label="Debit Note"
              fieldPath="payment.debit_note"
              rows={3}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Payment.propTypes = {
  currencies: PropTypes.array.isRequired,
};
