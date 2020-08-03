import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import ClearButton from '@modules/SearchControls/ClearButton';

export default class SearchEmptyResults extends Component {
  render() {
    const { queryString, resetQuery, extraContent } = this.props;
    const currentSearch = `Current search "${queryString}"`;
    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name="search" />
          No results found!
        </Header>
        {queryString && (
          <>
            <div className="empty-results-current">{currentSearch}</div>
            <Segment.Inline>
              <ClearButton clickHandler={resetQuery} /> {extraContent}
            </Segment.Inline>
          </>
        )}
      </Segment>
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
