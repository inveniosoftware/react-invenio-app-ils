import { locationApi } from '@api/locations';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve Locations.
 */
export class RJSFReferencedLocation extends Component {
  responseSerializer = (record) => {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: record.metadata.name,
    };
  };

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => (await locationApi.get(value)).data,
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) => await locationApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedLocation.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedLocation.defaultProps = {
  options: {},
};
