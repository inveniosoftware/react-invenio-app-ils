import { Count } from 'react-searchkit';
import React, { Component } from 'react';
import { Container, Dropdown, Menu, Sticky } from 'semantic-ui-react';
import { SearchResultsPerPage } from './SearchResultsPerPage';
import { SearchAggregationsMenu } from './SearchAggregations';
import { SearchSortBy } from './SearchSortBy';
import { SearchSortOrder } from './SearchSortOrder';
import PropTypes from 'prop-types';
import { getSearchConfig } from '@config';
import _isEmpty from 'lodash/isEmpty';

export class SearchControlsMobile extends Component {
  renderCount = totalResults => {
    return (
      <div className="search-results-counter">{totalResults} results found</div>
    );
  };

  render() {
    const { stickyRef, modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return (
      <Container fluid className="mobile-search-controls">
        <Sticky context={stickyRef} offset={66}>
          <Container fluid className="fs-search-controls-mobile">
            <Menu fluid borderless>
              <Menu.Item header>
                <Count renderElement={this.renderCount} />
              </Menu.Item>
              <Menu.Menu>
                <Dropdown
                  text="Filter"
                  size="small"
                  pointing
                  className="link item"
                  disabled={_isEmpty(searchConfig.FILTERS)}
                >
                  <Dropdown.Menu>
                    <SearchAggregationsMenu modelName={modelName} />
                  </Dropdown.Menu>
                </Dropdown>
                <SearchSortBy modelName={modelName} />
                <SearchSortOrder modelName={modelName} />
              </Menu.Menu>
            </Menu>
            <Container>
              <SearchResultsPerPage modelName={modelName} />
            </Container>
          </Container>
        </Sticky>
      </Container>
    );
  }
}

SearchControlsMobile.propTypes = {
  modelName: PropTypes.string.isRequired,
  stickyRef: PropTypes.object,
};

SearchControlsMobile.defaultProps = {
  stickyRef: null,
};
