import { NotFound } from "../lib/components/ui";
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { FrontSite } from "../lib/routes/";
import history from "../lib/history";
import PropTypes from "prop-types";
import { OverridableContext } from "react-overridable";

const CustomHome = ({ ...props }) => {
  return <>And this is custom home</>;
};

const map = {
  // "Home.render": CustomHome
};

export default class App extends Component {
  render() {
    return (
      <OverridableContext.Provider value={map}>
        <Router history={history}>
          <Switch>
            <FrontSite {...this.props} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </OverridableContext.Provider>
    );
  }
}

App.propTypes = {
  headline: PropTypes.func,
  headlineImage: PropTypes.string,
  sections: PropTypes.array
};
