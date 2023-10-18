import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Divider, Message } from 'semantic-ui-react';
import { invenioConfig } from '@config';
import DocumentTabs from './DocumentTabs';
import { LOCATION_OBJECT_TOTAL_AMOUNT_KEY } from '@config/common';

class DocumentItems extends Component {
  constructor(props) {
    super(props);
  }

  itemStatus = (item) => ({
    canCirculate: () =>
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.status),

    isForReference: () =>
      invenioConfig.ITEMS.referenceStatuses.includes(item.status),
  });

  get filteredLocations() {
    const {
      documentDetails: {
        metadata: {
          items: { on_shelf: onShelf },
        },
      },
    } = this.props;

    const locationEntries = Object.entries(onShelf);

    if (_isEmpty(locationEntries)) return {};

    // relevant means it only has items that have the status on shelf or for reference and arrays that are not empty

    const relevantLocations = {};

    locationEntries.forEach(([locationName, internalLocations]) => {
      const internalLocationEntries = Object.entries(internalLocations);

      const relevantInternalLocations = {};

      internalLocationEntries.forEach(([internalLocationName, items]) => {
        if (internalLocationName === LOCATION_OBJECT_TOTAL_AMOUNT_KEY) return;

        const relevantItems = items.filter(
          (item) =>
            this.itemStatus(item).canCirculate() ||
            this.itemStatus(item).isForReference()
        );

        const internalLocationHasRelevantItems = !_isEmpty(relevantItems);

        if (internalLocationHasRelevantItems) {
          relevantInternalLocations[internalLocationName] = relevantItems;
        }
      });

      const locationHasRelevantInternalLocations = !_isEmpty(
        relevantInternalLocations
      );

      if (locationHasRelevantInternalLocations) {
        relevantLocations[locationName] = relevantInternalLocations;
      }
    });

    return relevantLocations;
  }

  render() {
    const {
      documentDetails: {
        metadata: { items },
      },
      documentDetails,
    } = this.props;
    console.log('test', this.props);
    const internalLocationsComponent = (
      <DocumentTabs locationsObject={this.filteredLocations} />
    );

    const noItemsComponent = (
      <Message>
        <Message.Header>No copies</Message.Header>
        <p>
          There are no available copies in the library. Please, contact the
          library for more information.
        </p>
      </Message>
    );

    const hasCopies =
      _has(items, 'on_shelf') && !_isEmpty(this.filteredLocations);

    const componentToShow = hasCopies
      ? internalLocationsComponent
      : noItemsComponent;

    return (
      <>
        <Overridable
          id="DocumentDetails.DocumentItems.header"
          document={documentDetails}
        >
          <Divider horizontal>Where to find</Divider>
        </Overridable>
        {componentToShow}
      </>
    );
  }
}

DocumentItems.propTypes = {
  documentDetails: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentItems', DocumentItems);
