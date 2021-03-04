import { DocumentRequestIcon } from '@components/backoffice/icons';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Item, List } from 'semantic-ui-react';

export class DocumentRequestListEntry extends Component {
  render() {
    const { record: documentRequest } = this.props;
    const patronPid = documentRequest.metadata.patron_pid;
    const patronName = documentRequest.metadata.patron.name;
    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={BackOfficeRoutes.documentRequestDetailsFor(
              documentRequest.metadata.pid
            )}
            data-test={`navigate-${documentRequest.metadata.pid}`}
          >
            <DocumentRequestIcon /> Literature request #
            {documentRequest.metadata.pid}
          </Item.Header>
          <Grid columns={3}>
            <Grid.Column computer={7} largeScreen={7}>
              <label>Patron</label>{' '}
              {patronPid > 0 ? (
                <Link to={BackOfficeRoutes.patronDetailsFor(patronPid)}>
                  {patronName}
                </Link>
              ) : (
                patronName
              )}{' '}
              requested:
              <Item.Meta className="document-authors">
                <Header className="list-entry-title" as="h5">
                  {documentRequest.metadata.title}
                </Header>
                by <label>{documentRequest.metadata.authors}</label>
              </Item.Meta>
              {documentRequest.metadata.issn && (
                <>
                  <label>ISSN</label> {documentRequest.metadata.issn}
                </>
              )}
              {documentRequest.metadata.isbn && (
                <>
                  <label>ISBN</label> {documentRequest.metadata.issn}
                </>
              )}
            </Grid.Column>
            <Grid.Column computer={5} largeScreen={5}>
              <List>
                <List.Item>
                  <List.Content>
                    <label>State</label> {documentRequest.metadata.state}
                  </List.Content>
                </List.Item>
                {documentRequest.metadata.decline_reason && (
                  <List.Item>
                    <List.Content>
                      <label>Decline reason </label>
                      {documentRequest.metadata.decline_reason}
                    </List.Content>
                  </List.Item>
                )}
                {documentRequest.metadata.document_pid && (
                  <List.Item>
                    <List.Content>
                      <label>Selected document</label>
                      <Link
                        to={BackOfficeRoutes.documentDetailsFor(
                          documentRequest.metadata.document_pid
                        )}
                      >
                        <LiteratureTitle
                          title={documentRequest.metadata.document.title}
                          edition={documentRequest.metadata.document.edition}
                          publicationYear={
                            documentRequest.metadata.document.publication_year
                          }
                        />
                      </Link>
                    </List.Content>
                  </List.Item>
                )}
              </List>
            </Grid.Column>
            <Grid.Column computer={4} largeScreen={4}>
              {documentRequest.metadata.publication_year && (
                <>
                  <label>published</label>{' '}
                  {documentRequest.metadata.publication_year}
                </>
              )}
              <br />
              {documentRequest.metadata.volume && (
                <>
                  <label>volume</label> {documentRequest.metadata.volume}
                </>
              )}
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{documentRequest.metadata.pid}</div>
      </Item>
    );
  }
}

DocumentRequestListEntry.propTypes = {
  record: PropTypes.object.isRequired,
};
