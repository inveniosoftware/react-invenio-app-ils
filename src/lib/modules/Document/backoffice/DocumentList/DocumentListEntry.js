import DocumentAuthors from '@modules/Document/DocumentAuthors';
import DocumentLanguages from '@modules/Document/DocumentLanguages';
import DocumentTags from '@modules/Document/DocumentTags';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureEdition from '@modules/Literature/LiteratureEdition';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon, Item, List } from 'semantic-ui-react';
import DocumentCirculation from './DocumentCirculation';

export default class DocumentListEntry extends Component {
  renderMiddleColumn = document => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(document);
    }
    return <DocumentCirculation document={document} />;
  };

  renderRightColumn = document => {
    const { renderRightColumn } = this.props;
    if (renderRightColumn) {
      return renderRightColumn(document);
    }
    return this.renderRelations();
  };

  renderRelations = () => {
    const { document } = this.props;
    // create queryString to find all MM or Series related to this document
    const partOfMMQuery = _get(
      document,
      'metadata.relations.multipart_monograph',
      []
    )
      .map(rel => `pid:${rel.pid_value}`)
      .join(' OR ');
    const partOfSeriesQuery = _get(document, 'metadata.relations.serial', [])
      .map(rel => `pid:${rel.pid_value}`)
      .join(' OR ');

    return (
      <Item.Description>
        <List verticalAlign="middle" className="document-relations">
          {partOfMMQuery && (
            <List.Item>
              <List.Content floated="right">
                <Link to={BackOfficeRoutes.seriesListWithQuery(partOfMMQuery)}>
                  <Icon name="paperclip" />
                </Link>
              </List.Content>
              <List.Content>Part of multipart monograph</List.Content>
            </List.Item>
          )}
          {partOfSeriesQuery && (
            <List.Item>
              <List.Content floated="right">
                <Link
                  to={BackOfficeRoutes.seriesListWithQuery(partOfSeriesQuery)}
                >
                  <Icon name="search plus" />
                </Link>
              </List.Content>
              <List.Content>Part of serials</List.Content>
            </List.Item>
          )}
          {document.metadata.eitems.total > 0 ? (
            <List.Item>
              <List.Content floated="right">
                <Icon name="desktop" />
              </List.Content>
              <List.Content>Has electronic items</List.Content>
            </List.Item>
          ) : null}
        </List>
      </Item.Description>
    );
  };

  render() {
    const { document } = this.props;
    return (
      <Item>
        <div className="item-image-wrapper">
          <LiteratureCover
            asItem
            isRestricted={_get(document, 'metadata.restricted', false)}
            linkTo={BackOfficeRoutes.documentDetailsFor(document.metadata.pid)}
            size="tiny"
            url={_get(document, 'metadata.cover_metadata.urls.medium')}
          />
          <Header disabled as="h6" className="document-type tiny ellipsis">
            {document.metadata.document_type}
          </Header>
        </div>
        <Item.Content>
          <Item.Header
            as={Link}
            to={BackOfficeRoutes.documentDetailsFor(document.metadata.pid)}
            data-test={`navigate-${document.metadata.pid}`}
          >
            {document.metadata.title}
          </Item.Header>
          <Grid columns={3}>
            <Grid.Column computer={6} largeScreen={5}>
              <Item.Meta className="document-authors">
                <DocumentAuthors
                  authors={document.metadata.authors}
                  hasOtherAuthors={document.metadata.other_authors}
                  prefix="by "
                  limit={10}
                />
              </Item.Meta>
              <DocumentLanguages
                metadata={document.metadata}
                prefix={<label>languages </label>}
              />
              <Item.Description>
                {document.metadata.edition && (
                  <LiteratureEdition
                    edition={document.metadata.edition}
                    withLabel
                  />
                )}
              </Item.Description>
              <label>Published</label> {document.metadata.publication_year}
            </Grid.Column>
            <Grid.Column computer={3} largeScreen={4}>
              {this.renderMiddleColumn(document)}
            </Grid.Column>
            <Grid.Column computer={3} largeScreen={4}>
              {this.renderRightColumn(document)}
            </Grid.Column>
          </Grid>
          <Item.Extra>
            <DocumentTags metadata={document.metadata} />
          </Item.Extra>
        </Item.Content>
        <div className="pid-field discrete">#{document.metadata.pid}</div>
      </Item>
    );
  }
}

DocumentListEntry.propTypes = {
  document: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

DocumentListEntry.defaultProps = {
  renderMiddleColumn: null,
  renderRightColumn: null,
};
