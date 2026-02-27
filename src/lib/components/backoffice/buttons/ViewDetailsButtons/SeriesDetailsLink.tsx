import { BackOfficeRoutes } from '@routes/urls';
import React, { Component, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface SeriesDetailsLinkProps extends Omit<LinkProps, 'to'> {
  pidValue: string;
  children?: ReactNode;
}

export class SeriesDetailsLink extends Component<SeriesDetailsLinkProps> {
  static defaultProps = {
    children: null,
  };

  render() {
    const { pidValue, children, ...uiProps } = this.props;
    return (
      <Link
        to={BackOfficeRoutes.seriesDetailsFor(pidValue)}
        data-test={pidValue}
        {...uiProps}
      >
        {children}
      </Link>
    );
  }
}
