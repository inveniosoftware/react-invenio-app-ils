import { SearchBar } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CheckOutSearch extends Component {
  onInputChange = queryString => {
    const { updateQueryString } = this.props;
    updateQueryString(queryString);
  };

  executeSearchAndClearInput = async query => {
    const { checkOutSearch, queryString, clearSearch } = this.props;
    query = query || queryString;
    if (query.trim() === '') return;
    await checkOutSearch(query);
    clearSearch();
  };

  onPasteHandler = async event => {
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    this.executeSearchAndClearInput(queryString);
  };

  render() {
    const { queryString } = this.props;
    return (
      <SearchBar
        action={{
          icon: 'search',
          onClick: this.executeSearchAndClearInput,
        }}
        currentQueryString={queryString}
        onInputChange={this.onInputChange}
        executeSearch={this.executeSearchAndClearInput}
        placeholder="Insert patron id/email or physical copy barcode to start check-out..."
        onPaste={this.onPasteHandler}
      />
    );
  }
}

CheckOutSearch.propTypes = {
  updateQueryString: PropTypes.func.isRequired,
  queryString: PropTypes.string.isRequired,
  checkOutSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};
