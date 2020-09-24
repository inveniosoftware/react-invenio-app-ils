import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { QueryBuildHelper } from './QueryBuildHelper';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { queryString } = this.props;
    this.state = {
      currentValue: queryString || '',
    };
  }

  componentDidMount() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  onInputChange = queryString => {
    const { updateQueryOnChange, updateQueryString } = this.props;
    if (updateQueryOnChange) {
      updateQueryString(queryString);
    }
    this.setState({
      currentValue: queryString,
    });
  };

  onKeyPressHandler = event => {
    if (event.key === 'Enter') {
      this.executeSearch();
    }
  };

  executeSearch = () => {
    const { updateQueryString } = this.props;
    const { currentValue } = this.state;
    updateQueryString(currentValue);
  };

  render() {
    const {
      buttonColor,
      currentQueryString,
      executeSearch: parentSearch,
      onKeyPressHandler,
      placeholder,
      queryHelperFields,
      queryString,
      updateQueryOnChange,
      updateQueryString,
      ...otherProps
    } = this.props;
    const { currentValue } = this.state;
    return (
      <>
        <Input
          action={{
            color: buttonColor,
            icon: 'search',
            onClick: parentSearch || this.executeSearch,
          }}
          size="big"
          fluid
          placeholder={placeholder}
          onChange={(e, { value }) => this.onInputChange(value)}
          value={currentValue}
          onKeyPress={event =>
            onKeyPressHandler
              ? onKeyPressHandler(event)
              : this.onKeyPressHandler(event)
          }
          ref={input => {
            this.searchInput = input;
          }}
          {...otherProps}
          className={`${otherProps.className} ils-searchbar`}
        />
        {queryHelperFields.length > 0 && (
          <QueryBuildHelper
            fields={queryHelperFields}
            currentQueryString={currentQueryString || queryString}
            updateQueryString={this.onInputChange}
          />
        )}
      </>
    );
  }
}

SearchBar.propTypes = {
  buttonColor: PropTypes.string,
  executeSearch: PropTypes.func,
  currentQueryString: PropTypes.string,
  onKeyPressHandler: PropTypes.func,
  placeholder: PropTypes.string,
  queryHelperFields: PropTypes.array,
  queryString: PropTypes.string,
  updateQueryOnChange: PropTypes.bool,
  updateQueryString: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  buttonColor: null,
  currentQueryString: null,
  executeSearch: null,
  onKeyPressHandler: null,
  placeholder: 'Search for books, series, articles, publications...',
  queryHelperFields: [],
  queryString: '',
  updateQueryOnChange: false,
};

export default SearchBar;
