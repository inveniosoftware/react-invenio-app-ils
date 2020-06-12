import React from 'react';
import { Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const ExtensionCount = ({ count }) =>
  count > 0 && (
    <Item.Description>
      You have extended this loan {count} time{count > 1 ? 's' : ''}
    </Item.Description>
  );

ExtensionCount.propTypes = {
  count: PropTypes.number.isRequired,
};
