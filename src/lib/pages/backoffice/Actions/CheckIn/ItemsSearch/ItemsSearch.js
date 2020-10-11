import { SearchBarILS } from '@components/SearchBar';
import { LoanListEntry } from '@modules/Loan/backoffice/LoanList/LoanListEntry';
import SearchResultsList from '@modules/SearchControls/SearchResultsList';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Header } from 'semantic-ui-react';

export default class ItemsSearch extends Component {
  executeCheckinAndClearInput = async queryString => {
    const { checkin } = this.props;
    if (queryString.trim() === '') return;
    await checkin(queryString);
  };

  render() {
    const { loans } = this.props;
    return (
      <>
        <SearchBarILS
          onSearchHandler={this.executeCheckinAndClearInput}
          placeholder="Scan physical copy barcode to check-in..."
        />

        {!_isEmpty(loans) ? (
          <>
            <Header as="h3">Choose the loan to check-in:</Header>
            <SearchResultsList
              results={loans.hits}
              ListEntryElement={LoanListEntry}
              target="_blank"
            />
          </>
        ) : null}
      </>
    );
  }
}

ItemsSearch.propTypes = {
  loans: PropTypes.object,
  checkin: PropTypes.func.isRequired,
};

ItemsSearch.defaultProps = {
  loans: null,
};
