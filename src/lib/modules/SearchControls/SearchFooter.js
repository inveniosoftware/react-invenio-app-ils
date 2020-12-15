import { Media } from '@components/Media';
import { Grid } from 'semantic-ui-react';
import React, { Component } from 'react';
import SearchPagination from './SearchPagination';

export default class SearchFooter extends Component {
  render() {
    return (
      <Media greaterThan="mobile">
        <Grid textAlign="center" className="search-footer-pagination">
          <Grid.Column>
            <SearchPagination />
          </Grid.Column>
        </Grid>
      </Media>
    );
  }
}
