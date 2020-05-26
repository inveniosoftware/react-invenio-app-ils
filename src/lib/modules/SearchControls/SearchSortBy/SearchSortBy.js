import React, { Component } from 'react';
import { SortBy } from 'react-searchkit';
import PropTypes from 'prop-types';
import { Dropdown, Responsive } from 'semantic-ui-react';
import { getSearchConfig } from '@config';

export default class SearchSortBy extends Component {
  renderMobileElement = (currentSortBy, options, onValueChange) => {
    return (
      <Dropdown text="Sort by" size="small" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Header icon="sort" content="Sort by" />
          {options.map((element, index) => {
            return (
              <Dropdown.Item
                key={index}
                value={element.value}
                text={element.text}
                onClick={(e, { value }) => onValueChange(value)}
              />
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderSortBy = (currentSortBy, options, onValueChange) => {
    const _options = options.map((element, index) => {
      return { key: index, text: element.text, value: element.value };
    });
    return (
      <Dropdown
        selection
        options={_options}
        value={currentSortBy}
        onChange={(e, { value }) => onValueChange(value)}
      />
    );
  };

  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          {searchConfig.SORT_BY.length > 0 ? (
            <>
              <SortBy
                label={cmp => <> Sort by {cmp}</>}
                values={searchConfig.SORT_BY}
                defaultValue={searchConfig.SORT_BY[0].value}
                defaultValueOnEmptyString={searchConfig.SORT_BY_ON_EMPTY_QUERY}
                renderElement={this.renderSortBy}
              />
            </>
          ) : null}
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          {searchConfig.SORT_BY.length > 0 ? (
            <>
              <SortBy
                values={searchConfig.SORT_BY}
                defaultValue={searchConfig.SORT_BY[0].value}
                defaultValueOnEmptyString={searchConfig.SORT_BY_ON_EMPTY_QUERY}
                renderElement={this.renderMobileElement}
              />
            </>
          ) : null}
        </Responsive>
      </>
    );
  }
}

SearchSortBy.propTypes = {
  modelName: PropTypes.string.isRequired,
};
