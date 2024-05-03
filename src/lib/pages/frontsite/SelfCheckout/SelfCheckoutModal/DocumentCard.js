import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export class DocumentCard extends Component {
  render() {
    const { item, extra } = this.props;
    const linkTo = FrontSiteRoutes.documentDetailsFor(
      item.metadata.document_pid
    );

    return (
      <Card
        centered
        className="fs-book-card"
        data-test={item.metadata.document_pid}
      >
        <Card.Meta className="discrete">
          {item.metadata.document.document_type ||
            item.metadata.document.mode_of_issuance ||
            'Type: Not specified'}
        </Card.Meta>
        <LiteratureCover
          size="small"
          url={_get(item, 'metadata.document.cover_metadata.urls.medium')}
        />
        <Card.Content>
          <Card.Header as={Link} to={linkTo} target="_blank">
            <LiteratureTitle title={item.metadata.document.title} />
          </Card.Header>
          <Card.Meta className="discrete">
            {item.metadata.document.authors}
          </Card.Meta>
        </Card.Content>
        {!_isEmpty(extra) && <Card.Content extra>{extra}</Card.Content>}
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  item: PropTypes.object.isRequired,
  extra: PropTypes.node,
};

DocumentCard.defaultProps = {
  extra: null,
};
