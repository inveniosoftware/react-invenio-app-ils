import {
  AcquisitionOrderIcon,
  ILLBorrowingRequestIcon,
} from '@components/backoffice/icons';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { AcquisitionRoutes, BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';

export class DocumentRequestMetadata extends Component {
  userInputLeftColumn() {
    const { docReq } = this.props;
    return [
      { name: 'Title', value: docReq.title },
      { name: 'Authors', value: docReq.authors || '-' },
      { name: 'Edition', value: docReq.edition || '-' },
      { name: 'Publisher', value: docReq.publisher || '-' },
      { name: 'Format', value: docReq.medium },
      { name: 'Standard Number', value: docReq.standard_number || '-' },
      { name: 'ISBN', value: docReq.isbn || '-' },
      { name: 'ISSN', value: docReq.issn || '-' },
    ];
  }

  userInputRightColumn() {
    const { docReq } = this.props;
    const rows = [
      { name: 'Volume', value: docReq.volume || '-' },
      { name: 'Journal Title', value: docReq.journal_title || '-' },
      { name: 'Pages', value: docReq.page || '-' },
      {
        name: 'Publication Year',
        value: docReq.publication_year || '-',
      },
      { name: 'Request Type', value: docReq.request_type },
      { name: 'Payment method', value: docReq.payment_method || '-' },
      { name: 'Payment info', value: docReq.payment_info || '-' },
      { name: 'User note', value: docReq.note || '-' },
    ];

    docReq.legacy_id &&
      rows.push({ name: 'Legacy ID', value: docReq.legacy_id });

    return rows;
  }

  adminLeftColumn() {
    const { docReq } = this.props;
    const patronLink = (
      <Link to={BackOfficeRoutes.patronDetailsFor(docReq.patron_pid)}>
        {docReq.patron.name}
      </Link>
    );

    const documentLink = docReq.document_pid ? (
      <Link to={BackOfficeRoutes.documentDetailsFor(docReq.document_pid)}>
        <LiteratureTitle
          title={docReq.document.title}
          edition={docReq.document.edition}
          publicationYear={docReq.document.publication_year}
        />
      </Link>
    ) : (
      '-'
    );

    const provider = docReq.physical_item_provider;
    let providerLink = '-';
    if (!_isEmpty(provider)) {
      const { physicalItemProviders } = invenioConfig.DOCUMENT_REQUESTS;
      if (provider.pid_type === physicalItemProviders.acq.pid_type) {
        providerLink = (
          <>
            <AcquisitionOrderIcon /> Acquisition order:{' '}
            <Link to={AcquisitionRoutes.orderDetailsFor(provider.pid)}>
              {provider.pid}
            </Link>
          </>
        );
      } else if (provider.pid_type === physicalItemProviders.ill.pid_type) {
        providerLink = (
          <>
            <ILLBorrowingRequestIcon /> Interlibrary loan:{' '}
            <Link to={ILLRoutes.borrowingRequestDetailsFor(provider.pid)}>
              {provider.pid}
            </Link>
          </>
        );
      }
    }

    return [
      { name: 'Patron', value: patronLink },
      {
        name: 'Document',
        value: documentLink,
      },
      { name: 'Provider', value: providerLink },
    ];
  }

  adminRightColumn() {
    const { docReq } = this.props;
    return [
      { name: 'State', value: docReq.state },
      { name: 'Decline reason', value: docReq.decline_reason || '-' },
      { name: 'Internal note', value: docReq.internal_note || '-' },
    ];
  }

  render() {
    return (
      <Segment>
        <Header as="h3" dividing>
          User submitted information
        </Header>
        <Grid padded columns={2}>
          <Grid.Row>
            <Grid.Column>
              <MetadataTable rows={this.userInputLeftColumn()} />
            </Grid.Column>
            <Grid.Column>
              <MetadataTable rows={this.userInputRightColumn()} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Header as="h3" dividing>
          Request state
        </Header>
        <Grid padded columns={2}>
          <Grid.Row>
            <Grid.Column>
              <MetadataTable rows={this.adminLeftColumn()} />
            </Grid.Column>
            <Grid.Column>
              <MetadataTable rows={this.adminRightColumn()} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

DocumentRequestMetadata.propTypes = {
  docReq: PropTypes.object.isRequired,
};
