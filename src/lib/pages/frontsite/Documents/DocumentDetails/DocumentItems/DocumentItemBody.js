import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Media } from '@components/Media';
import { getDisplayVal, invenioConfig } from '@config';

export default class DocumentItemBody extends Component {
  constructor(props) {
    super(props);
  }

  itemStatus = (item) => ({
    IsOnShelf: () =>
      invenioConfig.ITEMS.canCirculateStatuses.includes(item.status) &&
      !item.circulation,
  });

  statusLabel = (item) => {
    const onShelf = this.itemStatus(item).IsOnShelf();

    if (onShelf) {
      return <span className="success">On shelf</span>;
    }

    return getDisplayVal('ITEMS.statuses', item.status);
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
