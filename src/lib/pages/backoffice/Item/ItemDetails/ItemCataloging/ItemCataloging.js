import { formatPrice } from '@api/utils';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { AcquisitionRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';

export default class ItemCataloging extends Component {
  render() {
    const { itemDetails } = this.props;

    let leftMetadata = [
      {
        name: 'Acquisition Pid',
        value: itemDetails.metadata.acquisition_pid ? (
          <Link
            to={AcquisitionRoutes.orderDetailsFor(
              itemDetails.metadata.acquisition_pid
            )}
          >
            {itemDetails.metadata.acquisition_pid}
          </Link>
        ) : (
          '-'
        ),
      },
    ];

    let rightMetadata = [
      {
        name:
          itemDetails.metadata.price && itemDetails.metadata.price.currency
            ? `Total (${itemDetails.metadata.price.currency})`
            : 'Total',
        value: formatPrice(itemDetails.metadata.price) || '-',
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
