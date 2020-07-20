import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class ItemDetailsLink extends Component {
  render() {
    const { itemPid, children, ...props } = this.props;
    return (
      <Link
        to={BackOfficeRoutes.itemDetailsFor(itemPid)}
        data-test={itemPid}
        {...props}
      >
        {children}
      </Link>
    );
  }
}

ItemDetailsLink.propTypes = {
  itemPid: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ItemDetailsLink.defaultProps = {
  children: null,
};
