import { toShortDate } from '@api/date';
import { goTo } from '@history';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Component, default as React } from 'react';
import Overridable from 'react-overridable';
import { Card, Label } from 'semantic-ui-react';
import { invenioConfig } from '@config';

class DocumentCard extends Component {
  renderImage = () => {
    const { data, volume } = this.props;
    const image = (
      <LiteratureCover
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
          onClick={(e) => {
            e.preventDefault();
            goTo(url);
          }}
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
                {!_isEmpty(metadata.imprints) ? (
                  <>
                    {toShortDate(_get(metadata, 'imprints[0].date'))} <br />{' '}
                  </>
                ) : null}
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
