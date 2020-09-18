import { documentApi } from '@api/documents';
import { patronApi } from '@api/patrons';
import { invenioConfig } from '@config';
import { DeleteActionButton } from '@forms/components/DeleteActionButton';
import { ArrayField } from '@forms/core/ArrayField';
import { BooleanField } from '@forms/core/BooleanField';
import { GroupField } from '@forms/core/GroupField';
import { PriceField } from '@forms/core/PriceField';
import { SelectorField } from '@forms/core/SelectorField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { VocabularyField } from '@forms/core/VocabularyField';
import {
  serializeDocument,
  serializePatron,
} from '@modules/ESSelector/serializer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment, Divider, Grid } from 'semantic-ui-react';
import { DocumentIcon, PatronIcon } from '@components/backoffice/icons';

export class OrderLines extends Component {
  renderArrayItem = ({ arrayPath, indexPath, ...arrayHelpers }) => {
    const { currencies } = this.props;
    return (
      <GroupField
        grouped
        widths="equal"
        action={
          indexPath === 0 ? null : (
            <DeleteActionButton
              size="large"
              onClick={() => arrayHelpers.remove(indexPath)}
            />
          )
        }
      >
        <Grid columns="equal">
          <Grid.Column>
            <SelectorField
              required
              emptyHeader="No document selected"
              emptyDescription="Please select a document."
              fieldPath={`${arrayPath}.${indexPath}.document`}
              errorPath={`${arrayPath}.${indexPath}.document_pid`}
              label="Document"
              placeholder="Search for a document..."
              icon={<DocumentIcon />}
              query={documentApi.list}
              serializer={serializeDocument}
            />
          </Grid.Column>
          <Grid.Column>
            <VocabularyField
              type={invenioConfig.VOCABULARIES.acqOrders.acq_medium}
              fieldPath={`${arrayPath}.${indexPath}.medium`}
              label="Medium"
              placeholder="Select medium..."
              required
            />
          </Grid.Column>
          <Grid.Column>
            <StringField
              label="Copies Ordered"
              type="number"
              fieldPath={`${arrayPath}.${indexPath}.copies_ordered`}
              required
            />
          </Grid.Column>
          <Grid.Column>
            <StringField
              label="Copies Received"
              type="number"
              fieldPath={`${arrayPath}.${indexPath}.copies_received`}
            />
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <PriceField
              label="Order Line Unit Price"
              fieldPath={`${arrayPath}.${indexPath}.unit_price`}
              currencies={currencies}
              defaultCurrency={invenioConfig.APP.defaultCurrency}
            />
          </Grid.Column>
          <Grid.Column>
            <PriceField
              label="Order Line Total Price"
              fieldPath={`${arrayPath}.${indexPath}.total_price`}
              currencies={currencies}
              defaultCurrency={invenioConfig.APP.defaultCurrency}
            />
          </Grid.Column>
          <Grid.Column>
            <StringField
              label="ID for inter-departmental transaction"
              fieldPath={`${arrayPath}.${indexPath}.inter_departmental_transaction_id`}
            />
          </Grid.Column>
        </Grid>

        <GroupField widths="equal">
          <BooleanField
            rightLabel="Donation"
            fieldPath={`${arrayPath}.${indexPath}.is_donation`}
            toggle
          />
          <BooleanField
            rightLabel="Patron Suggestion"
            fieldPath={`${arrayPath}.${indexPath}.is_patron_suggestion`}
            toggle
          />
          <SelectorField
            emptyHeader="No patron selected"
            emptyDescription="Please select a patron."
            fieldPath={`${arrayPath}.${indexPath}.patron`}
            errorPath={`${arrayPath}.${indexPath}.patron_pid`}
            label="Patron"
            placeholder="Search for a patron..."
            icon={<PatronIcon />}
            query={patronApi.list}
            serializer={serializePatron}
            width={10}
          />
        </GroupField>

        <Grid columns="equal">
          <Grid.Column>
            <VocabularyField
              type={invenioConfig.VOCABULARIES.acqOrders.acq_recipient}
              fieldPath={`${arrayPath}.${indexPath}.recipient`}
              label="Recipient"
              placeholder="Select recipient..."
              required
            />
          </Grid.Column>
          <Grid.Column>
            <VocabularyField
              type={
                invenioConfig.VOCABULARIES.acqOrders.acq_order_line_payment_mode
              }
              fieldPath={`${arrayPath}.${indexPath}.payment_mode`}
              label="Payment mode"
              placeholder="Select payment mode..."
            />
          </Grid.Column>
          <Grid.Column>
            <VocabularyField
              type={
                invenioConfig.VOCABULARIES.acqOrders
                  .acq_order_line_purchase_type
              }
              fieldPath={`${arrayPath}.${indexPath}.purchase_type`}
              label="Purchase Type"
              placeholder="Select purchase type..."
            />
          </Grid.Column>
          <Grid.Column>
            <StringField
              label="Budget code"
              fieldPath={`${arrayPath}.${indexPath}.budget_code`}
            />
          </Grid.Column>
        </Grid>

        <TextField
          label="Notes"
          fieldPath={`${arrayPath}.${indexPath}.notes`}
          rows={3}
        />
        <Divider section />
      </GroupField>
    );
  };

  render() {
    const { isCreate } = this.props;
    return (
      <Segment attached>
        <ArrayField
          fieldPath="order_lines"
          defaultNewValue={{
            unit_price: { currency: invenioConfig.APP.defaultCurrency },
            total_price: { currency: invenioConfig.APP.defaultCurrency },
          }}
          renderArrayItem={this.renderArrayItem}
          addButtonLabel="Add new order line"
          startWithItem={isCreate}
        />
      </Segment>
    );
  }
}

OrderLines.propTypes = {
  currencies: PropTypes.array.isRequired,
  isCreate: PropTypes.bool,
};

OrderLines.defaultProps = {
  isCreate: false,
};
