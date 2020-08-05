import { BucketAggregation, Count, SortBy } from 'react-searchkit';
import React, { Component } from 'react';
import { Grid, Container, Menu, Sticky } from 'semantic-ui-react';
import SearchResultsPerPage from './SearchResultsPerPage';
import SearchAggregationsMenu from './SearchAggregationsMenu';
import SearchSortOrder from './SearchSortOrder';
import PropTypes from 'prop-types';
import { getSearchConfig } from '@config';
import find from 'lodash/find';

export class SearchControlsMobile extends Component {
  renderCount = totalResults => {
    return (
      <div className="search-results-counter">{totalResults} results found</div>
    );
  };

  render() {
    const { stickyRef, modelName, withSortOrder } = this.props;
    const searchConfig = getSearchConfig(modelName);
    const loanFilter = find(
      searchConfig.FILTERS,
      o => o.aggName === 'availability'
    );
    return (
      <Container fluid className="mobile-search-controls">
        <Sticky context={stickyRef} offset={66}>
          <Container fluid className="fs-search-controls-mobile">
            <Menu fluid borderless>
              <Menu.Item>
                <BucketAggregation
                  key={loanFilter.field}
                  title={loanFilter.title}
                  agg={{ field: loanFilter.field, aggName: loanFilter.aggName }}
                  overridableId="available-for-loan"
                />
              </Menu.Item>
              <SearchAggregationsMenu modelName={modelName} />
              {searchConfig.SORT_BY.length > 0 ? (
                <SortBy
                  values={searchConfig.SORT_BY}
                  defaultValue={searchConfig.SORT_BY[0].value}
                  defaultValueOnEmptyString={
                    searchConfig.SORT_BY_ON_EMPTY_QUERY
                  }
                  overridableId="mobile"
                />
              ) : null}
              {withSortOrder && <SearchSortOrder modelName={modelName} />}
            </Menu>
            <Container>
              <Grid columns={2}>
                <Grid.Column width={8} className="vertical-align-content">
                  <div>
                    <Count
                      label={cmp => (
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
                      label={cmp => (
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
    );
  }
}

SearchControlsMobile.propTypes = {
  modelName: PropTypes.string.isRequired,
  stickyRef: PropTypes.object,
  withSortOrder: PropTypes.bool,
};

SearchControlsMobile.defaultProps = {
  stickyRef: null,
  withSortOrder: true,
};
