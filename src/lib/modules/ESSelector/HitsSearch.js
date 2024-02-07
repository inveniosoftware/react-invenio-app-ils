import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Icon, Search, Input } from 'semantic-ui-react';
import { serializeError } from './serializer';

const initialState = {
  isLoading: false,
  hasError: false,
  results: [],
  query: null,
  value: '',
  open: false,
};

const ResultRenderer = ({ id, title, description, extra }) => (
  <div key={id} className="content">
    {extra && <div className="price">{extra}</div>}
    {title && <div className="title">{title}</div>}
    {description && <div className="description">{description}</div>}
  </div>
);

ResultRenderer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  extra: PropTypes.string,
};

export class HitsSearch extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = null;
    this.state = initialState;
    if (props.open !== undefined) {
      this.setState({ open: props.open });
    }
  }

  componentDidMount = () => {
    const { focus } = this.props;
    if (focus && this.searchInputRef) {
      this.searchInputRef.focus();
    }
  };

  clear = () => this.setState(initialState);

  onSelectResult = (event, { result }) => {
    const { hasError } = this.state;
    const { onSelect } = this.props;
    if (hasError) return;
    if (onSelect) {
      onSelect(result);
    }

    /* controls closing of the results list when result object marked as disabled */
    if (result.disabled) {
      this.setState({ open: true });
    } else {
      this.setState(initialState);
    }

    this.searchInputRef.focus();
  };

  debouncedSearch = debounce(async (searchQuery) => {
    const {
      serializer,
      alwaysWildcard,
      query: queryFunc,
      onResults,
    } = this.props;
    let results, hasError;
    try {
      const queryString = alwaysWildcard ? searchQuery + '*' : searchQuery;
      const response = await queryFunc(queryString);
      results = [];

      if (serializer) {
        for (let hit of response.data.hits) {
          results.push(serializer(hit));
        }
        if (onResults) {
          onResults(results);
        }
      } else {
        results = response.data.hits;
      }

      hasError = false;
    } catch (error) {
      results = [serializeError(error)];
      hasError = true;
    }

    this.setState(({ value }) =>
      value === searchQuery
        ? {
            isLoading: false,
            hasError,
            results,
          }
        : {}
    );
  }, this.props.delay);

  onSearchChange = (event, { value }) => {
    const { onSearchChange, minCharacters } = this.props;
    if (onSearchChange) {
      onSearchChange(value);
    }
    if (value.length < minCharacters) {
      this.setState({ value, open: false });
      return;
    }

    this.setState({ isLoading: true, value: value, results: [], open: true });
    this.debouncedSearch(value);
  };

  onFocus = (event, { value }) => {
    const { minCharacters } = this.props;
    if (value.length >= minCharacters) {
      this.setState({ open: true });
    }
  };

  onBlur = () => {
    this.setState({ open: false });
  };

  renderResults = ({ id, title, description, extra, ...props }) => {
    const { resultRenderer } = this.props;
    if (resultRenderer) {
      return resultRenderer({
        id,
        title,
        description,
        extra,
        ...props,
      });
    }
    return ResultRenderer({ id, title, description, extra });
  };

  renderNoResults = () => {
    const { isLoading } = this.state;
    return isLoading ? (
      <>
        <Icon loading name="circle notch" /> Loading ...
      </>
    ) : (
      'No results found.'
    );
  };

  render() {
    const { hasError, isLoading, results, value, open } = this.state;
    const {
      disabled,
      id,
      name,
      minCharacters,
      value: propsValue,
      placeholder,
      handleKeyPress,
    } = this.props;
    const { patronSelectionError } = this.context;
    return (
      <Search
        as={Input.input}
        onKeyPress={handleKeyPress}
        fluid
        disabled={disabled}
        id={id}
        name={name}
        className={hasError || patronSelectionError === 'true' ? 'error' : null}
        open={open}
        loading={isLoading}
        minCharacters={minCharacters}
        onResultSelect={this.onSelectResult}
        onSearchChange={this.onSearchChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        noResultsMessage={this.renderNoResults()}
        results={results}
        value={propsValue || value}
        resultRenderer={this.renderResults}
        placeholder={placeholder}
        input={{ ref: (element) => (this.searchInputRef = element) }}
      />
    );
  }
}

HitsSearch.propTypes = {
  alwaysWildcard: PropTypes.bool,
  delay: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  serializer: PropTypes.func,
  resultRenderer: PropTypes.func,
  onResults: PropTypes.func,
  handleKeyPress: PropTypes.func,
  onSearchChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  minCharacters: PropTypes.number,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  query: PropTypes.func.isRequired,
  focus: PropTypes.bool,
};

HitsSearch.defaultProps = {
  alwaysWildcard: true,
  minCharacters: 3,
  delay: 250,
};
