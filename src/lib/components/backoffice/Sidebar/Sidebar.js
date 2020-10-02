import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { authenticationService } from '@authentication/services/AuthenticationService';
import {
  AcquisitionRoutes,
  BackOfficeRoutes,
  FrontSiteRoutes,
  ILLRoutes,
} from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Divider, Header, Icon, Label, List, Menu } from 'semantic-ui-react';
import AdminMenu from './AdminMenu';

class Sidebar extends Component {
  removeTrailingSlashes = path => path.replace(/\/+$/, '');
  render() {
    const { location, user } = this.props;
    const isAdmin = authenticationService.hasRoles(user, ['admin']);
    const activePath = this.removeTrailingSlashes(location.pathname);
    const overviewActive = activePath === BackOfficeRoutes.home;
    const borrowingRequestsActive = activePath.includes(
      ILLRoutes.borrowingRequestList
    );
    const itemsActive = activePath.includes(BackOfficeRoutes.itemsList);
    const eitemsActive = activePath.includes(BackOfficeRoutes.eitemsList);
    const loansActive = activePath.includes(BackOfficeRoutes.loansList);
    const locationsActive = activePath.includes(BackOfficeRoutes.locationsList);
    const librariesActive = activePath.includes(ILLRoutes.libraryList);
    const documentsActive = activePath.includes(BackOfficeRoutes.documentsList);
    const documentRequestsActive = activePath.includes(
      BackOfficeRoutes.documentRequestsList
    );
    const ordersActive = activePath.includes(AcquisitionRoutes.ordersList);
    const vendorsActive = activePath.includes(AcquisitionRoutes.vendorsList);
    const patronsActive = activePath.includes(BackOfficeRoutes.patronsList);
    const seriesActive = activePath.includes(BackOfficeRoutes.seriesList);
    const statsActive = activePath.includes(BackOfficeRoutes.stats.home);
    const checkInActive = activePath.includes(BackOfficeRoutes.checkIn);
    const checkOutActive = activePath.includes(BackOfficeRoutes.checkOut);

    return (
      <Overridable id="Sidebar.layout">
        <>
          <Header as="h3" className="bo-menu-header">
            <Icon name="user circle" color="grey" />
            <Header.Content>
              {user.fullName}
              <Header.Subheader>
                {isAdmin ? 'Admin' : 'Librarian'}
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Divider />
          <Overridable id="Sidebar.Menu">
            <>
              <Menu text vertical className="bo-menu">
                <Menu.Item>
                  <Menu.Header>Actions</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={checkInActive ? '' : Link}
                      active={checkInActive}
                      to={BackOfficeRoutes.checkIn}
                    >
                      Check-in
                      <div className="menu-item-description">Return copies</div>
                    </Menu.Item>
                    <Menu.Item
                      as={checkOutActive ? '' : Link}
                      active={checkOutActive}
                      to={BackOfficeRoutes.checkOut}
                    >
                      Check-out
                      <div className="menu-item-description">Create loan</div>
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Library</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={overviewActive ? '' : Link}
                      active={overviewActive}
                      to={BackOfficeRoutes.home}
                    >
                      Overview
                    </Menu.Item>
                    <Menu.Item
                      as={loansActive ? '' : Link}
                      active={loansActive}
                      to={BackOfficeRoutes.loansList}
                    >
                      Loans
                    </Menu.Item>
                    <Menu.Item
                      as={documentRequestsActive ? '' : Link}
                      active={documentRequestsActive}
                      to={BackOfficeRoutes.documentRequestsList}
                    >
                      Requests for new literature
                    </Menu.Item>
                    <Menu.Item
                      as={locationsActive ? '' : Link}
                      active={locationsActive}
                      to={BackOfficeRoutes.locationsList}
                    >
                      Locations
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>Catalogue</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={documentsActive ? '' : Link}
                      active={documentsActive}
                      to={BackOfficeRoutes.documentsList}
                    >
                      Books / Articles
                    </Menu.Item>
                    <Menu.Item
                      as={seriesActive ? '' : Link}
                      active={seriesActive}
                      to={BackOfficeRoutes.seriesList}
                    >
                      Series / Monographs
                    </Menu.Item>
                    <Menu.Item
                      as={itemsActive ? '' : Link}
                      active={itemsActive}
                      to={BackOfficeRoutes.itemsList}
                    >
                      Physical Copies
                    </Menu.Item>
                    <Menu.Item
                      as={eitemsActive ? '' : Link}
                      active={eitemsActive}
                      to={BackOfficeRoutes.eitemsList}
                    >
                      Electronic Items
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>Acquisition</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={ordersActive ? '' : Link}
                      active={ordersActive}
                      to={AcquisitionRoutes.ordersList}
                    >
                      Purchase Orders
                    </Menu.Item>
                    <Menu.Item
                      as={vendorsActive ? '' : Link}
                      active={vendorsActive}
                      to={AcquisitionRoutes.vendorsList}
                    >
                      Vendors
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>InterLibrary Loans</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={borrowingRequestsActive ? '' : Link}
                      active={borrowingRequestsActive}
                      to={ILLRoutes.borrowingRequestList}
                    >
                      Borrowing Requests
                    </Menu.Item>
                    <Menu.Item
                      as={librariesActive ? '' : Link}
                      active={librariesActive}
                      to={ILLRoutes.libraryList}
                    >
                      Libraries
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>Patrons</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={patronsActive ? '' : Link}
                      active={patronsActive}
                      to={BackOfficeRoutes.patronsList}
                    >
                      Patrons
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>Statistics</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={statsActive ? '' : Link}
                      active={statsActive}
                      to={BackOfficeRoutes.stats.home}
                    >
                      Most Loaned
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
              <Divider horizontal>Other</Divider>
              <Menu text vertical className="bo-menu">
                <Menu.Item as={Link} to={FrontSiteRoutes.home}>
                  Go to Home Page
                </Menu.Item>
              </Menu>
            </>
          </Overridable>
          <AuthenticationGuard
            silent
            authorizedComponent={() => <AdminMenu />}
            roles={['admin']}
            loginComponent={() => null}
          />
          <Overridable id="Sidebar.versions">
            <List divided selection>
              <List.Item>
                <Label color="blue">
                  react-ils
                  <Label.Detail>
                    {process.env.REACT_APP_UI_ILS_VERSION}
                  </Label.Detail>
                </Label>
              </List.Item>
              <List.Item>
                <Label color="blue">
                  invenio-ils
                  <Label.Detail>
                    {process.env.REACT_APP_INVENIO_VERSION}
                  </Label.Detail>
                </Label>
              </List.Item>
              {process.env.REACT_APP_OVERLAY_VERSION && (
                <List.Item>
                  <Label color="blue">
                    overlay
                    <Label.Detail>
                      {process.env.REACT_APP_OVERLAY_VERSION}
                    </Label.Detail>
                  </Label>
                </List.Item>
              )}
              <Overridable id="Sidebar.otherVersions" />
            </List>
          </Overridable>
        </>
      </Overridable>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  /* REDUX */
  user: PropTypes.object.isRequired,
};

Sidebar.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Overridable.component('Sidebar', Sidebar);
