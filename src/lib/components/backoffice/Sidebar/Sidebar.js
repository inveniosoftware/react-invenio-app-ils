import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { authenticationService } from '@authentication/services/AuthenticationService';
import { EnvironmentLabel } from '@components/EnvironmentLabel';
import {
  AcquisitionRoutes,
  ProviderRoutes,
  BackOfficeRoutes,
  FrontSiteRoutes,
  ILLRoutes,
} from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Header,
  Icon,
  Label,
  List,
  Menu,
} from 'semantic-ui-react';
import AdminMenu from './AdminMenu';

class Sidebar extends Component {
  logout = async () => {
    const { logout, sendErrorNotification } = this.props;
    try {
      await logout();
    } catch (e) {
      sendErrorNotification(
        'Logout',
        'Something went wrong. Please try to logout again.'
      );
    }
  };

  removeTrailingSlashes = (path) => path.replace(/\/+$/, '');
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
    const documentsActive = activePath.includes(BackOfficeRoutes.documentsList);
    const documentRequestsActive = activePath.includes(
      BackOfficeRoutes.documentRequestsList
    );
    const ordersActive = activePath.includes(AcquisitionRoutes.ordersList);
    const providersActive = activePath.includes(ProviderRoutes.providersList);
    const patronsActive = activePath.includes(BackOfficeRoutes.patronsList);
    const seriesActive = activePath.includes(BackOfficeRoutes.seriesList);
    const statsActive = activePath.includes(BackOfficeRoutes.stats.home);
    const checkInActive = activePath.includes(BackOfficeRoutes.checkIn);
    const checkOutActive = activePath.includes(BackOfficeRoutes.checkOut);

    return (
      <Overridable id="Sidebar.layout">
        <>
          <Container textAlign="center">
            <EnvironmentLabel pointing="below" classContext="backoffice" />
          </Container>
          <Header as="h3" className="bo-menu-header">
            <Icon name="user circle" color="grey" />
            <Header.Content>
              {user.fullName}
              <Header.Subheader>
                {isAdmin ? 'Admin' : 'Librarian'}
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Overridable id="Sidebar.Menu">
            <>
              <Menu text vertical className="bo-menu bo-menu-subheader">
                <Menu.Item>
                  <Menu.Menu>
                    <Menu.Item onClick={this.logout}>Sign out</Menu.Item>
                    <Menu.Item as={Link} to={FrontSiteRoutes.home}>
                      Go to Frontsite
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
              <Divider />
              <Menu text vertical className="bo-menu">
                <Menu.Item>
                  <Menu.Header>Actions</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={Link}
                      active={checkInActive}
                      to={BackOfficeRoutes.checkIn}
                    >
                      Check-in
                      <div className="menu-item-description">Return copies</div>
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
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
                      as={Link}
                      active={overviewActive}
                      to={BackOfficeRoutes.home}
                    >
                      Overview
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
                      active={loansActive}
                      to={BackOfficeRoutes.loansList}
                    >
                      Loans
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
                      active={documentRequestsActive}
                      to={BackOfficeRoutes.documentRequestsList}
                    >
                      Requests for new literature
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
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
                      as={Link}
                      active={documentsActive}
                      to={BackOfficeRoutes.documentsList}
                    >
                      Books / Articles
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
                      active={seriesActive}
                      to={BackOfficeRoutes.seriesList}
                    >
                      Series / Monographs
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
                      active={itemsActive}
                      to={BackOfficeRoutes.itemsList}
                    >
                      Physical Copies
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
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
                      as={Link}
                      active={ordersActive}
                      to={AcquisitionRoutes.ordersList}
                    >
                      Purchase Orders
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>InterLibrary Loans</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={Link}
                      active={borrowingRequestsActive}
                      to={ILLRoutes.borrowingRequestList}
                    >
                      Borrowing Requests
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>Providers</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={Link}
                      active={providersActive}
                      to={ProviderRoutes.providersList}
                    >
                      Providers
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header>Patrons</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      as={Link}
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
                      as={Link}
                      active={statsActive}
                      to={BackOfficeRoutes.stats.home}
                    >
                      Most Loaned
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>

                <Overridable
                  activePath={activePath}
                  id="Backoffice.Sidebar.CustomMenuItem"
                />
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
  logout: PropTypes.func.isRequired,
  sendErrorNotification: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Overridable.component('Sidebar', Sidebar);
