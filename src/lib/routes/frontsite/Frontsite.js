import { NotFound } from "@components/ui";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { ILSMenu, ILSFooter } from "@components/ui";
import { FrontSiteRoutes } from "./urls";
import { Home } from "@pages/frontsite";
import { Container } from "semantic-ui-react";

export default class FrontSite extends Component {
  render() {
    return (
      <div className="frontsite">
        <ILSMenu />
        <Container fluid className="fs-content">
          <Switch>
            <Route exact path={FrontSiteRoutes.home} component={Home} />
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

FrontSite.propTypes = {};
