import React, { Component } from 'react';
import { SortOrder } from 'react-searchkit';
import { Responsive } from 'semantic-ui-react';
import { getSearchConfig } from '@config';
import PropTypes from 'prop-types';

export default class SearchSortOrder extends Component {
  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          {searchConfig.SORT_ORDER.length > 0 ? (
            <SortOrder
              values={searchConfig.SORT_ORDER}
              defaultValue={searchConfig.SORT_ORDER[0]['value']}
              overridableId="desktop"
            />
          ) : null}
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          {searchConfig.SORT_ORDER.length > 0 ? (
            <SortOrder
              values={searchConfig.SORT_ORDER}
              defaultValue={searchConfig.SORT_ORDER[0]['value']}
              overridableId="mobile"
            />
          ) : null}
        </Responsive>
      </>
    );
  }
}

SearchSortOrder.propTypes = {
  modelName: PropTypes.string.isRequired,
};
