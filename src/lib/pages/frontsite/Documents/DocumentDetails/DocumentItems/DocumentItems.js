import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import Overridable from 'react-overridable';
import {
  Accordion,
  Checkbox,
  Divider,
  Grid,
  Header,
  Label,
  List,
  Menu,
  Segment,
  Message,
} from 'semantic-ui-react';
import { default as DocumentItem } from './DocumentItem';

class DocumentItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLibrary: null,
      activeInternalLocation: null,
    };

    if (props.documentDetails.metadata.items) {
      const onShelf = props.documentDetails.metadata.items.on_shelf;
      if (!_isEmpty(onShelf)) {
        this.state.activeLibrary = Object.keys(onShelf)[0];
      }
    }
  }

  handleLocationClick = (e, titleProps) => {
    const { name } = titleProps;
    const { activeInternalLocation } = this.state;

    if (activeInternalLocation === name) {
      this.setState({ activeInternalLocation: null });
    } else {
      this.setState({ activeInternalLocation: name });
    }
  };

  handleClick = (e, titleProps) => {
    const { name } = titleProps;
    const { activeLibrary } = this.state;

    if (activeLibrary === name) {
      this.setState({ activeLibrary: null });
    } else {
      this.setState({ activeLibrary: name });
    }
  };

  renderInternalLocations = internalLocations => {
    const locations = [];
    const { activeInternalLocation } = this.state;

    if (Object.keys(internalLocations).length > 2) {
      Object.entries(internalLocations).forEach(
        ([internalLocationName, items]) => {
          if (internalLocationName !== 'total') {
            locations.push(
              <List.Item
                active={activeInternalLocation === internalLocationName}
                name={internalLocationName}
                onClick={this.handleLocationClick}
                key={internalLocationName}
              >
                {
                  <Checkbox
                    radio
                    checked={activeInternalLocation === internalLocationName}
                  />
                }{' '}
                {internalLocationName}
              </List.Item>
            );
          }
        }
      );
      return (
        <List className="document-items-location-filters">{locations}</List>
      );
    }
    return null;
  };

  renderLibraries = () => {
    const { activeLibrary } = this.state;
    const {
      documentDetails: {
        metadata: {
          items: { on_shelf: onShelf },
        },
      },
    } = this.props;
    const libraries = [];

    Object.entries(onShelf).forEach(([locationName, locationObj]) => {
      libraries.push(
        <Menu.Item key={locationName}>
          <Accordion.Title
            active={activeLibrary === locationName}
            onClick={this.handleClick}
            name={locationName}
            content={
              <>
                <Label>{onShelf[locationName]['total']}</Label>

                {locationName}
              </>
            }
          />
          {Object.keys(locationObj).length > 2 ? (
            <Accordion.Content
              active={activeLibrary === locationName}
              content={this.renderInternalLocations(locationObj)}
            />
          ) : null}
        </Menu.Item>
      );
    });

    return libraries;
  };

  renderItems = () => {
    const {
      documentDetails: {
        metadata: {
          items: { on_shelf: onShelf },
        },
      },
    } = this.props;
    const { activeLibrary, activeInternalLocation } = this.state;

    if (!_isEmpty(onShelf)) {
      let items = [];
      if (!activeLibrary) {
        return 'Click on an available location to see the physical copies';
      } else if (activeLibrary && !activeInternalLocation) {
        Object.entries(onShelf[activeLibrary]).forEach(
          ([internalLoc, locationItems]) => {
            if (internalLoc !== 'total') {
              items = items.concat(locationItems);
            }
          }
        );
      } else {
        items = items.concat(onShelf[activeLibrary][activeInternalLocation]);
      }
      return (
        <>
          <Header as="h5">
            Physical copies currently on shelf in {activeLibrary}
            {activeInternalLocation && ` (${activeInternalLocation})`}
          </Header>
          <List divided>
            {items.slice(0, 20).map(item => (
              <DocumentItem key={item.pid} item={item} />
            ))}
          </List>
        </>
      );
    }
    return null;
  };

  render() {
    const {
      documentDetails: {
        metadata: { items },
      },
    } = this.props;
    const cmpItemsLocation = (
      <Grid stackable>
        <Grid.Column computer={4} tablet={4} mobile={16}>
          <Accordion
            as={Menu}
            vertical
            fluid
            className="document-items-location-menu"
          >
            {this.renderLibraries()}
          </Accordion>
        </Grid.Column>
        <Grid.Column computer={12} tablet={12} mobile={16}>
          <Segment>{this.renderItems()}</Segment>
        </Grid.Column>
      </Grid>
    );

    const cmpNoItems = (
      <Message>
        <Message.Header>No copies</Message.Header>
        <p>
          There are no available copies in the library. Please, contact us for
          more information.
        </p>
      </Message>
    );

    const hasCopies = _has(items, 'on_shelf') && !_isEmpty(items.on_shelf);
    const cmpItems = hasCopies ? cmpItemsLocation : cmpNoItems;
    return (
      <>
        <Divider horizontal>Where to find</Divider>
        {cmpItems}
      </>
    );
  }
}

DocumentItems.propTypes = {
  documentDetails: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentItems', DocumentItems);
