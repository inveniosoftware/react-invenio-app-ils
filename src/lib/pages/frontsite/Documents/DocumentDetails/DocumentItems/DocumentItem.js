import { getDisplayVal, invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Grid, List } from 'semantic-ui-react';

class DocumentItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <List.Item key={item.pid}>
        <List.Icon name="barcode" size="large" verticalAlign="middle" />
        <List.Content>
          <Grid columns={3}>
            <Grid.Column width={5}>
              <List.Header>{item.barcode}</List.Header>
              <List.Description>
                <label>Shelf</label> {item.shelf} <br />
                <label>Location</label> {item.internal_location.name}
              </List.Description>
            </Grid.Column>

            <Grid.Column width={5}>
              <label>Status</label>{' '}
              {invenioConfig.ITEMS.canCirculateStatuses.includes(item.status) &&
              !item.circulation ? (
                <span className="success">On shelf</span>
              ) : invenioConfig.ITEMS.canCirculateStatuses.includes(
                  item.status
                ) && item.circulation ? (
                <span className="danger"> On loan </span>
              ) : (
                getDisplayVal('ITEMS.statuses', item.status)
              )}
            </Grid.Column>

            <Grid.Column width={6}>
              <List.Description>
                <label>Medium</label>{' '}
                {getDisplayVal('ITEMS.mediums', item.medium)}
                <br />
                <label>Restrictions</label>{' '}
                {getDisplayVal(
                  'ITEMS.circulationRestrictions',
                  item.circulation_restriction
                )}
              </List.Description>
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    );
  }
}

DocumentItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentItem', DocumentItem);
