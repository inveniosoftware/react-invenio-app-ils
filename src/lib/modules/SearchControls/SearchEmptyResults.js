import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import ClearButton from '@modules/SearchControls/ClearButton';
import { SearchMessage } from '@modules/SearchControls/SearchMessage';

export default class SearchEmptyResults extends Component {
  render() {
    const { queryString, resetQuery, extraContent } = this.props;
    return (
      <SearchMessage title="No results found searching for" icon="search">
        {queryString && (
          <Segment.Inline>
            <Header as="h1">{queryString}</Header>
            <ClearButton clickHandler={resetQuery} />
            {extraContent}
          </Segment.Inline>
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
