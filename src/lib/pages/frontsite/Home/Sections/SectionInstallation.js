import React, { Component } from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Message,
} from 'semantic-ui-react';

export class SectionInstallation extends Component {
  render() {
    return (
      <Container fluid className="dot-background-container">
        <Container fluid className="dot-background">
          <Container className="fs-landing-page-section">
            <Header
              as="h1"
              className="section-header highlight"
              textAlign="center"
            >
              Installation
            </Header>
            <Card.Group itemsPerRow={3} stackable className="install-cards">
              <Card color="orange" className="install-card">
                <Card.Content>
                  <Header size="medium">
                    <Label circular size="huge" color="orange">
                      1
                    </Label>{' '}
                    Install Backend
                  </Header>
                  <Card.Description>
                    <List>
                      <List.Item className="install-item">
                        Clone the project{' '}
                        <a href="https://github.com/inveniosoftware/invenio-app-ils">
                          repository
                        </a>
                        .
                      </List.Item>
                      <List.Item className="install-item">
                        First, create a virtualenv
                        <Message>$ mkvirtualenv my-site</Message>
                      </List.Item>
                      <List.Item className="install-item">
                        Bootstrap the instance <br />
                        <Message>$ ./scripts/bootstrap</Message>
                      </List.Item>
                      <List.Item className="install-item">
                        Initialize the instance <br />
                        <Message>$ ./scripts/setup</Message>
                      </List.Item>
                      <List.Item className="install-item">
                        Run the server <br />
                        <Message>$ ./scripts/server</Message>
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card color="orange" className="install-card">
                <Card.Content>
                  <Header size="medium">
                    <Label circular size="huge" color="orange">
                      2
                    </Label>{' '}
                    Install Frontend
                  </Header>
                  <Card.Description>
                    <List>
                      <List.Item className="install-item">
                        Clone the project{' '}
                        <a href="https://github.com/inveniosoftware/react-invenio-app-ils">
                          repository
                        </a>
                        .
                      </List.Item>
                      <List.Item className="install-item">
                        Install the npm dependencies <br />
                        <Message>$ npm install</Message>
                      </List.Item>
                      <List.Item className="install-item">
                        Run the UI <br />
                        <Message>$ npm start</Message>
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card color="orange" className="install-card">
                <Card.Content>
                  <Header size="medium">
                    <Label circular size="huge" color="orange">
                      3
                    </Label>{' '}
                    Visit your browser
                  </Header>
                  <Card.Description>
                    <List>
                      <List.Item className="install-item">
                        Visit{' '}
                        <a href="http://localhost:3000/">
                          http://localhost:3000
                        </a>{' '}
                        in you browser.
                      </List.Item>
                      <List.Item className="install-item">
                        <List relaxed>
                          <List.Item className="install-item">
                            Test ILS as an anonymous user.
                          </List.Item>
                          <List.Item className="install-item">
                            Test ILS as a patron by logging in with
                            <List>
                              <List.Item>
                                <List.Header>
                                  email: patron1@test.ch
                                </List.Header>
                              </List.Item>
                              <List.Item>
                                <List.Header>password: 123456</List.Header>
                              </List.Item>
                            </List>
                          </List.Item>
                          <List.Item className="install-item">
                            Test ILS as a librarian by logging in with
                            <List>
                              <List.Item>
                                <List.Header>
                                  email: librarian@test.ch
                                </List.Header>
                              </List.Item>
                              <List.Item>
                                <List.Header>password: 123456</List.Header>
                              </List.Item>
                            </List>
                          </List.Item>
                          <List.Item className="install-item">
                            Test ILS as an admin by logging in with
                            <List>
                              <List.Item>
                                <List.Header>email: admin@test.ch</List.Header>
                              </List.Item>
                              <List.Item>
                                <List.Header>password: 123456</List.Header>
                              </List.Item>
                            </List>
                          </List.Item>
                        </List>
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
            <Grid>
              <Grid.Column width={16} textAlign="center">
                <Button
                  primary
                  href="https://invenioils.docs.cern.ch/"
                  className="headline-quick-access"
                >
                  <Icon name="file alternate" />
                  Docs
                </Button>
                <Button
                  primary
                  href="https://github.com/inveniosoftware/invenio-app-ils"
                  className="headline-quick-access"
                >
                  <Icon name="github" />
                  Code
                </Button>
                <Button
                  primary
                  href="https://github.com/inveniosoftware/react-invenio-app-ils"
                  className="headline-quick-access"
                >
                  <Icon name="github" />
                  UI Code
                </Button>
              </Grid.Column>
            </Grid>
          </Container>
        </Container>
      </Container>
    );
  }
}
