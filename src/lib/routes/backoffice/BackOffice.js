import { Notifications } from '@components/Notifications';
import { Sidebar } from '@components/backoffice/Sidebar';
import React, { Component } from 'react';
import BackOfficeRoutesSwitch from './BackOfficeRoutesSwitch';
import PropTypes from 'prop-types';

export class BackOffice extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="backoffice">
        <div className="bo-sidebar">
          <Sidebar location={location} />
        </div>
        <div className="bo-content">
          <Notifications />
          <BackOfficeRoutesSwitch />
        </div>
      </div>
    );
  }
}

BackOffice.propTypes = {
  location: PropTypes.object.isRequired,
};
