import { BackOfficeRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface PatronDetailsLinkProps extends Omit<LinkProps, 'to'> {
  patronPid: string;
  children?: ReactNode;
}

export class PatronDetailsLink extends Component<PatronDetailsLinkProps> {
  static defaultProps = {
    children: null,
  };

  render() {
    const { patronPid, children, ...props } = this.props;
    return Number(patronPid) > 0 ? (
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
