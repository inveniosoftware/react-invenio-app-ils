import { BackOfficeRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface DocumentDetailsLinkProps extends Omit<LinkProps, 'to'> {
  pidValue: string;
  children?: ReactNode;
}

export class DocumentDetailsLink extends Component<DocumentDetailsLinkProps> {
  static defaultProps = {
    children: null,
  };

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
