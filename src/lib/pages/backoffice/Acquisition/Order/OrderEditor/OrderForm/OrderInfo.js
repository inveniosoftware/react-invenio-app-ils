import { vendorApi } from '@api/acquisition';
import { invenioConfig } from '@config';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { GroupField } from '@forms/core/GroupField';
import { PriceField } from '@forms/core/PriceField';
import { SelectField } from '@forms/core/SelectField';
import { SelectorField } from '@forms/core/SelectorField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { serializeVendor } from '@modules/ESSelector/serializer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class OrderInfo extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <>
        <SelectorField
          required
          emptyHeader="No vendor selected"
          emptyDescription="Please select a vendor."
          fieldPath="vendor"
          errorPath="vendor_pid"
          label="Vendor"
          placeholder="Search for a vendor..."
          query={vendorApi.list}
          serializer={serializeVendor}
        />
        <GroupField widths="equal">
          <SelectField
            required
            search
            label="Status"
            fieldPath="status"
            options={invenioConfig.ACQ_ORDERS.statuses}
          />
          <StringField label="Cancel Reason" fieldPath="cancel_reason" />
        </GroupField>

        <GroupField widths="equal">
          <DateInputField
            label="Order Date"
            fieldPath="order_date"
            optimized
            required
          />
          <DateInputField
            label="Expected Delivery Date"
            fieldPath="expected_delivery_date"
            optimized
          />
          <DateInputField
            label="Received date"
            fieldPath="received_date"
            optimized
          />
        </GroupField>

        <GroupField widths="equal">
          <PriceField
            label="Total"
            fieldPath="grand_total"
            currencies={currencies}
            defaultCurrency={invenioConfig.APP.defaultCurrency}
          />
          <PriceField
            label="Total Main Currency"
            fieldPath="grand_total_main_currency"
            currencies={currencies}
            canSelectCurrency={false}
            defaultCurrency={invenioConfig.APP.defaultCurrency}
          />
        </GroupField>

        <TextField label="Notes" fieldPath="notes" rows={3} />
      </>
    );
  }
}

OrderInfo.propTypes = {
  currencies: PropTypes.array.isRequired,
};
