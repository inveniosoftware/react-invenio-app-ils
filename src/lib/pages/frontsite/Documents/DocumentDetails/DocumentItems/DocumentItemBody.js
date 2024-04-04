import React, { Component } from 'react';
import _get from 'lodash/get';
import { PropTypes } from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Media } from '@components/Media';
import { getDisplayVal, invenioConfig } from '@config';

export default class DocumentItemBody extends Component {
  itemStatus = (item) => ({
    canCirculate: () =>
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.status),
    isOnShelf: () => !item.circulation,
  });

  statusLabel = (item) => {
    const canCirculate = this.itemStatus(item).canCirculate();
    const onShelf = this.itemStatus(item).isOnShelf();

    if (canCirculate) {
      return onShelf ? (
        <span className="success">On shelf</span>
      ) : (
        <span>On loan</span>
      );
    }

    return getDisplayVal('ITEMS.statuses', item.status);
  };

  callNumber = (items) => {
    const identifiers = _get(items, 'identifiers', []);
    if (identifiers === null) {
      return '-';
    }
    const callNumber = identifiers.find(
      (identifier) => identifier.scheme.toLowerCase() === 'call number'
    );
    return callNumber ? callNumber.value : '-';
  };

  render() {
    const { items } = this.props;

    return items.map((item) => (
      <Table.Row key={item.pid}>
        <Table.Cell
          data-label="Barcode"
          className="document-item-table-itemCell"
        >
          {item.barcode}
        </Table.Cell>

        <Media greaterThanOrEqual="tablet">
          <Table.Cell
            data-label="Shelf"
            className="document-item-table-itemCell"
          >
            {item.shelf}
          </Table.Cell>
        </Media>

        <Media lessThan="tablet">
          <Table.Cell
            data-label="Shelf"
            className="document-item-table-itemCell"
          >
            {item.shelf || 'none'}
          </Table.Cell>
        </Media>

        <Table.Cell data-label="Call Number">
          {this.callNumber(item)}
        </Table.Cell>
        <Table.Cell data-label="Status">{this.statusLabel(item)}</Table.Cell>
        <Table.Cell data-label="Medium">
          {getDisplayVal('ITEMS.mediums', item.medium)}
        </Table.Cell>
        <Table.Cell data-label="Restrictions">
          {getDisplayVal(
            'ITEMS.circulationRestrictions',
            item.circulation_restriction
          )}
        </Table.Cell>
      </Table.Row>
    ));
  }
}

DocumentItemBody.propTypes = {
  items: PropTypes.array.isRequired,
};
