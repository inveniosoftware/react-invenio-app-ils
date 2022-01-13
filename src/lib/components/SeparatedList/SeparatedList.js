import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'semantic-ui-react';

export const SeparatedList = ({
  items,
  itemProps,
  prefix,
  separator,
  suffix,
  className,
  listProps,
}) => {
  return _isEmpty(items) ? null : (
    <>
      {prefix}
      <List horizontal className={className} {...listProps}>
        {items.map((item, index) => (
          <List.Item key={item} {...itemProps}>
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
  listProps: PropTypes.object,
  prefix: PropTypes.node,
  separator: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  suffix: PropTypes.node,
  className: PropTypes.string,
};

SeparatedList.defaultProps = {
  separator: ', ',
  itemProps: {},
  listProps: {},
  prefix: null,
  suffix: null,
  className: '',
};
