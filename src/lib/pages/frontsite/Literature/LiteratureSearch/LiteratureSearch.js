import { responseRejectInterceptor } from '@api/base';
import { literatureApi } from '@api/literature/literature';
import { Media } from '@components/Media';
import {
  invenioConfig,
  setReactSearchKitInitialQueryState,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitUrlHandler,
} from '@config';
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
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import LiteratureSearchMobile from './LiteratureSearchMobile';
import SearchMessage from './SearchMessage/SearchMessage';

class LiteratureSearch extends Component {
  modelName = 'LITERATURE';

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
    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString = setReactSearchKitDefaultSortingOnEmptyQueryString(
      this.modelName
    );
    const urlHandler = setReactSearchKitUrlHandler(this.modelName);

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
          urlHandlerApi={urlHandler}
          overridableId="LiteratureSearchOverridable"
          initialQueryState={initialState}
          defaultSortingOnEmptyQueryString={defaultSortingOnEmptyQueryString}
        >
          <Overridable id="LiteratureSearch.layout">
            <>
              <Container fluid className="literature-search-container">
                <Container>
                  <SearchBar
                    placeholder={invenioConfig.APP.HOME_SEARCH_BAR_PLACEHOLDER}
                    {...invenioConfig.APP.SEARCH_BAR_PROPS}
                  />
                </Container>
              </Container>
              <Media greaterThanOrEqual="computer">
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
                        <SearchAggregationsCards modelName={this.modelName} />
                      </Grid.Column>
                      <Grid.Column width={13} className="search-results">
                        <EmptyResults />
                        <Error />
                        <SearchControls modelName={this.modelName} />
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
              </Media>
              <Media lessThan="computer">
                <LiteratureSearchMobile />
              </Media>
            </>
          </Overridable>
        </ReactSearchKit>
      </OverridableContext.Provider>
    );
  }
}

export default Overridable.component('LiteratureSearch', LiteratureSearch);
