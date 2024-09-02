import { Sidebar } from '@components/backoffice/Sidebar';
import { Banner } from '@components/Banner';
import { Notifications } from '@components/Notifications';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BackOfficeRoutesSwitch from './BackOfficeRoutesSwitch';
import Overridable from 'react-overridable';

export class BackOffice extends Component {
  render() {
    const { location } = this.props;
    return (
      <>
        <Overridable id="BackOffice.extras">
          <Banner />
        </Overridable>
        <div className="backoffice">
          <div className="bo-sidebar">
            <Sidebar location={location} />
          </div>
          <div className="bo-content">
            <Notifications />
            <BackOfficeRoutesSwitch />
          </div>
        </div>
      </>
    );
  }
}

BackOffice.propTypes = {
  location: PropTypes.object.isRequired,
};
