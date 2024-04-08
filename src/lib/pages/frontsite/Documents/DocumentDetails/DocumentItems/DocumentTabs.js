import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Tab, Menu, Label } from 'semantic-ui-react';
import { LOCATION_OBJECT_TOTAL_AMOUNT_KEY } from '@config/common';

import DocumentItem from './DocumentItem';

export default class DocumentTabs extends Component {
  constructor(props) {
    super(props);

    const [firstLocationName] = this.locationEntries[0];
    const [firstInternalLocationName] =
      this.firstInternalLocationEntry(firstLocationName);

    this.state = {
      activeInternalLocation: firstInternalLocationName,
    };
  }

  get locations() {
    const { locationsObject } = this.props;

    return locationsObject;
  }

  get locationEntries() {
    return Object.entries(this.locations);
  }

  sortedLocationEntries = (locationEntries) => {
    const entries = [...locationEntries];

    return entries.sort(
      ([, locations1], [, locations2]) => locations2.length - locations1.length
    );
  };

  firstInternalLocationEntry = (locationName) => {
    const location = this.locationEntries.find(
      ([name]) => name === locationName
    );

    if (!location) return;

    const [, locationObject] = location;

    const locationEntries = Object.entries(locationObject);

    return this.sortedLocationEntries(locationEntries)[0];
  };

  handleLocationClick = (e, titleProps) => {
    const { name } = titleProps;
    const { activeInternalLocation } = this.state;

    const valueToSet = activeInternalLocation === name ? null : name;

    this.setState({ activeInternalLocation: valueToSet });
  };

  onTabChangeHandler = (e, data) => {
    const newTabLocationName = data.panes[data.activeIndex].menuItem;
    const [firstInternalLocationName] =
      this.firstInternalLocationEntry(newTabLocationName);

    this.setState({ activeInternalLocation: firstInternalLocationName });
  };

  createInternalLocationsMenu = (internalLocations) => {
    const { activeInternalLocation } = this.state;
    const sortedInternalLocationsEntries = this.sortedLocationEntries(
      Object.entries(internalLocations)
    );

    const locations = sortedInternalLocationsEntries.map(
      ([internalLocationName, items]) => {
        if (internalLocationName === LOCATION_OBJECT_TOTAL_AMOUNT_KEY) return;

        const menuItemIsActive =
          activeInternalLocation === internalLocationName;

        return (
          <Menu.Item
            icon
            active={menuItemIsActive}
            name={internalLocationName}
            onClick={this.handleLocationClick}
            key={internalLocationName}
          >
            <span>{internalLocationName}</span>
            <Label
              pointing={menuItemIsActive ? 'right' : null}
              active={menuItemIsActive}
              color={
                menuItemIsActive || !activeInternalLocation ? 'orange' : null
              }
            >
              {items.length}
            </Label>
          </Menu.Item>
        );
      }
    );

    return (
      <div className="center internal-location-menu-wrapper">
        <Menu vertical compact fluid>
          {locations}
        </Menu>
      </div>
    );
  };

  createInternalLocationTables = (locationsObject) => {
    const { activeInternalLocation } = this.state;
    const sortedInternalLocationEntries = this.sortedLocationEntries(
      Object.entries(locationsObject)
    );

    if (activeInternalLocation) {
      const locationObject = sortedInternalLocationEntries.find(
        ([internalLocationName]) =>
          internalLocationName === activeInternalLocation
      );

      if (!locationObject) return;

      const [internalLocationName, items] = locationObject;

      return (
        <DocumentItem
          internalLocationName={internalLocationName}
          items={items}
          showTitle={activeInternalLocation !== internalLocationName}
        />
      );
    }

    return sortedInternalLocationEntries.map(
      ([internalLocationName, items]) => {
        if (internalLocationName === LOCATION_OBJECT_TOTAL_AMOUNT_KEY) return;

        return (
          <DocumentItem
            key={internalLocationName}
            internalLocationName={internalLocationName}
            items={items}
            showTitle={activeInternalLocation !== internalLocationName}
          />
        );
      }
    );
  };

  createPanes = () => {
    return this.locationEntries.map(([locationName, locationsObject]) => ({
      menuItem: locationName,
      render: () => (
        <Tab.Pane>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={4} floated="left">
                {this.createInternalLocationsMenu(locationsObject)}
              </Grid.Column>
              <Grid.Column width={12} floated="right">
                {this.createInternalLocationTables(locationsObject)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      ),
    }));
  };

  render() {
    return (
      <Tab
        onTabChange={this.onTabChangeHandler}
        menu={{
          secondary: true,
          pointing: true,
          className: 'document-items-tab-menu',
        }}
        panes={this.createPanes()}
      />
    );
  }
}

DocumentTabs.propTypes = {
  locationsObject: PropTypes.object.isRequired,
};
