import { invenioConfig } from '@config';
import { getDisplayVal } from '@config/invenioConfig';
import LoanLinkToItem from '@modules/Loan/backoffice/LoanLinkToItem';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Label } from 'semantic-ui-react';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { PatronDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/PatronDetailsLink';
import { LocationsLink } from '@components/backoffice/buttons/ViewDetailsButtons/LocationsLink';
import { ItemIcon } from '@components/backoffice/icons';
import { DocumentIcon } from '@components/backoffice/icons';
import { PatronIcon } from '@components/backoffice/icons';
import _isEmpty from 'lodash/isEmpty';
import { toShortDate, toShortDateTime } from '@api/date';
import DocumentTitle from '@modules/Document/DocumentTitle';

export default class LoanMetadata extends Component {
  getPickupLocation(metadata) {
    return metadata.pickup_location_pid && metadata.pickup_location ? (
      <LocationsLink locationPid={metadata.pickup_location_pid}>
        {metadata.pickup_location.name}
      </LocationsLink>
    ) : null;
  }

  getDelivery(delivery) {
    if (delivery && 'method' in delivery) {
      return invenioConfig.circulation.deliveryMethods[delivery.method];
    }
    return 'NOT PROVIDED';
  }

  prepareLeftData(data) {
    return [
      {
        name: 'State',
        value: (
          <Label basic color="blue" size="tiny">
            {getDisplayVal('circulation.statuses', data.metadata.state)}
          </Label>
        ),
      },
      {
        name: (
          <>
            <DocumentIcon />
            Document
          </>
        ),
        value: <DocumentTitle metadata={data.metadata.document} />,
      },
      {
        name: (
          <>
            <ItemIcon />
            Physical copy
          </>
        ),
        value: data.metadata.item_pid ? (
          <LoanLinkToItem itemPid={data.metadata.item_pid}>
            {data.metadata.item_pid && data.metadata.item_pid.type === 'illbid'
              ? 'ILL'
              : data.metadata.item.barcode}
          </LoanLinkToItem>
        ) : (
          '-'
        ),
      },
      {
        name: (
          <>
            <PatronIcon />
            Patron
          </>
        ),
        value: (
          <PatronDetailsLink patronPid={data.metadata.patron_pid}>
            {data.metadata.patron.name}
          </PatronDetailsLink>
        ),
      },
      {
        name: 'Pickup location',
        value: this.getPickupLocation(data.metadata),
      },
      {
        name: 'Delivery',
        value: this.getDelivery(data.metadata.delivery),
      },
    ];
  }

  prepareRightData(data) {
    const { cancel_reason: reason, state } = data.metadata;
    const rows = [
      {
        name: 'Transaction date',
        value: toShortDateTime(data.metadata.transaction_date),
      },
    ];
    if (
      invenioConfig.circulation.loanRequestStates.includes(data.metadata.state)
    ) {
      rows.push(
        {
          name: 'Period of interest starts',
          value: toShortDateTime(data.metadata.request_start_date),
        },
        {
          name: 'Period of interest ends',
          value: toShortDate(data.metadata.request_expire_date),
        }
      );
    } else {
      rows.push(
        {
          name: 'Start date',
          value: toShortDate(data.metadata.start_date),
        },
        {
          name: 'End date',
          value: (
            <>
              {toShortDate(data.metadata.end_date)}
              {data.metadata.is_overdue && <Icon name="warning" />}
            </>
          ),
        }
      );
    }
    rows.push({ name: 'Extensions', value: data.metadata.extension_count });
    if (state === 'CANCELLED' && !_isEmpty(reason)) {
      rows.push({
        name: 'Cancel Reason',
        value: reason,
      });
    }
    return rows;
  }

  render() {
    const { loanDetails } = this.props;
    const leftRows = this.prepareLeftData(loanDetails);
    const rightRows = this.prepareRightData(loanDetails);
    return (
      <Grid padded columns={2}>
        <Grid.Column>
          <MetadataTable key="left" rows={leftRows} />
        </Grid.Column>
        <Grid.Column>
          <MetadataTable key="right" rows={rightRows} />
        </Grid.Column>
      </Grid>
    );
  }
}

LoanMetadata.propTypes = {
  loanDetails: PropTypes.object.isRequired,
};
