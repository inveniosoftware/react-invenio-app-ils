import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header } from 'semantic-ui-react';
import { HomeSearchBar } from './HomeSearchBar';

const HeadlineLayout = (props) => {
  const { backgroundImageURL } = props;
  return (
    <Overridable id="Home.Headline.render">
      <Container
        fluid
        className="fs-headline-section"
        style={{
          backgroundImage: backgroundImageURL
            ? `url(${backgroundImageURL})`
            : null,
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
                    Literature catalogue, circulation, acquisition, interlibrary
                    loans.
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
                      '&sort=created&order=desc'
                    )}
                    primary
                  >
                    Recent books
                  </Button>
                  <Button
                    className="headline-quick-access"
                    as={Link}
                    to={FrontSiteRoutes.documentsListWithQuery(
                      '&sort=mostloaned&order=desc'
                    )}
                    primary
                  >
                    Most loaned books
                  </Button>
                  <Button
                    className="headline-quick-access"
                    as={Link}
                    to={FrontSiteRoutes.documentsListWithQuery(
                      '&f=doctype%3ABOOK&f=medium%3AELECTRONIC_VERSION&sort=created&order=desc'
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
    return <HeadlineLayout {...this.props} />;
  }
}

Headline.propTypes = { backgroundImageURL: PropTypes.string };
Headline.defaultProps = { backgroundImageURL: null };
HeadlineLayout.propTypes = Headline.propTypes;
HeadlineLayout.defaultProps = Headline.defaultProps;

export default Overridable.component('Home.Headline', Headline);
