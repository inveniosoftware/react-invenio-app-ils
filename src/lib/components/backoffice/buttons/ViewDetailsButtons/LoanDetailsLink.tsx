import { BackOfficeRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface LoanDetailsLinkProps extends Omit<LinkProps, 'to'> {
  loanPid: string;
  children?: ReactNode;
}

export class LoanDetailsLink extends Component<LoanDetailsLinkProps> {
  static defaultProps = {
    children: null,
  };

  render() {
    const { loanPid, children, ...props } = this.props;
    return (
      <Link
        to={BackOfficeRoutes.loanDetailsFor(loanPid)}
        data-test={loanPid}
        {...props}
      >
        {children}
      </Link>
    );
  }
}
