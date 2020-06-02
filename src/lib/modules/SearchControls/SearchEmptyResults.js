import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { EmptyResults } from 'react-searchkit';
import { Header, Icon, Segment } from 'semantic-ui-react';
import ClearButton from '@modules/SearchControls/ClearButton';

export default class SearchEmptyResults extends Component {
  renderEmptyResults = (queryString, resetQuery) => {
    const { extras } = this.props;
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
              <ClearButton clickHandler={resetQuery} />
              {extras()}
            </Segment.Inline>
          </>
        )}
      </Segment>
    );
  };

  render() {
    return <EmptyResults renderElement={this.renderEmptyResults} />;
  }
}

SearchEmptyResults.propTypes = {
  extras: PropTypes.func,
};

SearchEmptyResults.defaultProps = {
  extras: () => {},
};
