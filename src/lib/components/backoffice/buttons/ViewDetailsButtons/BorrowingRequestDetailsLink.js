import { ILLRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class BorrowingRequestDetailsLink extends Component {
  render() {
    const { brwPid, children, ...props } = this.props;
    return (
      <Link
        to={ILLRoutes.borrowingRequestDetailsFor(brwPid)}
        data-test={brwPid}
        {...props}
      >
        {children}
      </Link>
    );
  }
}

BorrowingRequestDetailsLink.propTypes = {
  brwPid: PropTypes.string.isRequired,
  children: PropTypes.node,
};

BorrowingRequestDetailsLink.defaultProps = {
  children: null,
};
