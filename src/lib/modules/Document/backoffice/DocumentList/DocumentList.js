import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Item } from 'semantic-ui-react';
import DocumentListEntry from './DocumentListEntry';

export default class DocumentList extends Component {
  renderListEntry = document => {
    const { renderListEntryElement } = this.props;
    if (renderListEntryElement) {
      return renderListEntryElement(document);
    }
    return (
      <DocumentListEntry key={document.metadata.pid} document={document} />
    );
  };

  render() {
    const { hits } = this.props;

    if (!hits.length)
      return <Message data-test="no-results">There are no documents.</Message>;

    return (
      <Item.Group divided className="bo-document-search">
        {hits.map(hit => {
          return this.renderListEntry(hit);
        })}
      </Item.Group>
    );
  }
}

DocumentList.propTypes = {
  hits: PropTypes.array.isRequired,
  renderListEntryElement: PropTypes.func,
};

DocumentList.defaultProps = {
  renderListEntryElement: null,
};
