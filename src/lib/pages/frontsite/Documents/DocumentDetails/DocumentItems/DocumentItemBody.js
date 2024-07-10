import React, { Component } from 'react';
import _get from 'lodash/get';
import { PropTypes } from 'prop-types';
import { Table } from 'semantic-ui-react';
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

  render() {
    const { items, shelfLink, documentDetails } = this.props;

    return items.map((item) => (
      <Table.Row key={item.pid}>
        <Table.Cell
          data-label="Barcode"
          className="document-item-table-itemCell"
        >
          {item.barcode}
        </Table.Cell>

        <Table.Cell data-label="Shelf" className="document-item-table-itemCell">
          {shelfLink !== null
            ? shelfLink(item, documentDetails)
            : _get(item, 'shelf')}
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
  documentDetails: PropTypes.object.isRequired,
  shelfLink: PropTypes.func,
};

DocumentItemBody.defaultProps = {
  shelfLink: null,
};
