import { formatPrice } from '@api/utils';
import { CreatedBy, UpdatedBy } from '@components/backoffice/ChangedBy';
import { PatronIcon, ProviderIcon } from '@components/backoffice/icons';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes, ProviderRoutes } from '@routes/urls';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react';
import { BorrowingRequestPatronLoan } from './BorrowingRequestPatronLoan';
import { DateTime } from 'luxon';
import { toShortDateTime } from '@api/date';

class Loan extends React.Component {
  dateOrDefault = (value) => {
    return value ? value : '-';
  };

  render() {
    const { brwReqMetadata } = this.props;
    const table = [
      {
        name: 'Provider',
        value: (
          <Link
            to={ProviderRoutes.providerDetailsFor(brwReqMetadata.provider_pid)}
          >
            <ProviderIcon /> {brwReqMetadata.provider.name}
          </Link>
        ),
      },
      {
        name: 'Item type',
        value: brwReqMetadata.type,
      },
      {
        name: 'Requested on',
        value: this.dateOrDefault(brwReqMetadata.request_date),
      },
      {
        name: 'Expected delivery',
        value: this.dateOrDefault(brwReqMetadata.expected_delivery_date),
      },
      {
        name: 'Received on',
        value: this.dateOrDefault(brwReqMetadata.received_date),
      },
      {
        name: 'Due date',
        value: this.dateOrDefault(brwReqMetadata.due_date),
      },
      {
        name: `Total (${invenioConfig.APP.DEFAULT_CURRENCY})`,
        value: formatPrice(brwReqMetadata.total_main_currency) || '-',
      },
      {
        name:
          brwReqMetadata.total && brwReqMetadata.total.currency
            ? `Total (${brwReqMetadata.total.currency})`
            : 'Total',
        value: formatPrice(brwReqMetadata.total) || '-',
      },
    ];
    return (
      <Grid columns={2} relaxed>
        <Grid.Row>
          <Grid.Column>
            <Divider horizontal>InterLibrary Loan</Divider>
            <MetadataTable labelWidth={5} rows={table} />
          </Grid.Column>
          <Grid.Column>
            <Divider horizontal>Patron Loan</Divider>
            <BorrowingRequestPatronLoan brwReq={brwReqMetadata} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Loan.propTypes = {
  brwReqMetadata: PropTypes.object.isRequired,
};

class Metadata extends React.Component {
  render() {
    const { brwReq } = this.props;
    const metadata = brwReq.metadata;
    const leftTable = [
      {
        name: 'Document',
        value: (
          <Link to={BackOfficeRoutes.documentDetailsFor(metadata.document_pid)}>
            <LiteratureTitle
              title={metadata.document.title}
              edition={metadata.document.edition}
              publicationYear={metadata.document.publication_year}
            />
          </Link>
        ),
      },
      {
        name: 'Patron',
        value: (
          <Link to={BackOfficeRoutes.patronDetailsFor(metadata.patron_pid)}>
            <PatronIcon /> {metadata.patron.name}
          </Link>
        ),
      },
      { name: 'Notes', value: metadata.notes },
    ];

    const rightTable = [
      { name: 'Created by', value: <CreatedBy metadata={metadata} /> },
      {
        name: 'Created',
        value: toShortDateTime(DateTime.fromISO(brwReq.created)),
      },
      { name: 'Updated by', value: <UpdatedBy metadata={metadata} /> },
      {
        name: 'Last updated',
        value: toShortDateTime(DateTime.fromISO(brwReq.updated)),
      },
    ];

    metadata.legacy_id &&
      rightTable.push({ name: 'Legacy ID', value: metadata.legacy_id });

    return (
      <Grid columns={2}>
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

Metadata.propTypes = {
  brwReq: PropTypes.object.isRequired,
};

export class BorrowingRequestMetadata extends React.Component {
  render() {
    const { brwReq } = this.props;

    return (
      <>
        <Header as="h3" attached="top">
          Request information
        </Header>
        <Segment attached className="bo-metadata-segment" id="request-info">
          <Metadata brwReq={brwReq} />
          <Loan brwReqMetadata={brwReq.metadata} />
        </Segment>
      </>
    );
  }
}

BorrowingRequestMetadata.propTypes = {
  brwReq: PropTypes.object.isRequired,
};
