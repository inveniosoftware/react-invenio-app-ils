import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

export const SeparatedList = ({
  items,
  itemProps,
  prefix,
  separator,
  suffix,
  ...listProps
}) => {
  return _isEmpty(items) ? null : (
    <>
      {prefix}
      <List horizontal {...listProps}>
        {items.map((item, index) => (
          <List.Item key={index} {...itemProps}>
            {item}
            {index !== items.length - 1 && separator}
          </List.Item>
        ))}
      </List>
      {suffix}
    </>
  );
};

SeparatedList.propTypes = {
  items: PropTypes.array.isRequired,
  itemProps: PropTypes.object,
  prefix: PropTypes.node,
  separator: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  suffix: PropTypes.node,
};

SeparatedList.defaultProps = {
  separator: ', ',
  itemProps: {},
  prefix: null,
  suffix: null,
};
