import { recordToPidType } from '@api/utils';
import { SeriesIcon } from '@components/backoffice/icons';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export class DocumentCard extends Component {
  render() {
    const { data, extra, actions } = this.props;
    const linkTo = BackOfficeRoutes.documentDetailsFor(data.metadata.pid);
    return (
      <Card centered className="bo-relation-card" data-test={data.metadata.pid}>
        <Card.Meta className="discrete">
          {actions}
          {data.metadata.document_type || data.metadata.mode_of_issuance}
        </Card.Meta>
        {recordToPidType(data) === 'docid' ? (
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
            <DocumentAuthors
              authors={data.metadata.authors}
              hasOtherAuthors={data.metadata.other_authors}
            />
          </Card.Meta>
        </Card.Content>
        {!_isEmpty(extra) && <Card.Content extra>{extra}</Card.Content>}
      </Card>
    );
  }
}

DocumentCard.propTypes = {
  data: PropTypes.object.isRequired,
  extra: PropTypes.node,
  actions: PropTypes.node.isRequired,
};
DocumentCard.defaultProps = {
  extra: null,
};
