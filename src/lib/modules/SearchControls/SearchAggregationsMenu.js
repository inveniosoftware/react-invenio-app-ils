import _isEmpty from 'lodash/isEmpty';
import { Accordion, Dropdown } from 'semantic-ui-react';
import { BucketAggregation } from 'react-searchkit';
import React, { Component } from 'react';
import { getSearchConfig } from '@config';
import PropTypes from 'prop-types';

export default class SearchAggregationsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  toggleMenuOpen = (e, elem) => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  closeMenu = (e, elem) => {
    this.setState({ menuOpen: false });
  };

  render() {
    const { modelName } = this.props;
    const { menuOpen } = this.state;
    const searchConfig = getSearchConfig(modelName);
    // this element is needed to prevent the Dropdown menu
    // children from closing on click
    const trigger = (
      <div
        className="text"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        onClick={this.toggleMenuOpen}
      >
        Filters
      </div>
    );

    return (
      <Dropdown
        item
        upward={false}
        size="small"
        pointing="top left"
        className="link item mobile-filters-dropdown"
        onChange={() => {}}
        disabled={_isEmpty(searchConfig.FILTERS)}
        open={menuOpen}
        trigger={trigger}
        // closeOnBlur
        closeOnEscape
        onBlur={this.closeMenu}
        scrolling
      >
        <Dropdown.Menu key="sub-menu">
          <Dropdown.Header>Refine search</Dropdown.Header>
          <Accordion styled fluid>
            {searchConfig.FILTERS.map(filter => (
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
