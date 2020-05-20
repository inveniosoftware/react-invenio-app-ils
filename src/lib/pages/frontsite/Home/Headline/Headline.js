import React, { Component } from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { Button, Container, Divider, Grid, Header } from "semantic-ui-react";
import { strictProps } from "@helpers/propTypes";
import { HomeSearchBar } from "./HomeSearchBar";
import { FrontSiteRoutes } from "@routes/urls";
import { Link } from "react-router-dom";

const OverridableHeadline = props => {
  return (
    <Overridable id="Home.Headline.render">
      <Container
        fluid
        className="fs-headline-section"
        style={{
          backgroundImage: props.headlineImage
            ? `url(${props.headlineImage})`
            : null
        }}
      >
        <Container fluid className="fs-headline">
          <Overridable id="Home.Headline.slogan">
            <Container className="container-header">
              <Grid>
                <Grid.Column width={16} textAlign="left">
                  <Header as="h1" className="fs-headline-header" size="huge">
                    Integrated Library System
                  </Header>
                  <Header.Subheader className="fs-headline-subheader">
                    Find books fast and easily.
                  </Header.Subheader>
                </Grid.Column>
              </Grid>
            </Container>
          </Overridable>

          <Overridable id="Home.Headline.Content">
            <Container className="container-search">
              <HomeSearchBar />
            </Container>
          </Overridable>

          <Overridable id="Home.Headline.extra">
            <Container className="container-extra">
              <Divider />
              <Grid>
                <Grid.Column width={16} textAlign="center">
                  <Button
                    className="headline-quick-access"
                    as={Link}
                    to={FrontSiteRoutes.documentsListWithQuery(
                      "&sort=mostrecent&order=desc"
                    )}
                    primary
                  >
                    Recent books
                  </Button>
                  <Button
                    className="headline-quick-access"
                    as={Link}
                    to={FrontSiteRoutes.documentsListWithQuery(
                      "&sort=mostloaned&order=desc"
                    )}
                    primary
                  >
                    Most loaned books
                  </Button>
                  <Button
                    className="headline-quick-access"
                    as={Link}
                    to={FrontSiteRoutes.documentsListWithQuery(
                      "&f=doctype%3ABOOK&f=medium%3AELECTRONIC_VERSION&sort=mostrecent&order=desc"
                    )}
                    primary
                  >
                    New e-books
                  </Button>
                </Grid.Column>
              </Grid>
            </Container>
          </Overridable>
        </Container>
      </Container>
    </Overridable>
  );
};

class Headline extends Component {
  render() {
    return <OverridableHeadline {...this.props} />;
  }
}

Headline.propTypes = strictProps({ headlineImage: PropTypes.string });

export default Overridable.component("Home.Headline", Headline);
