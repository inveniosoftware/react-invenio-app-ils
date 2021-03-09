import { orderApi } from '@api/acquisition';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve Acq Orders.
 */
export class RJSFReferencedAcqOrder extends Component {
  responseSerializer = (record) => {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: `#${record.metadata.pid} - Provider: ${record.metadata.provider.name}`,
    };
  };

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => await orderApi.get(value),
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) => await orderApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedAcqOrder.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedAcqOrder.defaultProps = {
  options: {},
};
