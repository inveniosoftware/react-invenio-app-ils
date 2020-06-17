import { responseRejectInterceptor } from '@api/base';
import { literatureApi } from '@api/literature/literature';
import { Error as IlsError } from '@components/Error';
import { SearchBar as DocumentsSearchBar } from '@components/SearchBar';
import history from '@history';
import LiteratureSearchResultsGrid from '@modules/Literature/LiteratureSearchResultsGrid';
import LiteratureSearchResultsList from '@modules/Literature/LiteratureSearchResultsList';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import {
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsLoader,
  ResultsMultiLayout,
  SearchBar,
} from 'react-searchkit';
import { Container, Grid, Header, Loader, Responsive } from 'semantic-ui-react';
import LiteratureSearchMobile from './LiteratureSearchMobile';
import SearchMessage from './SearchMessage/SearchMessage';

class LiteratureSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: literatureApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    return (
      <DocumentsSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for books, series, articles, publications..."
      />
    );
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderLoader = () => {
    return (
      <Loader active size="huge" inline="centered" className="full-height" />
    );
  };

  render() {
    return (
      <ReactSearchKit searchApi={this.searchApi} history={history}>
        <Overridable id="LiteratureSearch.layout">
          <>
            <Container fluid className="literature-search-container">
              <Container>
                <SearchBar renderElement={this.renderSearchBar} />
              </Container>
            </Container>
            <Responsive minWidth={Responsive.onlyComputer.minWidth}>
              <Container fluid className="fs-search-body">
                <Grid
                  columns={2}
                  stackable
                  relaxed
                  className="grid-documents-search"
                >
                  <ResultsLoader renderElement={this.renderLoader}>
                    <Grid.Column width={3} className="search-aggregations">
                      <Header content="Filter by" />
                      <SearchAggregationsCards modelName="documents" />
                    </Grid.Column>
                    <Grid.Column width={13} className="search-results">
                      <SearchEmptyResults />
                      <Error renderElement={this.renderError} />
                      <SearchControls modelName="documents" />
                      <ResultsMultiLayout
                        resultsListCmp={() => <LiteratureSearchResultsList />}
                        resultsGridCmp={() => <LiteratureSearchResultsGrid />}
                      />
                      <Container fluid className="search-results-footer">
                        <SearchFooter />
                        <Container className="search-results-message">
                          <SearchMessage />
                        </Container>
                      </Container>
                    </Grid.Column>
                  </ResultsLoader>
                </Grid>
              </Container>
            </Responsive>
            <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
              <LiteratureSearchMobile />
            </Responsive>
          </>
        </Overridable>
      </ReactSearchKit>
    );
  }
}

export default Overridable.component('LiteratureSearch', LiteratureSearch);
