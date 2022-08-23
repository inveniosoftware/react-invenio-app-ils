import { Media } from '@components/Media';
import { Grid } from 'semantic-ui-react';
import React, { Component } from 'react';
import SearchPagination from './SearchPagination';
import { withState } from 'react-searchkit';
import PropTypes from 'prop-types';

class SearchFooter extends Component {
  render() {
    const { currentResultsState } = this.props;
    const totalResults = currentResultsState.data.total;

    return totalResults > 0 ? (
      <Media greaterThan="mobile">
        <Grid textAlign="center" className="search-footer-pagination">
          <Grid.Column>
            <SearchPagination />
          </Grid.Column>
        </Grid>
      </Media>
    ) : null;
  }
}

SearchFooter.propTypes = {
  currentResultsState: PropTypes.object.isRequired,
};

export default withState(SearchFooter);
