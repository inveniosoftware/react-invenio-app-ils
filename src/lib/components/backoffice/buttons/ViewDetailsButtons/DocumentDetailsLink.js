import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class DocumentDetailsLink extends Component {
  render() {
    const { pidValue, children, ...props } = this.props;
    return (
      <Link
        to={BackOfficeRoutes.documentDetailsFor(pidValue)}
        data-test={pidValue}
        {...props}
      >
        {children}
      </Link>
    );
  }
}

DocumentDetailsLink.propTypes = {
  pidValue: PropTypes.string.isRequired,
  children: PropTypes.node,
};

DocumentDetailsLink.defaultProps = {
  children: null,
};
