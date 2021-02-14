import { withCancel } from '@api/utils';
import _debounce from 'lodash/debounce';
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
    const { options, required } = this.props;
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
      const results = response.data.hits.map((hit) =>
        apiQueryResponseSerializer(hit)
      );

      if (!required) {
        // add an empty element at the beginning so that if it is not required, you can select nothing
        results.unshift({ key: '', value: undefined, text: '' });
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
    this.setState({ value: value });
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
    } = this.props;
    const { options, isLoading, value, error } = this.state;
    return (
      <Form.Select
        fluid
        selection
        search
        options={options}
        label={label}
        value={value}
        required={required}
        autoFocus={autofocus}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={this.handleChange}
        onSearchChange={_debounce(this.handleSearchChange, debounceDelay)}
        disabled={isLoading}
        loading={isLoading}
        noResultsMessage={error ? error : 'No results found'}
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
