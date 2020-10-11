import { SearchBarILS } from '@components/SearchBar';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import React, { Component } from 'react';

export class HomeSearchBar extends Component {
  onSearchExecute = query => {
    const encodedQuery = encodeURIComponent(query);
    goTo(FrontSiteRoutes.documentsListWithQuery(encodedQuery));
  };

  render() {
    return (
      <SearchBarILS
        onSearchHandler={this.onSearchExecute}
        placeholder="Search for books, e-books, series, articles, publications..."
        className="fs-headline"
      />
    );
  }
}
