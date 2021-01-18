import { withCancel } from '@api/utils';
import { vocabularyApi } from '@api/vocabularies';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export class RJSFVocabulary extends Component {
  state = {
    isLoading: false,
    value: '',
    error: null,
    options: [],
  };

  componentDidMount() {
    this.fetchAll();
  }

  componentWillUnmount() {
    this.cancellableFetchData && this.cancellableFetchData.cancel();
  }

  serializer = (hit) => ({
    key: hit.metadata.key,
    value: hit.metadata.key,
    text: hit.metadata.text,
  });

  query = () => {
    const { options } = this.props;
    const { vocabularyType } = options;
    const query = vocabularyApi.query().withType(vocabularyType).qs();
    return vocabularyApi.list(query);
  };

  fetchAll = async () => {
    this.cancellableFetchData = withCancel(this.query());
    try {
      const response = await this.cancellableFetchData.promise;
      const results = response.data.hits.map((hit) => this.serializer(hit));
      this.setState({
        isLoading: false,
        options: results,
        error: null,
      });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({
          isLoading: false,
          error: 'Error loading results.',
        });
      }
    }
  };

  handleChange = (e, { value }) => {
    const { onChange } = this.props;
    this.setState({ value: value });
    onChange(value);
  };

  render() {
    const { placeholder } = this.props;
    const { options, isLoading, value, error } = this.state;
    return (
      <Dropdown
        fluid
        selection
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        disabled={isLoading}
        loading={isLoading}
        noResultsMessage={error ? error : 'No results found'}
      />
    );
  }
}

RJSFVocabulary.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.shape({
    vocabularyType: PropTypes.string.isRequired,
  }).isRequired,
};

RJSFVocabulary.defaultProps = {};
