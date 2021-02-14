import { documentApi } from '@api/documents';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to search and retrieve Documents.
 */
export class RJSFReferencedDocument extends Component {
  responseSerializer = (record) => {
    const { edition, pid, publicationYear, title } = record.metadata;

    let docTitle = `#${pid} - ${title}`;
    if (edition && publicationYear) {
      docTitle = `${docTitle} (${edition} - ${publicationYear})`;
    } else if (edition) {
      docTitle = `${docTitle} (${edition})`;
    } else if (publicationYear) {
      docTitle = `${docTitle} (${publicationYear})`;
    }

    return {
      key: pid,
      value: pid,
      text: docTitle,
    };
  };

  query = async (searchQuery) => await documentApi.list(searchQuery);

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => await documentApi.get(value),
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: async (searchQuery) => await documentApi.list(searchQuery),
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFReferencedDocument.propTypes = {
  options: PropTypes.object,
};

RJSFReferencedDocument.defaultProps = {
  options: {},
};
