import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Card, Label } from 'semantic-ui-react';
import { invenioConfig } from '@config';
import { Link } from 'react-router-dom';
import { Truncate } from '@components/Truncate';
import { renderSubtitle } from '@modules/Document/utils';

class DocumentCard extends Component {
  renderImage = () => {
    const { data, volume } = this.props;
    const image = (
      <LiteratureCover
        isRestricted={_get(data, 'metadata.restricted', false)}
        size="small"
        url={_get(data, 'metadata.cover_metadata.urls.medium')}
      />
    );

    if (volume) {
      return (
        <div className="search-result-image">
          <Label floating color="black">
            Volume {volume}
          </Label>
          {image}
        </div>
      );
    }

    return image;
  };

  renderEItemTypeLabels = (eitems) => {
    if (eitems.total === 0) {
      return null;
    }
    return [...new Set(eitems.hits.map((eitem) => eitem.eitem_type))].map(
      (tag) => <Label key={tag}>{tag}</Label>
    );
  };

  render() {
    const { data } = this.props;
    const { metadata } = data;
    const url = FrontSiteRoutes.documentDetailsFor(metadata.pid);
    let authors = data.metadata.authors
      .slice(0, invenioConfig.LITERATURE.authors.maxDisplay)
      .map((elem) => elem['full_name'])
      .join('; ');
    if (data.metadata.other_authors) {
      authors = authors + ' et al.';
    }

    const volume = _get(metadata, 'relations.multipart_monograph[0].volume');
    const multipartTitle = _get(
      metadata,
      'relations.multipart_monograph[0].record_metadata.title',
      ''
    );
    const subtitle = renderSubtitle(metadata.alternative_titles);

    return (
      <Overridable id="DocumentCard.layout" {...this.props}>
        <Card
          centered
          className="fs-book-card"
          as={Link}
          to={url}
          data-test={metadata.pid}
        >
          <Card.Meta className="discrete">{metadata.document_type}</Card.Meta>
          <Overridable id="DocumentCard.cover" {...this.props}>
            {this.renderImage()}
          </Overridable>
          <Card.Content>
            <Card.Header>
              <LiteratureTitle title={metadata.title} />
            </Card.Header>
            <Card.Meta>
              {subtitle}
              <Truncate lines={1}>{authors}</Truncate>
              <Overridable id="DocumentCard.AfterAuthors" metadata={metadata} />
              <div>
                {metadata.publication_year}
                {metadata.edition && <> - Edition {metadata.edition}</>}
                {volume && <> - Vol. {volume}</>}
              </div>
              <div>
                {multipartTitle}
                {metadata.imprint?.publisher && (
                  <>
                    {' '}
                    <br /> {metadata.imprint.publisher}
                  </>
                )}
              </div>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            {_get(metadata, 'circulation.available_items_for_loan_count') >
              0 && (
              <Label basic color="green">
                On shelf
              </Label>
            )}
            {this.renderEItemTypeLabels(metadata.eitems)}
            <Overridable id="DocumentCard.Extras" metadata={metadata} />
          </Card.Content>
        </Card>
      </Overridable>
    );
  }
}

DocumentCard.propTypes = {
  data: PropTypes.object.isRequired,
  volume: PropTypes.string,
};

DocumentCard.defaultProps = {
  volume: null,
};

export default Overridable.component('DocumentCard', DocumentCard);
