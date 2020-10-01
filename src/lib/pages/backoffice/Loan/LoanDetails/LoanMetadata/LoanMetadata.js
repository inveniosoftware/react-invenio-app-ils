import { toShortDateTime } from '@api/date';
import { LocationsLink } from '@components/backoffice/buttons/ViewDetailsButtons/LocationsLink';
import { PatronDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/PatronDetailsLink';
import {
  DocumentIcon,
  ItemIcon,
  PatronIcon,
} from '@components/backoffice/icons';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { invenioConfig } from '@config';
import { getDisplayVal } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import LoanLinkToItem from '@modules/Loan/backoffice/LoanLinkToItem';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Grid, Icon, Label } from 'semantic-ui-react';
import Overridable from 'react-overridable';
import { DateTime } from 'luxon';

export class LoanMetadata extends Component {
  getPickupLocation(metadata) {
    return metadata.pickup_location_pid && metadata.pickup_location ? (
      <LocationsLink locationPid={metadata.pickup_location_pid}>
        {metadata.pickup_location.name}
      </LocationsLink>
    ) : null;
  }

  getDelivery(delivery) {
    if (delivery && 'method' in delivery) {
      return (
        <>
          {invenioConfig.CIRCULATION.deliveryMethods[delivery.method]}{' '}
          <Overridable
            id="LoanMetadata.DeliveryIcon"
            deliveryMethod={delivery.method}
          />
        </>
      );
    }
    return 'NOT PROVIDED';
  }

  prepareLeftData(data) {
    return [
      {
        name: 'State',
        value: (
          <Label basic color="blue" size="tiny">
            {getDisplayVal('CIRCULATION.statuses', data.metadata.state)}
          </Label>
        ),
      },
      {
        name: 'Document',
        icon: <DocumentIcon />,
        value: (
          <LiteratureTitle
            title={data.metadata.document.title}
            edition={data.metadata.document.edition}
            publicationYear={data.metadata.document.publication_year}
          />
        ),
      },
      {
        name: 'Physical copy',
        icon: <ItemIcon />,
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
        name: 'Patron',
        icon: <PatronIcon />,
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
        value: toShortDateTime(
          DateTime.fromISO(data.metadata.transaction_date)
        ),
      },
    ];
    if (
      invenioConfig.CIRCULATION.loanRequestStates.includes(data.metadata.state)
    ) {
      rows.push(
        {
          name: 'Period of interest starts',
          value: data.metadata.request_start_date,
        },
        {
          name: 'Period of interest ends',
          value: data.metadata.request_expire_date,
        }
      );
    } else {
      rows.push(
        {
          name: 'Start date',
          value: data.metadata.start_date,
        },
        {
          name: 'End date',
          value: (
            <>
              {data.metadata.end_date}
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

export default Overridable.component('LoanMetadata', LoanMetadata);
