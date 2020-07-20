import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class SeriesDetailsLink extends Component {
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

SeriesDetailsLink.propTypes = {
  pidValue: PropTypes.string.isRequired,
  children: PropTypes.node,
};

SeriesDetailsLink.defaultProps = {
  children: null,
};
