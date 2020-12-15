import { RedirectToLoginButton } from '@authentication/components/RedirectToLoginButton';
import { authenticationService } from '@authentication/services/AuthenticationService';
import { EnvironmentLabel } from '@components/EnvironmentLabel';
import { Media } from '@components/Media';
import { invenioConfig } from '@config';
import { BackOfficeRoutes, FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Image, Menu, Icon } from 'semantic-ui-react';

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
        <Media greaterThanOrEqual="tablet">
          <Dropdown item text={userMenuText} icon="caret down">
            {dropdownEntries}
          </Dropdown>
        </Media>
        <Media at="mobile">
          <Dropdown item text={userMenuText} icon="bars">
            {dropdownEntries}
          </Dropdown>
        </Media>
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
          <Media greaterThanOrEqual="tablet">
            <Menu
              stackable
              borderless
              inverted
              fixed="top"
              className="header-menu"
            >
              <Container>
                <Menu.Item header>
                  <div>
                    <Overridable id="ILSMenu.Logo">
                      {invenioConfig.APP.LOGO_SRC && (
                        <Link to="/">
                          <Image
                            src={invenioConfig.APP.LOGO_SRC}
                            size="tiny"
                            centered
                            alt="Logo"
                          />
                        </Link>
                      )}
                    </Overridable>
                  </div>
                  <div>
                    <EnvironmentLabel
                      pointing="left"
                      classContext="frontsite-computer"
                    />
                  </div>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Link to={FrontSiteRoutes.documentsListWithQuery('')}>
                      Search
                    </Link>
                  </Menu.Item>
                  <Overridable id="ILSMenu.RightMenuItems" />
                  <Menu.Item>
                    {this.renderRightMenuItem(user.fullName)}
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </Media>
          <Media at="mobile">
            <Menu
              borderless
              inverted
              fixed="top"
              className="mobile-header-menu"
            >
              <Container>
                <Menu.Item header>
                  <div>
                    <Overridable id="ILSMenu.LogoMobile">
                      {invenioConfig.APP.LOGO_SRC && (
                        <Link to="/">
                          <Image
                            src={invenioConfig.APP.LOGO_SRC}
                            size="tiny"
                            centered
                            alt="Logo"
                          />
                        </Link>
                      )}
                    </Overridable>
                  </div>
                  <div>
                    <EnvironmentLabel
                      pointing="left"
                      small
                      classContext="frontsite-mobile"
                    />
                  </div>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item
                    as={Link}
                    to={FrontSiteRoutes.documentsListWithQuery('')}
                  >
                    <Icon name="search" />
                  </Menu.Item>
                  <Overridable id="ILSMenu.RightMenuItemsMobile" />
                  {this.renderRightMenuItem()}
                </Menu.Menu>
              </Container>
            </Menu>
          </Media>
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
