import { documentApi } from '@api/documents';
import { libraryApi } from '@api/ill';
import { patronApi } from '@api/patrons';
import { invenioConfig } from '@config';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';
import { PriceField } from '@forms/core/PriceField';
import { SelectField } from '@forms/core/SelectField';
import { SelectorField } from '@forms/core/SelectorField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { VocabularyField } from '@forms/core/VocabularyField';
import {
  serializeDocument,
  serializeLibrary,
  serializePatron,
} from '@modules/ESSelector/serializer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export class OrderInfo extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={8}>
            <SelectorField
              required
              emptyHeader="No document selected"
              emptyDescription="Please select a document."
              fieldPath="document"
              errorPath="document_pid"
              label="Document"
              placeholder="Search for a document..."
              query={documentApi.list}
              serializer={serializeDocument}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <SelectorField
              required
              emptyHeader="No patron selected"
              emptyDescription="Please select a patron."
              fieldPath="patron"
              errorPath="patron_pid"
              label="Patron"
              placeholder="Search for a patron..."
              query={patronApi.list}
              serializer={serializePatron}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <SelectorField
              required
              emptyHeader="No library selected"
              emptyDescription="Please select a library."
              fieldPath="library"
              errorPath="library_pid"
              label="Library"
              placeholder="Search for a library..."
              query={libraryApi.list}
              serializer={serializeLibrary}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <VocabularyField
              type={
                invenioConfig.VOCABULARIES.illBorrowingRequests.ill_item_type
              }
              fieldPath="type"
              label="Item type"
              placeholder="Select item type..."
              required
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <SelectField
              required
              search
              label="Status"
              fieldPath="status"
              options={invenioConfig.ILL_BORROWING_REQUESTS.statuses}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <StringField label="Cancel Reason" fieldPath="cancel_reason" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <DateInputField
              label="Request date"
              fieldPath="request_date"
              optimized
            />
          </Grid.Column>

          <Grid.Column>
            <DateInputField
              label="Expected Delivery Date"
              fieldPath="expected_delivery_date"
              optimized
            />
          </Grid.Column>
          <Grid.Column>
            <DateInputField
              label="Received Date"
              fieldPath="received_date"
              optimized
            />
          </Grid.Column>
          <Grid.Column>
            <DateInputField label="Due Date" fieldPath="due_date" optimized />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <PriceField
              label="Total"
              fieldPath="total"
              currencies={currencies}
              defaultCurrency={invenioConfig.APP.defaultCurrency}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <PriceField
              label="Total Main Currency"
              fieldPath="total_main_currency"
              currencies={currencies}
              canSelectCurrency={false}
              defaultCurrency={invenioConfig.APP.defaultCurrency}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TextField label="Notes" fieldPath="notes" rows={3} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

OrderInfo.propTypes = {
  currencies: PropTypes.array.isRequired,
};
