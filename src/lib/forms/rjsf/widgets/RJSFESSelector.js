import { withCancel } from '@api/utils';
import _debounce from 'lodash/debounce';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

/**
 * Generic React JSONSchema Form widget to search and select hits
 * on Elasticsearch.
 * It is meant to be wrapped in specialized component and not to
 * be directly used.
 */
export class RJSFESSelector extends Component {
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

  async componentDidMount() {
    const { value } = this.props;
    if (value) {
      this.fetchValue(value);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchData && this.cancellableFetchData.cancel();
  }

  async fetchValue(value) {
    const { options } = this.props;
    const { apiGetByValue, apiGetByValueResponseSerializer } = options;
    this.cancellableFetchData = withCancel(apiGetByValue(value));
    try {
      this.setState({
        isLoading: true,
      });

      const response = await this.cancellableFetchData.promise;
      const singleOption = apiGetByValueResponseSerializer(response.data);

      this.setState({
        isLoading: false,
        value: singleOption.value,
        options: [singleOption],
      });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({
          isLoading: false,
          error: 'Error loading results.',
        });
      }
    }
  }

  handleSearchChange = async (e, { searchQuery }) => {
    const { options } = this.props;
    const { apiQuery, apiQueryResponseSerializer } = options;
    if (searchQuery === '') {
      return;
    }

    this.cancellableFetchData = withCancel(apiQuery(searchQuery));
    try {
      this.setState({
        isLoading: true,
      });

      const response = await this.cancellableFetchData.promise;

      /**
       * The Dropdown search component in Semantic UI locally filters
       * results based on the `text` value of each option.
       * As result, each option that does not contain the `searchQuery` in
       * the `text` field will be removed.
       * The second `map` here is an hack to fix this behaviour: the Dropdown
       * `content` field is used to display each options instead of the
       * `text` field, and the `text` field simply contains the searchQuery.
       */
      const results = response.data.hits
        .map((hit) => apiQueryResponseSerializer(hit))
        .map((obj) => ({
          ...obj,
          text: searchQuery,
          original: obj.text,
          content: obj.content || obj.text,
        }));

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

  handleChange = (e, { options, value }) => {
    const { onChange } = this.props;

    const newOptions = [];
    if (!_isEmpty(value)) {
      const selected = _find(options, { value: value });
      selected.text = selected.original;
      newOptions.push(selected);
    }

    this.setState({ options: newOptions, value: value });
    onChange(value);
  };

  render() {
    const {
      autofocus,
      debounceDelay,
      label,
      placeholder,
      readonly,
      required,
      options: rjsfOptions,
    } = this.props;
    const { options, isLoading, value, error } = this.state;
    const { selectMultiple } = rjsfOptions;

    return (
      <Form.Select
        fluid
        selection
        search
        icon="search"
        clearable={!required}
        options={options}
        label={label}
        value={value}
        multiple={selectMultiple || false}
        required={required}
        autoFocus={autofocus}
        readOnly={readonly}
        placeholder={placeholder || 'Type to search...'}
        onChange={this.handleChange}
        onSearchChange={_debounce(this.handleSearchChange, debounceDelay)}
        loading={isLoading}
        noResultsMessage={error || 'No results found'}
      />
    );
  }
}

RJSFESSelector.propTypes = {
  label: PropTypes.string,
  autofocus: PropTypes.bool,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.shape({
    apiGetByValue: PropTypes.func.isRequired,
    apiGetByValueResponseSerializer: PropTypes.func.isRequired,
    apiQuery: PropTypes.func.isRequired,
    apiQueryResponseSerializer: PropTypes.func.isRequired,
    selectMultiple: PropTypes.bool,
  }).isRequired,
  debounceDelay: PropTypes.number,
};

RJSFESSelector.defaultProps = {
  autofocus: false,
  label: '',
  readonly: false,
  required: false,
  value: '',
  debounceDelay: 250,
};
