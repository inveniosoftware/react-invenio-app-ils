import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ClearButton from '@modules/SearchControls/ClearButton';
import { SearchMessage } from '@modules/SearchControls/SearchMessage';

export default class SearchEmptyResults extends Component {
  render() {
    const { queryString, resetQuery, extraContent } = this.props;
    const currentSearch = `Current search "${queryString}"`;
    return (
      <SearchMessage title="No results found!" icon="search">
        {queryString && (
          <>
            <div className="empty-results-current">{currentSearch}</div>
            <Segment.Inline>
              <ClearButton clickHandler={resetQuery} /> {extraContent}
            </Segment.Inline>
          </>
        )}
      </SearchMessage>
    );
  }
}

SearchEmptyResults.propTypes = {
  queryString: PropTypes.string,
  resetQuery: PropTypes.func.isRequired,
  extraContent: PropTypes.node,
};

SearchEmptyResults.defaultProps = {
  queryString: '',
  extraContent: null,
};
