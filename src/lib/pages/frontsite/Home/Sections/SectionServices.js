import React, { Component } from 'react';
import { Button, Card, Container, Header, Icon } from 'semantic-ui-react';
import { AcquisitionOrderIcon } from '@components/backoffice/icons';

export class SectionServices extends Component {
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
              Features and services
            </Header>
            <Card.Group itemsPerRow={4} stackable>
              <Card className="info-card">
                <Card.Content>
                  <Card.Header className="advert">
                    <Icon name="book" /> Circulation
                  </Card.Header>
                  <Card.Description>
                    Browse our catalog on-line, request loan and pick it up in
                    the Library when your order is ready
                  </Card.Description>
                </Card.Content>
                <Button basic inverted>
                  Catalog
                </Button>
              </Card>
              <Card className="info-card">
                <Card.Content>
                  <Card.Header className="advert">
                    <AcquisitionOrderIcon /> Acquisition
                  </Card.Header>
                  <Card.Description>
                    If you think the library should buy literature, please let
                    us know. If you would like to buy a book we can order it for
                    you.
                  </Card.Description>
                </Card.Content>
                <Button basic inverted>
                  Request purchase
                </Button>
              </Card>
              <Card className="info-card">
                <Card.Content>
                  <Card.Header className="advert">
                    <Icon name="warehouse" /> Interlibrary loan
                  </Card.Header>
                  <Card.Description>
                    If you do not find a book, an article or other documents in
                    our catalog, we can see if an other library have it and do
                    an interlibrary loan for you.
                  </Card.Description>
                </Card.Content>
                <Button basic inverted>
                  Request ILL
                </Button>
              </Card>
              <Card className="info-card">
                <Card.Content>
                  <Card.Header className="advert">
                    <Icon name="desktop" /> Read online
                  </Card.Header>
                  <Card.Description>
                    We provide online access to some of our library resources:
                    articles, books, publications are available for you without
                    leaving your desk!
                  </Card.Description>
                </Card.Content>
                <Button basic inverted>
                  E-books catalog
                </Button>
              </Card>
            </Card.Group>
          </Container>
        </Container>
      </Container>
    );
  }
}
