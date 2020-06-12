import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Icon, Search } from 'semantic-ui-react';
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

  search = searchQuery => {
    const {
      serializer,
      alwaysWildcard,
      onResults,
      delay,
      query: queryFunc,
    } = this.props;

    const deb = debounce(async searchQuery => {
      try {
        const queryString = alwaysWildcard ? searchQuery + '*' : searchQuery;
        const response = await queryFunc(queryString);
        let results = [];

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

        const { value, query } = this.state;
        if (value !== query) {
          this.onSearchChange(null, { value: value });
        }

        this.setState({
          isLoading: false,
          hasError: false,
          results: results,
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          hasError: true,
          results: [serializeError(error)],
        });
      }
    }, delay);

    return deb(searchQuery);
  };

  onSearchChange = (event, { value }) => {
    const { onSearchChange, minCharacters } = this.props;
    if (onSearchChange) {
      onSearchChange(value);
    }
    if (value.length < minCharacters) {
      this.setState({ value });
      return;
    }

    this.setState({ isLoading: true, value: value, query: value, open: true });
    this.search(value);
  };

  componentDidMount() {
    if (this.searchInputRef) {
      this.searchInputRef.focus();
    }
  }

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
    } = this.props;
    const { patronSelectionError } = this.context;
    return (
      <Search
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
        noResultsMessage={this.renderNoResults()}
        results={results}
        value={propsValue || value}
        resultRenderer={this.renderResults}
        placeholder={placeholder}
        input={{ ref: element => (this.searchInputRef = element) }}
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
  onSearchChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  minCharacters: PropTypes.number,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  query: PropTypes.func.isRequired,
};

HitsSearch.defaultProps = {
  minCharacters: 3,
  delay: 250,
};
