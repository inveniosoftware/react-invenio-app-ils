import { Truncate } from '@components/Truncate';
import { invenioConfig } from '@config';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import DocumentLanguages from '@modules/Document/DocumentLanguages';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTags from '@modules/Literature/LiteratureTags';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Overridable from 'react-overridable';
import { Grid, Item, List } from 'semantic-ui-react';

class DocumentListEntry extends Component {
  constructor(props) {
    super(props);
    this.metadata = props.metadata;
  }

  renderEItemTags = (eitems) => {
    if (eitems.total === 0) {
      return null;
    }
    return [...new Set(eitems.hits.map((eitem) => eitem.eitem_type))].map(
      (tag) => {
        return (
          <List.Item key={tag}>
            <List.Icon name="desktop" />
            <List.Content>{tag}</List.Content>
          </List.Item>
        );
      }
    );
  };

  renderCirculationInfo = (meta) => {
    if (
      meta.circulation &&
      (meta.circulation.available_items_for_loan_count > 0 ||
        meta.eitems.total > 0)
    ) {
      return (
        <List className="document-availability-wrapper">
          {meta.circulation.available_items_for_loan_count > 0 ? (
            <List.Item>
              <List.Icon color="green" name="check" />
              <List.Content>Available for loan</List.Content>
            </List.Item>
          ) : null}
          {this.renderEItemTags(meta.eitems)}
        </List>
      );
    }
    return null;
  };

  renderImprintInfo = () => {
    if (!_isEmpty(this.metadata.imprint)) {
      return (
        <List>
          <List.Item>
            <List.Content>
              <span>Published by </span>
              {this.metadata.imprint.publisher}
            </List.Content>
          </List.Item>
          <List.Item>
            {this.metadata.imprint.place}, {this.metadata.imprint.date}
          </List.Item>
        </List>
      );
    }
    return null;
  };

  renderVolume = () => {
    const volume = _get(
      this,
      'metadata.relations.multipart_monograph[0].volume'
    );

    return volume ? <>Volume: {volume}</> : null;
  };

  renderImage = () => {
    const image = (
      <Item.Image
        floated="left"
        as={Link}
        to={FrontSiteRoutes.documentDetailsFor(this.metadata.pid)}
      >
        <LiteratureCover
          isRestricted={_get(this, 'metadata.restricted', false)}
          size="small"
          url={_get(this, 'metadata.cover_metadata.urls.medium')}
        />
      </Item.Image>
    );
    return image;
  };

  renderSubtitle = (metadata) => {
    const subtitle = !_isEmpty(metadata.alternative_titles)
      ? metadata.alternative_titles.find((e) => e.type === 'SUBTITLE')
      : null;
    return subtitle ? subtitle.value : null;
  };

  render() {
    return (
      <Item>
        {this.renderImage()}
        <Item.Content>
          <Item.Meta>{this.metadata.document_type}</Item.Meta>
          <Item.Header
            as={Link}
            to={FrontSiteRoutes.documentDetailsFor(this.metadata.pid)}
          >
            <LiteratureTitle title={this.metadata.title} />
          </Item.Header>
          <Overridable
            id="DocumentListEntry.BeforeAuthors"
            metadata={this.metadata}
          />
          <Item.Description>
            <Truncate>{this.renderSubtitle(document.metadata)}</Truncate>
          </Item.Description>
          <Item.Meta>
            <DocumentAuthors
              authors={this.metadata.authors}
              hasOtherAuthors={this.metadata.other_authors}
              prefix="by "
              limit={invenioConfig.LITERATURE.authors.maxDisplay}
            />
          </Item.Meta>
          <Item.Description>
            <Truncate lines={2}>{this.metadata.abstract}</Truncate>
          </Item.Description>
          <Item.Meta>
            <Grid columns="equal">
              <Grid.Column>
                {this.renderCirculationInfo(this.metadata)}
              </Grid.Column>
              <Grid.Column>{this.renderImprintInfo()}</Grid.Column>
              <Grid.Column>
                <List>
                  {this.metadata.edition && (
                    <List.Item>
                      <List.Content>
                        <span>Edition: </span>
                        {this.metadata.edition}
                      </List.Content>
                    </List.Item>
                  )}
                  {this.metadata.languages && (
                    <List.Item>
                      <List.Content>
                        <span>Languages: </span>
                        <DocumentLanguages
                          languages={this.metadata.languages}
                        />
                      </List.Content>
                    </List.Item>
                  )}
                </List>
              </Grid.Column>
              <Grid.Column>{this.renderVolume()}</Grid.Column>
            </Grid>
          </Item.Meta>
          <Item.Extra>
            <LiteratureTags tags={this.metadata.tags} />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

DocumentListEntry.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentListEntry', DocumentListEntry);
