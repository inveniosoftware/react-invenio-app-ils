import { DocumentRequestListEntry } from './DocumentRequestListEntry';
import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import { SearchEmptyResults } from '@modules/SearchControls';
import PropTypes from 'prop-types';

export default class DocumentRequestList extends Component {
  renderListEntry = documentRequest => {
    const { renderListEntryElement } = this.props;
    if (renderListEntryElement) {
      return renderListEntryElement(documentRequest);
    }
    return (
      <DocumentRequestListEntry
        key={documentRequest.metadata.pid}
        documentRequest={documentRequest}
      />
    );
  };

  render() {
    const { hits } = this.props;

    if (!hits.length) return <SearchEmptyResults />;

    return (
      <Item.Group divided className="bo-document-request-search">
        {hits.map(hit => {
          return this.renderListEntry(hit);
        })}
      </Item.Group>
    );
  }
}

DocumentRequestList.propTypes = {
  hits: PropTypes.array.isRequired,
  renderListEntryElement: PropTypes.func,
};

DocumentRequestList.defaultProps = {
  renderListEntryElement: null,
};
