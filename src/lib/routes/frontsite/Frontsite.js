import { ILSFooter } from '@components/ILSFooter';
import { ILSMenu } from '@components/ILSMenu';
import { NotFound } from '@components/HttpErrors';
import { Notifications } from '@components/Notifications';
import { getStaticPagesRoutes } from '@config';
import { DocumentRequestForm } from '@pages/frontsite/DocumentRequests';
import { DocumentDetails } from '@pages/frontsite/Documents';
import { Home } from '@pages/frontsite/Home';
import LiteratureSearch from '@pages/frontsite/Literature/LiteratureSearch/LiteratureSearch';
import { OpeningHours } from '@pages/frontsite/OpeningHours';
import { PatronProfile } from '@pages/frontsite/PatronProfile';
import { SeriesDetails } from '@pages/frontsite/Series';
import { StaticPage } from '@pages/frontsite/StaticPage';
import { FrontSiteRoutes } from '@routes/frontsite/frontsiteUrls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default class FrontSite extends Component {
  renderCustomStaticPages = () => {
    const { customStaticPages } = this.props;
    customStaticPages();
  };

  render() {
    const staticPagesRoutes = getStaticPagesRoutes();
    return (
      <div className="frontsite">
        <ILSMenu />
        <Notifications className="compact" />
        <Container fluid className="fs-content">
          <Switch>
            <Route
              exact
              path={FrontSiteRoutes.home}
              render={props => <Home {...props} {...this.props} />}
            />
            <Route
              exact
              path={FrontSiteRoutes.documentsList}
              component={LiteratureSearch}
            />
            <Route
              exact
              path={FrontSiteRoutes.documentDetails}
              component={DocumentDetails}
            />
            <Route
              exact
              path={FrontSiteRoutes.seriesDetails}
              component={SeriesDetails}
            />
            <Route
              exact
              path={FrontSiteRoutes.documentRequestForm}
              component={DocumentRequestForm}
            />
            <Route
              exact
              path={FrontSiteRoutes.patronProfile}
              component={PatronProfile}
            />
            <Route
              exact
              path={FrontSiteRoutes.openingHours}
              component={OpeningHours}
            />
            {staticPagesRoutes.map(route => (
              <Route key={route} exact path={route} component={StaticPage} />
            ))}
            {this.renderCustomStaticPages()}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>
        <ILSFooter />
      </div>
    );
  }
}

FrontSite.propTypes = {
  customStaticPages: PropTypes.func,
};

FrontSite.defaultProps = {
  customStaticPages: () => {},
};
