import { libraryApi } from '@api/ill';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve ILL Libraries.
 */
export class RJSFReferencedILLLibrary extends Component {
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
          apiGetByValue: async (value) => await libraryApi.get(value),
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) => await libraryApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedILLLibrary.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedILLLibrary.defaultProps = {
  options: {},
};
