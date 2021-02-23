import { MetadataTable } from '@components/backoffice/MetadataTable';
import { getDisplayVal } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShowMore from 'react-show-more';
import { Grid, Header, List, Segment } from 'semantic-ui-react';

export default class ItemMetadata extends Component {
  render() {
    const { itemDetails } = this.props;

    let leftMetadata = [
      {
        name: 'Document',
        value: (
          <span>
            <Link
              to={BackOfficeRoutes.documentDetailsFor(
                itemDetails.metadata.document_pid
              )}
            >
              <LiteratureTitle
                title={itemDetails.metadata.document.title}
                edition={itemDetails.metadata.document.edition}
                publicationYear={itemDetails.metadata.document.publication_year}
              />
            </Link>
          </span>
        ),
      },
      { name: 'Barcode', value: itemDetails.metadata.barcode },
      {
        name: 'Medium',
        value: getDisplayVal('ITEMS.mediums', itemDetails.metadata.medium),
      },
      {
        name: 'Number of pages',
        value: itemDetails.metadata.number_of_pages || '-',
      },
      {
        name: 'ISBN',
        value: (
          <List>
            {itemDetails.metadata.isbns
              ? itemDetails.metadata.isbns.map((isbn) => (
                  <List.Item key={isbn.value}>
                    {isbn.value}
                    {isbn.description && ` (${isbn.description})`}
                  </List.Item>
                ))
              : '-'}
          </List>
        ),
      },
    ];

    let rightMetadata = [
      {
        name: 'Status',
        value: getDisplayVal('ITEMS.statuses', itemDetails.metadata.status),
      },
      {
        name: 'Loan restrictions',
        value: getDisplayVal(
          'ITEMS.circulationRestrictions',
          itemDetails.metadata.circulation_restriction
        ),
      },
      {
        name: 'Description',
        value: (
          <ShowMore
            lines={5}
            more="Show more"
            less="Show less"
            anchorClass="button-show-more"
          >
            {itemDetails.metadata.description || '-'}
          </ShowMore>
        ),
      },
      {
        name: 'Internal notes',
        value: (
          <ShowMore
            lines={5}
            more="Show more"
            less="Show less"
            anchorClass="button-show-more"
          >
            {itemDetails.metadata.internal_notes || '-'}
          </ShowMore>
        ),
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
