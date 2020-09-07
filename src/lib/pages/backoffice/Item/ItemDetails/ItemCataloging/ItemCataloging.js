import React from 'react';
import { Component } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import ShowMore from 'react-show-more';
import { formatPrice } from '@api/utils';

export default class ItemCataloging extends Component {
  render() {
    const { itemDetails } = this.props;

    let leftMetadata = [
      { name: 'Legacy ID', value: itemDetails.metadata.legacy_id },
      { name: 'Acquisition Pid', value: itemDetails.metadata.acquisition_pid },
    ];

    let rightMetadata = [
      {
        name: 'Legacy library ID',
        value: itemDetails.metadata.legacy_library_id,
      },
      {
        name:
          itemDetails.metadata.price && itemDetails.metadata.price.currency
            ? `Total (${itemDetails.metadata.price.currency})`
            : 'Total',
        value: formatPrice(itemDetails.metadata.price),
      },
    ];

    return (
      <>
        <Header as="h3" attached="top">
          Cataloging
        </Header>
        <Segment attached className="bo-metadata-segment" id="metadata">
          <Grid padded columns={2}>
            <Grid.Row>
              <Grid.Column width={8}>
                <MetadataTable rows={leftMetadata} />
                <Header as="h4">Internal notes</Header>
                <ShowMore
                  lines={5}
                  more="Show more"
                  less="Show less"
                  anchorClass="button-show-more"
                >
                  {itemDetails.metadata.internal_notes}
                </ShowMore>
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

ItemCataloging.propTypes = {
  itemDetails: PropTypes.object.isRequired,
};
