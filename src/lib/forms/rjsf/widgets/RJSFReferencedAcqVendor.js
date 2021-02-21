import { vendorApi } from '@api/acquisition';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve Acq Vendors.
 */
export class RJSFReferencedAcqVendor extends Component {
  responseSerializer(record) {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: `${record.metadata.name} (${record.metadata.pid})`,
    };
  }

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => await vendorApi.get(value),
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) => await vendorApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedAcqVendor.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedAcqVendor.defaultProps = {
  options: {},
};
