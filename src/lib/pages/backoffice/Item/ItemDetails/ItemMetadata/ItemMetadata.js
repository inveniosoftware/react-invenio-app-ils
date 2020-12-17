import { MetadataTable } from '@components/backoffice/MetadataTable';
import React from 'react';
import { Component } from 'react';
import { Grid, Header, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BackOfficeRoutes } from '@routes/urls';
import { DocumentIcon } from '@components/backoffice/icons';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';

export default class ItemMetadata extends Component {
  render() {
    const { itemDetails } = this.props;

    let leftMetadata = [
      { name: 'Barcode', value: itemDetails.metadata.barcode },
      { name: 'Medium', value: itemDetails.metadata.medium },
      {
        name: 'ISBN',
        value: (
          <List>
            {itemDetails.metadata.isbns &&
              itemDetails.metadata.isbns.map((isbn) => (
                <List.Item key={isbn.value}>
                  {isbn.value}
                  {isbn.description && ` (${isbn.description})`}
                </List.Item>
              ))}
          </List>
        ),
      },
    ];

    let rightMetadata = [
      {
        name: 'Document',
        value: (
          <span>
            <Link
              to={BackOfficeRoutes.documentDetailsFor(
                itemDetails.metadata.document_pid
              )}
            >
              <DocumentIcon />{' '}
              <LiteratureTitle
                title={itemDetails.metadata.document.title}
                edition={itemDetails.metadata.document.edition}
                publicationYear={itemDetails.metadata.document.publication_year}
                truncate
              />
            </Link>
          </span>
        ),
      },
      { name: 'Status', value: itemDetails.metadata.status },
      {
        name: 'Loan restrictions',
        value: itemDetails.metadata.circulation_restriction,
      },
    ];

    return (
      <>
        <Header as="h3" attached="top">
          Metadata
        </Header>
        <Segment attached className="bo-metadata-segment" id="metadata">
          <Grid padded columns={2}>
            <Grid.Row>
              <Grid.Column width={8}>
                <MetadataTable rows={leftMetadata} />
              </Grid.Column>
              <Grid.Column width={8}>
                <MetadataTable rows={rightMetadata} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    );
  }
}

ItemMetadata.propTypes = {
  itemDetails: PropTypes.object.isRequired,
};
