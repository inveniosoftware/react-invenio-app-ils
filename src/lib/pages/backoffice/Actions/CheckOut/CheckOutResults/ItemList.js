import PropTypes from 'prop-types';
import React from 'react';
import { Item, Header, Segment } from 'semantic-ui-react';
import { ItemListEntry } from '@modules/Items/backoffice/ItemListEntry';

export const ItemList = ({ items }) => (
  <>
    <Header>Physical copies</Header>
    <Segment>
      <Item.Group divided className="bo-item-search">
        {items.map(item => (
          <ItemListEntry
            item={item}
            key={item.id}
            withPendingLoans={item.has_pending_loans}
            target="_blank"
          />
        ))}
      </Item.Group>
    </Segment>
  </>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

ItemList.defaultProps = {
  items: [],
};
