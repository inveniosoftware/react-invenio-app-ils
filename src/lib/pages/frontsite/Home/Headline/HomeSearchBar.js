import { SearchBarILS } from '@components/SearchBar';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import React, { Component } from 'react';

export class HomeSearchBar extends Component {
  onSearchExecute = (query) => {
    const encodedQuery = encodeURIComponent(query);
    goTo(FrontSiteRoutes.documentsListWithQuery(encodedQuery));
  };

  render() {
    return (
      <SearchBarILS
        onPasteHandler={() => {}}
        onSearchHandler={this.onSearchExecute}
        placeholder={invenioConfig.APP.HOME_SEARCH_BAR_PLACEHOLDER}
        className="fs-headline"
      />
    );
  }
}
