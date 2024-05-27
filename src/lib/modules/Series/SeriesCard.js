import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Label } from 'semantic-ui-react';
import { Truncate } from '@components/Truncate';
import { invenioConfig } from '@config';
import { renderSubtitle } from '@modules/Document/utils';

export class SeriesCard extends Component {
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
    const authors = data.metadata.authors
      ? data.metadata.authors
          .slice(0, invenioConfig.LITERATURE.authors.maxDisplay)
          .join('; ')
      : null;
    const subtitle = renderSubtitle(data.metadata?.alternative_titles);

    return (
      <Card
        centered
        className="fs-book-card"
        as={Link}
        to={FrontSiteRoutes.seriesDetailsFor(data.metadata.pid)}
        data-test={data.metadata.pid}
      >
        <Card.Meta className="discrete">
          {data.metadata.series_type || 'SERIES'}
        </Card.Meta>
        {this.renderImage()}
        <Card.Content>
          <Card.Header>
            <LiteratureTitle title={data.metadata.title} />
          </Card.Header>
          <Card.Meta>
            <div className="default-margin-bottom">
              <Truncate lines={1}>
                <div>{authors}</div>
              </Truncate>
            </div>
            {data.metadata.edition && (
              <div>Edition {data.metadata.edition}</div>
            )}
            {subtitle}
            {data.metadata.publisher && (
              <div>Publisher {data.metadata.publisher}</div>
            )}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

SeriesCard.propTypes = {
  data: PropTypes.object.isRequired,
  volume: PropTypes.string,
};

SeriesCard.defaultProps = {
  volume: null,
};
