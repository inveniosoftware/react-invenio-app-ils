import { Count, Sort } from 'react-searchkit';
import React, { Component } from 'react';
import { Grid, Container, Menu, Sticky } from 'semantic-ui-react';
import SearchResultsPerPage from './SearchResultsPerPage';
import SearchAggregationsMenu from './SearchAggregationsMenu';
import PropTypes from 'prop-types';
import { getSearchConfig } from '@config';
import { withState } from 'react-searchkit';

class SearchControlsMobileComponent extends Component {
  renderCount = (totalResults) => {
    return (
      <div className="search-results-counter">{totalResults} results found</div>
    );
  };

  render() {
    const { stickyRef, modelName, currentResultsState } = this.props;
    const totalResults = currentResultsState.data.total;
    const searchConfig = getSearchConfig(modelName);

    return totalResults > 0 ? (
      <Container fluid className="mobile-search-controls">
        <Sticky context={stickyRef} offset={66}>
          <Container fluid className="fs-search-controls-mobile">
            <Menu fluid borderless>
              <SearchAggregationsMenu modelName={modelName} />
              {searchConfig.SORT_BY.length > 0 ? (
                <Sort values={searchConfig.SORT_BY} overridableId="mobile" />
              ) : null}
            </Menu>
            <Container>
              <Grid columns={2}>
                <Grid.Column width={8} className="vertical-align-content">
                  <div>
                    <Count
                      label={(cmp) => (
                        <div className="mobile-count">{cmp} results found</div>
                      )}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column
                  width={8}
                  className="vertical-align-content"
                  textAlign="right"
                >
                  <div>
                    <SearchResultsPerPage
                      modelName={modelName}
                      label={(cmp) => (
                        <div className="mobile-results-page">
                          {cmp} results per page
                        </div>
                      )}
                    />
                  </div>
                </Grid.Column>
              </Grid>
            </Container>
          </Container>
        </Sticky>
      </Container>
    ) : null;
  }
}

SearchControlsMobileComponent.propTypes = {
  modelName: PropTypes.string.isRequired,
  stickyRef: PropTypes.object,
  currentResultsState: PropTypes.object.isRequired,
};

SearchControlsMobileComponent.defaultProps = {
  stickyRef: null,
};

export const SearchControlsMobile = withState(SearchControlsMobileComponent);
