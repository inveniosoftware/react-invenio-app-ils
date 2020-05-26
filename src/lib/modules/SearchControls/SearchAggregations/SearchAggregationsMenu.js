import { Dropdown } from 'semantic-ui-react';
import { BucketAggregation } from 'react-searchkit';
import React, { Component } from 'react';
import { getSearchConfig } from '@config';
import PropTypes from 'prop-types';

export default class SearchAggregationsCards extends Component {
  renderValues = (title, containerCmp) => {
    return containerCmp ? (
      <>
        <Dropdown.Header content={title} />
        <Dropdown.Item>{containerCmp}</Dropdown.Item>
      </>
    ) : null;
  };

  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return searchConfig.FILTERS.map(filter => (
      <BucketAggregation
        key={filter.field}
        title={filter.title}
        agg={{ field: filter.field, aggName: filter.aggName }}
        renderElement={this.renderValues}
      />
    ));
  }
}

SearchAggregationsCards.propTypes = {
  modelName: PropTypes.string.isRequired,
};
