import { vocabularyApi } from '@api/vocabularies';
import { RJSFESSelector } from '@forms/rjsf/widgets/RJSFESSelector';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * React JSONSchema Form widget to to search and select hits
 * on large vocabularies.
 */
export class RJSFVocabularySearch extends Component {
  responseSerializer = (record) => ({
    key: record.metadata.key,
    value: record.metadata.key,
    text: record.metadata.text,
  });

  getByKey = async (value) => {
    const { options } = this.props;
    const { vocabularyType } = options;
    const query = vocabularyApi
      .query()
      .withType(vocabularyType)
      .withKey(value)
      .qs();

    const response = await vocabularyApi.list(query);
    const total = response.data.total;
    if (total !== 1) {
      throw Error(`0 or multiple results with value ${value}`);
    }
    return response.data.hits[0];
  };

  query = (searchQuery) => {
    const { options } = this.props;
    const { vocabularyType } = options;
    const query = vocabularyApi
      .query()
      .withSearchText(`*${searchQuery}*`)
      .withType(vocabularyType)
      .qs();
    return vocabularyApi.list(query);
  };

  render() {
    const { options } = this.props;
    return (
      <RJSFESSelector
        {...this.props}
        options={{
          apiGetByValue: this.getByKey,
          apiGetByValueResponseSerializer: this.responseSerializer,
          apiQuery: this.query,
          apiQueryResponseSerializer: this.responseSerializer,
          ...options,
        }}
      />
    );
  }
}

RJSFVocabularySearch.propTypes = {
  options: PropTypes.shape({
    vocabularyType: PropTypes.string.isRequired,
  }).isRequired,
};

RJSFVocabularySearch.defaultProps = {};
