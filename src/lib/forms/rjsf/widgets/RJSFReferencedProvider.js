import { providerApi } from '@api/providers';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve ILL Libraries.
 */
export class RJSFReferencedProvider extends Component {
  responseSerializer = (record) => {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: `${record.metadata.name} (${record.metadata.pid})`,
    };
  };

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => await providerApi.get(value),
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) => await providerApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedProvider.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedProvider.defaultProps = {
  options: {},
};
