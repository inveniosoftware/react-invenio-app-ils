import { SearchBar } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { LoanList } from '@modules/Loan/backoffice/LoanList';
import { Header } from 'semantic-ui-react';

export default class ItemsSearch extends Component {
  onInputChange = queryString => {
    const { updateQueryString } = this.props;
    updateQueryString(queryString);
  };

  executeSearchAndClearInput = async queryString => {
    const {
      queryString: propsQueryString,
      checkin,
      clearSearchBar,
    } = this.props;
    queryString = queryString || propsQueryString;
    if (queryString.trim() === '') return;
    await checkin(queryString);
    clearSearchBar();
  };

  onPasteHandler = async event => {
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    this.executeSearchAndClearInput(queryString);
  };

  onSearchClickHandler = () => {
    this.executeSearchAndClearInput();
  };

  onKeyPressHandler = () => {
    this.executeSearchAndClearInput();
  };

  render() {
    const { queryString, loans } = this.props;
    return (
      <>
        <SearchBar
          action={{
            icon: 'search',
            onClick: this.onSearchClickHandler,
          }}
          currentQueryString={queryString}
          onInputChange={this.onInputChange}
          executeSearch={this.onKeyPressHandler}
          placeholder="Scan physical copy barcode to check-in..."
          onPaste={this.onPasteHandler}
        />

        {!_isEmpty(loans) ? (
          <>
            <Header as="h3">Choose the loan to check-in:</Header>
            <LoanList target="_blank" hits={loans.hits} />
          </>
        ) : null}
      </>
    );
  }
}

ItemsSearch.propTypes = {
  updateQueryString: PropTypes.func.isRequired,
  queryString: PropTypes.string.isRequired,
  loans: PropTypes.object,
  checkin: PropTypes.func.isRequired,
  clearSearchBar: PropTypes.func.isRequired,
};

ItemsSearch.defaultProps = {
  loans: null,
};
