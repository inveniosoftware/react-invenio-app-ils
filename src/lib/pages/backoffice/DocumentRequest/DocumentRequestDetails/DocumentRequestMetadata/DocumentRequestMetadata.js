import { MetadataTable } from '@components/backoffice/MetadataTable';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Grid, Header } from 'semantic-ui-react';

export default class DocumentRequestMetadata extends Component {
  userInputLeftColumn() {
    const { data } = this.props;
    return [
      { name: 'Title', value: data.metadata.title },
      { name: 'Authors', value: data.metadata.authors },
      { name: 'Edition', value: data.metadata.edition },
      { name: 'Publication Year', value: data.metadata.publication_year },
      { name: 'Medium', value: data.metadata.medium },
      { name: 'Standard Number', value: data.metadata.standard_number },
      { name: 'ISBN', value: data.metadata.isbn },
      { name: 'ISSN', value: data.metadata.issn },
    ];
  }

  userInputRightColumn() {
    const { data } = this.props;
    return [
      { name: 'Volume', value: data.metadata.volume },
      { name: 'Journal Title', value: data.metadata.journal_title },
      { name: 'Page', value: data.metadata.page },
      { name: 'Request Type', value: data.metadata.request_type },
      { name: 'Payment method', value: data.metadata.payment_method },
      { name: 'Payment info', value: data.metadata.payment_info },
      { name: 'User note', value: data.metadata.note },
    ];
  }

  adminLeftColumn() {
    const { data } = this.props;
    const patronLink = (
      <Link to={BackOfficeRoutes.patronDetailsFor(data.metadata.patron_pid)}>
        {data.metadata.patron.name}
      </Link>
    );
    return [
      { name: 'Patron', value: patronLink },
      { name: 'State', value: data.metadata.state },
    ];
  }

  adminRightColumn() {
    const { data } = this.props;
    return [
      { name: 'Decline reason', value: data.metadata.decline_reason },
      { name: 'Internal note', value: data.metadata.internal_note },
    ];
  }

  render() {
    return (
      <Grid padded columns={2}>
        <Header>User submitted information</Header>
        <Grid.Row>
          <Grid.Column>
            <MetadataTable rows={this.userInputLeftColumn()} />
          </Grid.Column>
          <Grid.Column>
            <MetadataTable rows={this.userInputRightColumn()} />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column>
            <MetadataTable rows={this.adminLeftColumn()} />
          </Grid.Column>
          <Grid.Column>
            <MetadataTable rows={this.adminRightColumn()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

DocumentRequestMetadata.propTypes = {
  data: PropTypes.object.isRequired,
};
