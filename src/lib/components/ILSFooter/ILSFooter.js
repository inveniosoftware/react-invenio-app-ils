import { getStaticPageByName } from '@config/uiConfig';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, List } from 'semantic-ui-react';

const OverridableFooter = props => {
  return (
    <Overridable id="Footer.layout" {...props}>
      <footer>
        <Container fluid className="footer-upper">
          <Container>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Header as="h4" content="More information" />
                <List>
                  <List.Item>
                    <Link to={getStaticPageByName('about').route}>About</Link>
                  </List.Item>
                  <List.Item>
                    <Link to={getStaticPageByName('contact').route}>
                      Contact
                    </Link>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" content="Invenio" />
                <p>
                  Read more about us on: <br />
                  <a
                    href="https://inveniosoftware.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://inveniosoftware.org/
                  </a>
                </p>
              </Grid.Column>
            </Grid>
          </Container>
        </Container>
        <Container fluid className="footer-lower">
          <Container>
            <Header as="h4" textAlign="center">
              <Header.Content>Integrated Library System</Header.Content>
              <Header.Subheader>Powered by INVENIO</Header.Subheader>
            </Header>
          </Container>
        </Container>
      </footer>
    </Overridable>
  );
};

class ILSFooter extends Component {
  render() {
    return <OverridableFooter {...this.props} />;
  }
}

ILSFooter.propTypes = {
  staticPages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      apiURL: PropTypes.string.isRequired,
    })
  ),
};

ILSFooter.defaultProps = {
  staticPages: [],
};

export default Overridable.component('ILSFooter', ILSFooter);
