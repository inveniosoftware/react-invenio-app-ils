import { ILLRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface BorrowingRequestDetailsLinkProps extends Omit<LinkProps, 'to'> {
  brwPid: string;
  children?: ReactNode;
}

export class BorrowingRequestDetailsLink extends Component<BorrowingRequestDetailsLinkProps> {
  static defaultProps = {
    children: null,
  };

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
