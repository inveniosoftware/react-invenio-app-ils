import { internalLocationApi } from '@api/locations';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve Internal Locations.
 */
export class RJSFReferencedInternalLocation extends Component {
  responseSerializer = (record) => {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: `${record.metadata.name} (${record.metadata.location.name})`,
    };
  };

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => await internalLocationApi.get(value),
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) =>
            await internalLocationApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedInternalLocation.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedInternalLocation.defaultProps = {
  options: {},
};
