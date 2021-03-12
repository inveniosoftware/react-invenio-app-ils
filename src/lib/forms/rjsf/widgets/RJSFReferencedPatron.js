import { patronApi } from '@api/patrons';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve Patrons.
 */
export class RJSFReferencedPatron extends Component {
  responseSerializer = (record) => {
    return {
      key: record.metadata.pid,
      value: record.metadata.pid,
      text: `${record.metadata.name} (${record.metadata.email})`,
    };
  };

  getResponseSerializer = (record, value) => {
    const isAnonymousOrSystem = value <= 0;
    return isAnonymousOrSystem
      ? {
          key: value,
          value: value,
          text: 'anonymous',
        }
      : this.responseSerializer(record);
  };

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) =>
            (await patronApi.get(`"${value}"`)).data,
          apiGetByValueResponseSerializer: this.getResponseSerializer,
          apiQuery: async (searchQuery) => await patronApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedPatron.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedPatron.defaultProps = {
  options: {},
};
