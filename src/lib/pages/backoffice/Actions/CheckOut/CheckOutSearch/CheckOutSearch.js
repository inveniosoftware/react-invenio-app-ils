import { SearchBar } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CheckOutSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { queryString: '' };
  }

  onInputChange = queryString => {
    this.setState({
      queryString: queryString,
    });
  };

  executeCheckoutAndClearInput = async query => {
    const { checkOutSearch } = this.props;
    if (query.trim() === '') return;
    await checkOutSearch(query);
    this.setState({ queryString: '' });
  };

  onPasteHandler = async event => {
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    this.executeCheckoutAndClearInput(queryString);
  };

  onKeyPressHandler = event => {
    const { queryString } = this.state;
    if (event.key === 'Enter') {
      this.executeCheckoutAndClearInput(queryString);
    }
  };

  render() {
    const { queryString } = this.state;
    return (
      <SearchBar
        action={{
          icon: 'search',
          onClick: () => this.executeCheckoutAndClearInput(queryString),
        }}
        queryString={queryString}
        onChange={(e, { value }) => this.onInputChange(value)}
        updateQueryString={this.executeCheckoutAndClearInput}
        placeholder="Insert patron id/email or physical copy barcode to start check-out..."
        onPaste={this.onPasteHandler}
        value={queryString}
        onKeyPress={event => this.onKeyPressHandler(event)}
      />
    );
  }
}

CheckOutSearch.propTypes = {
  checkOutSearch: PropTypes.func.isRequired,
};
