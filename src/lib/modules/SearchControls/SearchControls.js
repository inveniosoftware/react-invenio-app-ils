import { Media } from '@components/Media';
import { Count, LayoutSwitcher } from 'react-searchkit';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SearchSortBy from './SearchSortBy';
import SearchResultsPerPage from './SearchResultsPerPage';
import { SearchControlsMobile } from './SearchControlsMobile';
import SearchPagination from './SearchPagination';
import { withState } from 'react-searchkit';

class SearchControlsComponent extends Component {
  render() {
    const {
      withLayoutSwitcher,
      defaultLayout,
      modelName,
      currentResultsState,
    } = this.props;

    const totalResults = currentResultsState.data.total;

    return totalResults > 0 ? (
      <>
        <Media greaterThanOrEqual="computer">
          <Grid columns={3} className="search-controls">
            <Grid.Column largeScreen={5} computer={5}>
              <Grid columns={2}>
                {withLayoutSwitcher && (
                  <Grid.Column width={6} className="layout-switcher">
                    <LayoutSwitcher defaultLayout={defaultLayout} />
                  </Grid.Column>
                )}
                <Grid.Column width={10}>
                  <Count label={(cmp) => <div>{cmp} results found</div>} />
                  <SearchResultsPerPage modelName={modelName} />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column
              largeScreen={6}
              computer={6}
              textAlign="center"
              className="search-pagination-column"
            >
              <Media greaterThanOrEqual="largeScreen">
                <SearchPagination />
              </Media>
            </Grid.Column>
            <Grid.Column
              textAlign="right"
              largeScreen={5}
              computer={5}
              className="search-sort-options-column"
            >
              <div className="sort-by-filters">
                <SearchSortBy modelName={modelName} />
              </div>
            </Grid.Column>
          </Grid>
        </Media>
        <Media lessThan="computer">
          <SearchControlsMobile modelName={modelName} />
        </Media>
        <Media lessThan="largeScreen">
          <Grid>
            <Grid.Column width={16} textAlign="center">
              <SearchPagination />
            </Grid.Column>
          </Grid>
        </Media>
      </>
    ) : null;
  }
}

SearchControlsComponent.propTypes = {
  modelName: PropTypes.string.isRequired,
  withLayoutSwitcher: PropTypes.bool,
  defaultLayout: PropTypes.oneOf(['grid', 'list']),
  currentResultsState: PropTypes.object.isRequired,
};

SearchControlsComponent.defaultProps = {
  withLayoutSwitcher: true,
  defaultLayout: 'grid',
};

export const SearchControls = withState(SearchControlsComponent);
