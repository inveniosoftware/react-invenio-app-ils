import { parseParams } from '@authentication/utils';
import { EnvironmentLabel } from '@components/EnvironmentLabel';
import { Media } from '@components/Media';
import { Notifications } from '@components/Notifications';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Popup,
  Segment,
} from 'semantic-ui-react';
import { LoginWithLocalAccount } from './LoginWithLocalAccount';
import { LoginWithOauthProviders } from './LoginWithOauthProviders';

const notImplementedPopup = (
  <Popup
    content="Not implemented yet!"
    trigger={
      <Link className="disabled" to="#">
        here
      </Link>
    }
  />
);

const SignUp = () => (
  <Container className="spaced">
    <Header as="h3">Sign up now</Header>
    <p>Don't have an account? Sign up {notImplementedPopup}.</p>
  </Container>
);

const LeftCol = () => (
  <Grid.Column width={8} textAlign="center" only="tablet computer">
    <Grid textAlign="center" columns={2} className="default-margin">
      <Grid.Row>
        <Grid.Column stretched width={8} textAlign="right">
          <Header className="inline-block massive">Hello!</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign="left">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h5" className="inline-block greetings">
                Ciao!
              </Header>{' '}
              <Header as="h5" className="inline-block greetings">
                Γεια σας!
              </Header>{' '}
              <Header as="h5" className="inline-block greetings">
                Hej!
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h5" className="inline-block greetings">
                Cześć!
              </Header>{' '}
              <Header as="h5" className="inline-block greetings">
                Salut!
              </Header>{' '}
              <Header as="h5" className="inline-block greetings">
                Alo!
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    {invenioConfig.APP.ENABLE_LOCAL_ACCOUNT_LOGIN && <SignUp />}
  </Grid.Column>
);

const RightCol = ({ hasError, errorMessage, errorHeader }) => (
  <Grid.Column
    mobile={16}
    tablet={8}
    computer={8}
    largeScreen={8}
    widescreen={8}
    textAlign="center"
  >
    <Header as="h2" textAlign="center">
      <Icon name="users" size="massive" />
    </Header>
    <p>Choose your preferred method to sign in</p>
    {invenioConfig.APP.ENABLE_OAUTH_LOGIN &&
      Object.keys(invenioConfig.APP.OAUTH_PROVIDERS)
        .filter(
          (providerName) =>
            invenioConfig.APP.OAUTH_PROVIDERS[providerName].enabled
        )
        .map((providerName) => (
          <LoginWithOauthProviders
            key={providerName}
            providerName={providerName}
          />
        ))}
    {invenioConfig.APP.ENABLE_OAUTH_LOGIN &&
      invenioConfig.APP.ENABLE_LOCAL_ACCOUNT_LOGIN && (
        <Divider horizontal>Or</Divider>
      )}
    {invenioConfig.APP.ENABLE_LOCAL_ACCOUNT_LOGIN && (
      <>
        <LoginWithLocalAccount
          hasError={hasError}
          errorHeader={errorHeader}
          errorMessage={errorMessage}
        />
        <Container fluid>
          <p>Forgot your password? Recover {notImplementedPopup}.</p>
        </Container>
        <Media at="mobile">
          <Divider />
          <SignUp />
        </Media>
      </>
    )}
  </Grid.Column>
);

const LoginLayout = ({
  hasError,
  errorHeader,
  errorMessage,
  backgroundImage,
  showLogo,
  ...props
}) => {
  return (
    <Overridable
      id="Login.layout"
      backgroundImage={backgroundImage}
      showLogo={showLogo}
      {...props}
    >
      <>
        <Notifications />
        <div className="frontsite">
          <Container
            fluid
            className="auth-page blur"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : null,
            }}
          >
            <Container>
              <Container textAlign="center">
                <EnvironmentLabel pointing="below" classContext="login" />
              </Container>
              {showLogo && invenioConfig.APP.LOGO_SRC && (
                <Image src={invenioConfig.APP.LOGO_SRC} size="small" centered />
              )}
              <Segment
                className="background-transparent pb-default pt-default"
                color="orange"
              >
                <Grid
                  stretched
                  verticalAlign="middle"
                  textAlign="center"
                  centered
                  columns={2}
                  padded
                >
                  <Grid.Row>
                    <LeftCol />
                    <RightCol
                      hasError={hasError}
                      errorHeader={errorHeader}
                      errorMessage={errorMessage}
                    />
                  </Grid.Row>
                </Grid>
                <Link className="alternative" to={FrontSiteRoutes.home}>
                  <Icon name="home" />
                  Home page
                </Link>
              </Segment>
            </Container>
          </Container>
        </div>
      </>
    </Overridable>
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorHeader: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.showNotificationIfSessionExpired();
  }

  showNotificationIfSessionExpired = () => {
    const params = parseParams(window.location.search);
    const { hasError } = this.state;

    if ('sessionExpired' in params && !hasError) {
      this.setState({
        hasError: true,
        errorHeader: 'Session Error',
        errorMessage:
          'You are either not signed in or your session has expired. Please sign in again.',
      });
    }
  };

  redirectIfAlreadyLoggedIn = () => {
    const { isLoading, isAnonymous } = this.props;
    const params = parseParams(window.location.search);
    if (!isLoading && !isAnonymous) {
      if (!('sessionExpired' in params)) {
        this.setState({
          hasError: false,
          errorHeader: '',
          errorMessage: '',
        });
        goTo(params.next || FrontSiteRoutes.home);
      }
    }
  };
  render() {
    const { hasError, errorHeader, errorMessage } = this.state;
    this.redirectIfAlreadyLoggedIn();
    return (
      <LoginLayout
        hasError={hasError}
        errorHeader={errorHeader}
        errorMessage={errorMessage}
        {...this.props}
      />
    );
  }
}

Login.propTypes = {
  backgroundImage: PropTypes.string,
  showLogo: PropTypes.bool,
  /* Redux */
  isLoading: PropTypes.bool.isRequired,
  isAnonymous: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

Login.defaultProps = {
  backgroundImage: null,
  showLogo: true,
  user: {},
};

RightCol.propTypes = {
  hasError: PropTypes.bool,
  errorHeader: PropTypes.string,
  errorMessage: PropTypes.string,
};

RightCol.defaultProps = {
  hasError: false,
  errorHeader: '',
  errorMessage: '',
};

LoginLayout.propTypes = Login.propTypes;
LoginLayout.defaultProps = Login.defaultProps;

export default Overridable.component('LoginPage', Login);
