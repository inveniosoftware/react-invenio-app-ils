import { withCancel } from '@api/utils';
import _debounce from 'lodash/debounce';
import _find from 'lodash/find';
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
      const singleOption = apiGetByValueResponseSerializer(
        response.data,
        value
      );

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

  clearValue() {
    // similar to the `clearable` prop
    // can be called by wrapper components
    this.handleChange(null, { value: undefined });
  }

  handleChange = (e, { options, value }) => {
    const { onChange } = this.props;
    // if empty string, set it to `undefined` as needed by RJSF
    const newValue = value || undefined;

    const newOptions = [];
    if (newValue) {
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
      disabled,
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
        clearable
        options={options}
        label={label}
        value={value}
        multiple={selectMultiple || false}
        required={required}
        autoFocus={autofocus}
        disabled={disabled || readonly}
        placeholder={placeholder}
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
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
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
  disabled: false,
  label: '',
  placeholder: 'Type to search...',
  readonly: false,
  required: false,
  value: '',
  debounceDelay: 250,
};
