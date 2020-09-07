import { toShortDate } from '@api/date';
import { CreatedBy, UpdatedBy } from '@components/backoffice/ChangedBy';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';

export class OrderInformation extends React.Component {
  dateOrDefault = value => {
    return value ? toShortDate(value) : '-';
  };

  render() {
    const { order } = this.props;
    const leftTable = [
      { name: 'Vendor', value: order.vendor.name },
      { name: 'Ordered at', value: this.dateOrDefault(order.order_date) },
      {
        name: 'Expected delivery',
        value: this.dateOrDefault(order.expected_delivery_date),
      },
      { name: 'Delivered on', value: this.dateOrDefault(order.received_date) },
      { name: 'Notes', value: order.notes },
    ];
    const rightTable = [
      { name: 'Status', value: order.status },
      { name: 'Created by', value: <CreatedBy metadata={order} /> },
      { name: 'Updated by', value: <UpdatedBy metadata={order} /> },
    ];
    order.status === 'CANCELLED' &&
      rightTable.splice(1, 0, {
        name: 'Cancel reason',
        value: order.cancel_reason,
      });
    return (
      <Grid columns={2} id="order-info">
        <Grid.Row>
          <Grid.Column>
            <MetadataTable labelWidth={5} rows={leftTable} />
          </Grid.Column>
          <Grid.Column>
            <MetadataTable labelWidth={5} rows={rightTable} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

OrderInformation.propTypes = {
  order: PropTypes.object.isRequired,
};
