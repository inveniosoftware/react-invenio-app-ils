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
      queryString,
      updateQueryString,
      placeholder,
      queryHelperFields,
      buttonColor,
      onKeyPressHandler,
      updateQueryOnChange,
      ...otherProps
    } = this.props;
    const { currentValue } = this.state;
    return (
      <>
        <Input
          action={{
            color: buttonColor,
            icon: 'search',
            onClick: this.executeSearch,
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
            currentQueryString={queryString}
            updateQueryString={this.onInputChange}
          />
        )}
      </>
    );
  }
}

SearchBar.propTypes = {
  queryString: PropTypes.string,
  updateQueryString: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  queryHelperFields: PropTypes.array,
  buttonColor: PropTypes.string,
  updateQueryOnChange: PropTypes.bool,
  onKeyPressHandler: PropTypes.func,
};

SearchBar.defaultProps = {
  queryString: '',
  updateQueryOnChange: false,
  queryHelperFields: [],
  buttonColor: null,
  placeholder: 'Search for books, series, articles, publications...',
  onKeyPressHandler: null,
};

export default SearchBar;
