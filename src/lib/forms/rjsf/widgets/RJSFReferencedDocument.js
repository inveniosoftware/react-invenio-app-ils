import { documentApi } from '@api/documents';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

/**
 * React JSONSchema Form widget to search and retrieve Documents.
 */
export class RJSFReferencedDocument extends Component {
  responseSerializer = (record) => {
    const {
      edition,
      pid,
      publicationYear,
      document_type: documentType,
      title,
    } = record.metadata;

    const descriptions = [];
    edition && descriptions.push(`Edition: ${edition}`);
    publicationYear && descriptions.push(`Year: ${publicationYear}`);
    descriptions.push(`Type: ${documentType}`);
    descriptions.push(`PID: ${pid}`);

    return {
      key: pid,
      value: pid,
      text: title,
      content: (
        <Header as="h5" content={title} subheader={descriptions.join(' - ')} />
      ),
    };
  };

  query = async (searchQuery) => await documentApi.list(searchQuery);

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: async (value) => (await documentApi.get(value)).data,
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
