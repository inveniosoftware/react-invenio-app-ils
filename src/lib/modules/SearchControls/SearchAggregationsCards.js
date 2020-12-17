import { BucketAggregation } from 'react-searchkit';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSearchConfig } from '@config';

/**
 * Component wrapping BucketAggregation to provide custom display for
 * filter values
 *
 * if searchConfig provides property 'labels' for the filter
 * it will display the label mapped for current bucket key
 */
export default class SearchAggregationsCards extends Component {
  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    if (searchConfig.FILTERS.length <= 0) {
      return <p>No filters available for this search.</p>;
    }

    return searchConfig.FILTERS.map((filter) => {
      return (
        <BucketAggregation
          key={filter.field}
          title={filter.title}
          agg={{
            field: filter.field,
            aggName: filter.aggName,
          }}
          overridableId="card"
        />
      );
    });
  }
}

SearchAggregationsCards.propTypes = {
  modelName: PropTypes.string.isRequired,
};
