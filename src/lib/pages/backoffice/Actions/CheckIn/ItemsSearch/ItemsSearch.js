import { SearchBar } from '@components/SearchBar';
import { LoanListEntry } from '@modules/Loan/backoffice/LoanList/LoanListEntry';
import SearchResultsList from '@modules/SearchControls/SearchResultsList';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Header } from 'semantic-ui-react';

export default class ItemsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { queryString: '' };
  }

  onInputChange = queryString => {
    this.setState({
      queryString: queryString,
    });
  };

  executeCheckinAndClearInput = async queryString => {
    const { checkin } = this.props;
    if (queryString.trim() === '') return;
    await checkin(queryString);
    this.setState({ queryString: '' });
  };

  onPasteHandler = event => {
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    this.executeCheckinAndClearInput(queryString);
  };

  onKeyPressHandler = event => {
    const { queryString } = this.state;
    if (event.key === 'Enter') {
      this.executeCheckinAndClearInput(queryString);
    }
  };

  render() {
    const { loans } = this.props;
    const { queryString } = this.state;
    return (
      <>
        <SearchBar
          action={{
            icon: 'search',
            onClick: () => this.executeCheckinAndClearInput(queryString),
          }}
          queryString={queryString}
          updateQueryString={this.executeCheckinAndClearInput}
          placeholder="Scan physical copy barcode to check-in..."
          onPaste={this.onPasteHandler}
          onChange={(e, { value }) => this.onInputChange(value)}
          value={queryString}
          onKeyPress={event => this.onKeyPressHandler(event)}
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
