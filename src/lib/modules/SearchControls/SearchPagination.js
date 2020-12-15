import { Media } from '@components/Media';
import { Pagination } from 'react-searchkit';
import React, { Component } from 'react';

export default class SearchPagination extends Component {
  render() {
    return (
      <>
        <Media greaterThanOrEqual="tablet">
          <Pagination />
        </Media>
        <Media at="mobile">
          <Pagination
            options={{
              boundaryRangeCount: 0,
              siblingRangeCount: 0,
              showPrev: true,
              showNext: true,
            }}
          />
        </Media>
      </>
    );
  }
}
