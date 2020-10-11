import { responseRejectInterceptor } from '@api/base';
import { literatureApi } from '@api/literature/literature';
import history from '@history';
import { LiteratureSearchOverridesMap } from '@modules/Literature/LiteratureSearchOverrides';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import React, { Component } from 'react';
import Overridable, { OverridableContext } from 'react-overridable';
import {
  EmptyResults,
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
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';

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

  renderLoader = () => {
    return (
      <Loader active size="huge" inline="centered" className="full-height" />
    );
  };

  render() {
    const initialState = setReactSearchKitInitialQueryState('LITERATURE');

    return (
      <OverridableContext.Provider
        value={{
          ...SearchControlsOverridesMap,
          ...LiteratureSearchOverridesMap,
        }}
      >
        <ReactSearchKit
          searchApi={this.searchApi}
          history={history}
          overridableId="LiteratureSearchOverridable"
          initialQueryState={initialState}
        >
          <Overridable id="LiteratureSearch.layout">
            <>
              <Container fluid className="literature-search-container">
                <Container>
                  <SearchBar
                    placeholder="Search for books, series, articles, publications..."
                    {...invenioConfig.APP.searchBarRSKProps}
                  />
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
                        <SearchAggregationsCards modelName="LITERATURE" />
                      </Grid.Column>
                      <Grid.Column width={13} className="search-results">
                        <EmptyResults />
                        <Error />
                        <SearchControls modelName="LITERATURE" />
                        <ResultsMultiLayout />
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
      </OverridableContext.Provider>
    );
  }
}

export default Overridable.component('LiteratureSearch', LiteratureSearch);
