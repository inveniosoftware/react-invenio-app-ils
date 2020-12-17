import { Media } from '@components/Media';
import React, { Component } from 'react';
import { Sort } from 'react-searchkit';
import PropTypes from 'prop-types';
import { getSearchConfig } from '@config';

export default class SearchSortBy extends Component {
  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return (
      <>
        <Media greaterThanOrEqual="tablet">
          {searchConfig.SORT_BY.length > 0 ? (
            <Sort
              label={(cmp) => <> Sort by {cmp}</>}
              values={searchConfig.SORT_BY}
              overridableId="desktop"
            />
          ) : null}
        </Media>
        <Media at="mobile">
          {searchConfig.SORT_BY.length > 0 ? (
            <Sort values={searchConfig.SORT_BY} overridableId="mobile" />
          ) : null}
        </Media>
      </>
    );
  }
}

SearchSortBy.propTypes = {
  modelName: PropTypes.string.isRequired,
};
