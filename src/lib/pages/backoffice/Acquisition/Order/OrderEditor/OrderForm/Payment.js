import { invenioConfig } from '@config';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { GroupField } from '@forms/core/GroupField';
import { PriceField } from '@forms/core/PriceField';
import { VocabularyField } from '@forms/core/VocabularyField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import React, { Component } from 'react';
import { Funds } from './Funds';

export class Payment extends Component {
  render() {
    return (
      <>
        <GroupField widths="equal">
          <PriceField
            label="Debit Cost"
            fieldPath="payment.debit_cost"
            defaultCurrency={invenioConfig.APP.defaultCurrency}
          />
          <PriceField
            label="Debit Cost in Main Currency"
            fieldPath="payment.debit_cost_main_currency"
            canSelectCurrency={false}
            defaultCurrency={invenioConfig.APP.defaultCurrency}
          />
          <DateInputField
            label="Debit Date"
            fieldPath="payment.debit_date"
            optimized
          />
        </GroupField>
        <GroupField widths="equal">
          <VocabularyField
            type={invenioConfig.VOCABULARIES.acqOrders.acq_payment_mode}
            fieldPath="payment.mode"
            label="Payment mode"
            placeholder="Select payment mode..."
            required
          />
          <StringField
            label="Internal Purchase Requisition ID"
            fieldPath="payment.internal_purchase_requisition_id"
          />
        </GroupField>
        <Funds />
        <TextField label="Debit Note" fieldPath="payment.debit_note" rows={3} />
      </>
    );
  }
}
