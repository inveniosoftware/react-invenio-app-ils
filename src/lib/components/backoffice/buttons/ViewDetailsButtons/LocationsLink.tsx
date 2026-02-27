import { BackOfficeRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface LocationsLinkProps extends Omit<LinkProps, 'to'> {
  locationPid: string;
  children?: ReactNode;
}

export class LocationsLink extends Component<LocationsLinkProps> {
  static defaultProps = {
    children: null,
  };

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
