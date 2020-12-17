import _isEmpty from 'lodash/isEmpty';
import { Accordion, Dropdown } from 'semantic-ui-react';
import { BucketAggregation } from 'react-searchkit';
import React, { Component } from 'react';
import { getSearchConfig } from '@config';
import PropTypes from 'prop-types';

export default class SearchAggregationsMenu extends Component {
  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);

    return (
      <Dropdown
        item
        upward={false}
        size="small"
        pointing="top left"
        simple
        className="link item mobile-filters-dropdown"
        disabled={_isEmpty(searchConfig.FILTERS)}
        text="Filters"
        closeOnBlur
        closeOnEscape
        scrolling
      >
        <Dropdown.Menu key="sub-menu">
          <Dropdown.Header>Refine search</Dropdown.Header>
          <Accordion styled fluid>
            {searchConfig.FILTERS.map((filter) => (
              <BucketAggregation
                key={filter.field}
                title={filter.title}
                agg={{ field: filter.field, aggName: filter.aggName }}
                overridableId="menu"
              />
            ))}
          </Accordion>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SearchAggregationsMenu.propTypes = {
  modelName: PropTypes.string.isRequired,
};
