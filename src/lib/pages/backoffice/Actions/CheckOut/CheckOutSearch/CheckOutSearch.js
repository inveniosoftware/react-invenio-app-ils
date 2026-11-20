/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { SearchBarILS } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CheckOutSearch extends Component {
  constructor(props) {
    super(props);
    this.searchBarRef = React.createRef();
  }

  executeCheckoutAndClearInput = async (query) => {
    const { checkOutSearch } = this.props;
    if (query.trim() === '') return;
    await checkOutSearch(query, this.searchBarRef.current.clearQueryString);
  };

  render() {
    return (
      <SearchBarILS
        id="checkout-searchbar"
        onSearchHandler={this.executeCheckoutAndClearInput}
        placeholder="Insert patron id/email or scan physical copy barcodes to add them to the check-out list..."
        ref={this.searchBarRef}
      />
    );
  }
}

CheckOutSearch.propTypes = {
  checkOutSearch: PropTypes.func.isRequired,
};
