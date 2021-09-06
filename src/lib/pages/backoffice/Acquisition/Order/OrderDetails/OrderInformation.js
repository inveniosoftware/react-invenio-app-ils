import { CreatedBy, UpdatedBy } from '@components/backoffice/ChangedBy';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { DateTime } from 'luxon';
import { toShortDateTime } from '@api/date';
import { OrderDocumentRequest } from './OrderDocumentRequest';

export class OrderInformation extends React.Component {
  render() {
    const { order } = this.props;
    const metadata = order.metadata;
    const leftTable = [
      { name: 'Provider', value: metadata.provider.name },
      { name: 'Ordered at', value: metadata.order_date || '-' },
      {
        name: 'Expected delivery',
        value: metadata.expected_delivery_date || '-',
      },
      { name: 'Delivered on', value: metadata.received_date || '-' },
      { name: 'Notes', value: metadata.notes || '-' },
      {
        name: 'Literature request',
        value: <OrderDocumentRequest orderId={order} />,
      },
    ];
    const rightTable = [
      { name: 'Status', value: metadata.status },
      { name: 'Created by', value: <CreatedBy metadata={metadata} /> },
      {
        name: 'Created',
        value: toShortDateTime(DateTime.fromISO(order.created)),
      },
      { name: 'Updated by', value: <UpdatedBy metadata={metadata} /> },
      {
        name: 'Last updated',
        value: toShortDateTime(DateTime.fromISO(order.updated)),
      },
    ];

    metadata.status === 'CANCELLED' &&
      rightTable.splice(1, 0, {
        name: 'Cancel reason',
        value: metadata.cancel_reason,
      });

    metadata.legacy_id &&
      rightTable.push({ name: 'Legacy ID', value: metadata.legacy_id });

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
