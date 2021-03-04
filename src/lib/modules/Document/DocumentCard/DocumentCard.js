import DocumentAuthors from '@modules/Document/DocumentAuthors';
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

  render() {
    const { data } = this.props;
    const { metadata } = data;
    const url = FrontSiteRoutes.documentDetailsFor(metadata.pid);
    return (
      <Overridable id="DocumentCard.layout" {...this.props}>
        <Card
          link
          centered
          className="fs-book-card"
          href={url}
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
              <DocumentAuthors
                authors={data.metadata.authors}
                hasOtherAuthors={data.metadata.other_authors}
                limit={invenioConfig.LITERATURE.authors.maxDisplay}
              />
              <div>
                {metadata.publication_year}
                {metadata.edition && <>Edition {metadata.edition}</>}
              </div>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            {_get(metadata, 'circulation.available_items_for_loan_count') >
              0 && <Label>On shelf</Label>}
            {metadata.eitems.total > 0 && <Label>E-book</Label>}
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

export default Overridable.component('DocumenteCard', DocumentCard);
