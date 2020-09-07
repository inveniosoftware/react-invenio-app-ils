import React from 'react';
import { Component } from 'react';
import ShowMore from 'react-show-more';
import { Grid, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { MetadataTable } from '@components/backoffice/MetadataTable';

export default class ItemContent extends Component {
  render() {
    const { itemDetails } = this.props;

    let leftMetadata = [
      { name: 'Number of pages', value: itemDetails.metadata.number_of_pages },
    ];

    return (
      <>
        <Header as="h3" attached="top">
          Content
        </Header>
        <Segment attached className="bo-metadata-segment" id="metadata">
          <Grid padded columns={2}>
            <Grid.Row>
              <Grid.Column width={8}>
                <MetadataTable rows={leftMetadata} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h4">Description</Header>
                <ShowMore
                  lines={5}
                  more="Show more"
                  less="Show less"
                  anchorClass="button-show-more"
                >
                  {itemDetails.metadata.description}
                </ShowMore>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h4">Physical description</Header>
                <ShowMore
                  lines={5}
                  more="Show more"
                  less="Show less"
                  anchorClass="button-show-more"
                >
                  {itemDetails.metadata.physical_description}
                </ShowMore>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    );
  }
}

ItemContent.propTypes = {
  itemDetails: PropTypes.object.isRequired,
};
