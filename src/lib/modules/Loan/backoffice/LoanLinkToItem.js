import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { DetailsRouteByPidTypeFor } from '@routes/urls';

export default class LoanLinkToItem extends Component {
  render() {
    const { itemPid, children } = this.props;
    return (
      !_isEmpty(itemPid) && (
        <Link
          target="_blank"
          to={DetailsRouteByPidTypeFor(itemPid.type)(itemPid.value)}
        >
          {children}
        </Link>
      )
    );
  }
}

LoanLinkToItem.propTypes = {
  itemPid: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};

LoanLinkToItem.defaultProps = {
  children: null,
  itemPid: {},
};
