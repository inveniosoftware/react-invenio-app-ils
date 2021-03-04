import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class PatronDetailsLink extends Component {
  render() {
    const { patronPid, children, ...props } = this.props;
    return patronPid > 0 ? (
      <Link
        to={BackOfficeRoutes.patronDetailsFor(patronPid)}
        data-test={patronPid}
        {...props}
      >
        {children}
      </Link>
    ) : (
      <>{children}</>
    );
  }
}

PatronDetailsLink.propTypes = {
  patronPid: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PatronDetailsLink.defaultProps = {
  children: null,
};
