import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';

export default class SearchResultsList extends Component {
  renderListEntry = record => {
    const { ListEntryElement, ...entryProps } = this.props;
    return (
      <ListEntryElement
        key={record.metadata.pid}
        record={record}
        {...entryProps}
      />
    );
  };

  render() {
    const { results } = this.props;
    return (
      <Item.Group divided className="bo-document-search">
        {results.map(hit => {
          return this.renderListEntry(hit);
        })}
      </Item.Group>
    );
  }
}

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  ListEntryElement: PropTypes.elementType.isRequired,
};
