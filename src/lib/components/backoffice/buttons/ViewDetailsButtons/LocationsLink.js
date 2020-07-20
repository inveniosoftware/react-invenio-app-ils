import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class LocationsLink extends Component {
  render() {
    const { locationPid, children, ...props } = this.props;
    return (
      <Link
        to={BackOfficeRoutes.locationsList}
        data-test={locationPid}
        {...props}
      >
        {children}
      </Link>
    );
  }
}

LocationsLink.propTypes = {
  locationPid: PropTypes.string.isRequired,
  children: PropTypes.node,
};

LocationsLink.defaultProps = {
  children: null,
};
