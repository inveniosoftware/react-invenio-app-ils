import { withCancel } from '@api/utils';
import { vocabularyApi } from '@api/vocabularies';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

/**
 * React JSONSchema Form widget to retrieve all vocabularies
 * of a given type, without search feature.
 * It is meant to be used with vocabularies that have low cardinality.
 */
export class RJSFVocabulary extends Component {
  constructor(props) {
    super(props);

    const { value } = this.props;
    this.state = {
      isLoading: false,
      value: value,
      error: null,
      options: [],
    };
  }

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
      this.setState({
        isLoading: true,
      });

      const response = await this.cancellableFetchData.promise;
      const results = response.data.hits.map((hit) => this.serializer(hit));
      if (!results) {
        throw Error('No results? This is probably a misconfiguration.');
      }

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
    // if empty string, set it to `undefined` as needed by RJSF
    const newValue = value || undefined;
    this.setState({ value: newValue });
    onChange(newValue);
  };

  render() {
    const { autofocus, label, placeholder, readonly, required } = this.props;
    const { options, isLoading, value, error } = this.state;
    return (
      <Form.Select
        fluid
        selection
        options={options}
        label={label}
        value={value}
        clearable
        required={required}
        autoFocus={autofocus}
        placeholder={placeholder}
        onChange={this.handleChange}
        disabled={isLoading || readonly}
        loading={isLoading}
        noResultsMessage={error ? error : 'No results found'}
      />
    );
  }
}

RJSFVocabulary.propTypes = {
  label: PropTypes.string,
  autofocus: PropTypes.bool,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.shape({
    vocabularyType: PropTypes.string.isRequired,
  }).isRequired,
};

RJSFVocabulary.defaultProps = {
  autofocus: false,
  label: '',
  readonly: false,
  required: false,
  value: '',
};
