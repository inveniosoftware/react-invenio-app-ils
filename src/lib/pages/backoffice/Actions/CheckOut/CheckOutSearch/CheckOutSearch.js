import { SearchBarILS } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CheckOutSearch extends Component {
  executeCheckoutAndClearInput = async query => {
    const { checkOutSearch } = this.props;
    if (query.trim() === '') return;
    await checkOutSearch(query);
  };

  render() {
    return (
      <SearchBarILS
        onSearchHandler={this.executeCheckoutAndClearInput}
        placeholder="Insert patron id/email or physical copy barcode to start check-out..."
      />
    );
  }
}

CheckOutSearch.propTypes = {
  checkOutSearch: PropTypes.func.isRequired,
};
