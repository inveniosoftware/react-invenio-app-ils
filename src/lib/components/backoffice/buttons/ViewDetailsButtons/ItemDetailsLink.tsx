import { BackOfficeRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ItemDetailsLinkProps extends Omit<LinkProps, 'to'> {
  itemPid: string;
  children?: ReactNode;
}

export class ItemDetailsLink extends Component<ItemDetailsLinkProps> {
  static defaultProps = {
    children: null,
  };

  render() {
    const { itemPid, children, ...props } = this.props;
    return (
      <Link
        to={BackOfficeRoutes.itemDetailsFor(itemPid)}
        data-test={itemPid}
        {...props}
      >
        {children}
      </Link>
    );
  }
}
