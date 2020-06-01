import { RedirectToLoginButton } from '@authentication/components/RedirectToLoginButton';
import { authenticationService } from '@authentication/services/AuthenticationService';
import { uiConfig } from '@config';
import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Responsive,
} from 'semantic-ui-react';

class ILSMenu extends Component {
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

  renderRightDropDown = userMenuText => {
    const { user } = this.props;
    const dropdownEntries = (
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={FrontSiteRoutes.patronProfile}>
          Your loans
        </Dropdown.Item>
        {authenticationService.hasRoles(user, ['admin', 'librarian']) ? (
          <>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to={BackOfficeRoutes.home}>
              Backoffice
            </Dropdown.Item>
          </>
        ) : null}
        <Dropdown.Divider />
        <Dropdown.Item onClick={this.logout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    );

    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Dropdown item text={userMenuText} icon="caret down">
            {dropdownEntries}
          </Dropdown>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Dropdown item text={userMenuText} icon="bars">
            {dropdownEntries}
          </Dropdown>
        </Responsive>
      </>
    );
  };

  renderRightMenuItem = (userMenuText = '') => {
    const { isAnonymous } = this.props;
    return isAnonymous ? (
      <RedirectToLoginButton
        renderClass={Menu.Item}
        className="ils-menu-login-button"
        icon="sign in"
        content="Sign in"
      />
    ) : (
      this.renderRightDropDown(userMenuText)
    );
  };

  render() {
    const { user } = this.props;
    return (
      <Overridable id="ILSMenu.layout" {...this.props}>
        <>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Menu
              stackable
              borderless
              inverted
              fixed="top"
              className="header-menu"
            >
              <Container>
                <Menu.Item header>
                  <Link to="/">
                    <Image
                      src={uiConfig.LOGO_SRC}
                      size="tiny"
                      centered
                      alt="Logo"
                    />
                  </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    {this.renderRightMenuItem(`${user.username}`)}
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </Responsive>
          <Responsive {...Responsive.onlyMobile}>
            <Menu
              borderless
              inverted
              fixed="top"
              className="mobile-header-menu"
            >
              <Container>
                <Menu.Item header>
                  <Link to="/">
                    <Image
                      src={uiConfig.LOGO_SRC}
                      size="tiny"
                      centered
                      alt="Logo"
                    />
                  </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                  {this.renderRightMenuItem()}
                </Menu.Menu>
              </Container>
            </Menu>
          </Responsive>
        </>
      </Overridable>
    );
  }
}

ILSMenu.propTypes = {
  /* REDUX */
  user: PropTypes.object.isRequired,
  isAnonymous: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  sendErrorNotification: PropTypes.func.isRequired,
};

export default Overridable.component('ILSMenu', ILSMenu);
