import React, { Component } from 'react';
import { SortBy } from 'react-searchkit';
import PropTypes from 'prop-types';
import { Responsive } from 'semantic-ui-react';
import { getSearchConfig } from '@config';

export default class SearchSortBy extends Component {
  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          {searchConfig.SORT_BY.length > 0 ? (
            <SortBy
              label={cmp => <> Sort by {cmp}</>}
              values={searchConfig.SORT_BY}
              defaultValue={searchConfig.SORT_BY[0].value}
              defaultValueOnEmptyString={searchConfig.SORT_BY_ON_EMPTY_QUERY}
              overridableId="desktop"
            />
          ) : null}
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          {searchConfig.SORT_BY.length > 0 ? (
            <SortBy
              values={searchConfig.SORT_BY}
              defaultValue={searchConfig.SORT_BY[0].value}
              defaultValueOnEmptyString={searchConfig.SORT_BY_ON_EMPTY_QUERY}
              overridableId="mobile"
            />
          ) : null}
        </Responsive>
      </>
    );
  }
}

SearchSortBy.propTypes = {
  modelName: PropTypes.string.isRequired,
};
