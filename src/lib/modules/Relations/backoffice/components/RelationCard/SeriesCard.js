import { SeriesIcon } from '@components/backoffice/icons';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { SeriesAuthors } from '@modules/Series/SeriesAuthors';
import { BackOfficeRoutes } from '@routes/urls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import _get from 'lodash/get';
import { recordToPidType } from '@api/utils';
import LiteratureCover from '@modules/Literature/LiteratureCover';

export default class SeriesCard extends Component {
  render() {
    const { data, extra, actions } = this.props;
    const linkTo = BackOfficeRoutes.seriesDetailsFor(data.metadata.pid);
    return (
      <Card centered className="bo-relation-card" data-test={data.metadata.pid}>
        <Card.Meta className="discrete">
          {actions}
          {data.metadata.series_type || data.metadata.mode_of_issuance}
        </Card.Meta>
        {recordToPidType(data) === 'serid' ? (
          <LiteratureCover
            size="small"
            url={_get(data, 'metadata.cover_metadata.urls.medium')}
          />
        ) : (
          <SeriesIcon size="huge" color="grey" />
        )}
        <Card.Content>
          <Card.Header as={Link} to={linkTo} target="_blank">
            <LiteratureTitle title={data.metadata.title} />
          </Card.Header>
          <Card.Meta>
            <SeriesAuthors authors={data.metadata.authors} />
            <div>
              {data.metadata.edition ? `ed.  ${data.metadata.edition}` : null}
              {data.metadata.publication_year &&
                `(${data.metadata.publication_year})`}
            </div>
          </Card.Meta>
        </Card.Content>
        {!_isEmpty(extra) && <Card.Content extra>{extra}</Card.Content>}
      </Card>
    );
  }
}

SeriesCard.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.node,
  extra: PropTypes.node,
};

SeriesCard.defaultProps = {
  actions: null,
  extra: null,
};
