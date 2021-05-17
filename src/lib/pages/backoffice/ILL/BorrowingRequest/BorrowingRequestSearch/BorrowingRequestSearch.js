import { borrowingRequestApi } from '@api/ill';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import {
  invenioConfig,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitInitialQueryState,
  setReactSearchKitUrlHandler,
} from '@config';
import history from '@history';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { ILLRoutes } from '@routes/urls';
import React, { Component } from 'react';
import { OverridableContext } from 'react-overridable';
import {
  EmptyResults,
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsList,
  ResultsLoader,
  SearchBar,
} from 'react-searchkit';
import { Container, Grid, Header } from 'semantic-ui-react';
import BorrowingRequestListEntry from './BorrowingRequestList/BorrowingRequestListEntry';

export class BorrowingRequestSearch extends Component {
  modelName = 'ILL_BORROWING_REQUESTS';

  searchApi = new InvenioSearchApi({
    axios: {
      url: borrowingRequestApi.searchBaseURL,
      withCredentials: true,
    },
  });

  render() {
    const helperFields = [
      {
        name: 'provider',
        field: 'provider.name',
        defaultValue: '"Dolor"',
      },
      {
        name: 'document title',
        field: 'document.title',
        defaultValue: 'Porro',
      },
      {
        name: 'patron name',
        field: 'patron.name',
        defaultValue: 'Yannic',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString =
      setReactSearchKitDefaultSortingOnEmptyQueryString(this.modelName);
    const urlHandler = setReactSearchKitUrlHandler(this.modelName);

    return (
      <>
        <Header as="h2">Borrowing Requests</Header>
        <OverridableContext.Provider
          value={{
            ...SearchControlsOverridesMap,
          }}
        >
          <ReactSearchKit
            searchApi={this.searchApi}
            history={history}
            urlHandlerApi={urlHandler}
            initialQueryState={initialState}
            defaultSortingOnEmptyQueryString={defaultSortingOnEmptyQueryString}
          >
            <>
              <Container fluid className="spaced">
                <SearchBar
                  placeholder="Search for borrowing requests..."
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Container fluid className="bo-search-body">
                <Grid>
                  <Grid.Row columns={2}>
                    <ResultsLoader>
                      <Grid.Column width={3} className="search-aggregations">
                        <Header content="Filter by" />
                        <SearchAggregationsCards modelName={this.modelName} />
                      </Grid.Column>
                      <Grid.Column width={13}>
                        <Grid columns={2}>
                          <Grid.Column width={8}>
                            <NewButton
                              text="Create new borrowing request"
                              to={ILLRoutes.borrowingRequestCreate}
                            />
                          </Grid.Column>
                          <Grid.Column width={8} textAlign="right">
                            <ExportReactSearchKitResults
                              exportBaseUrl={borrowingRequestApi.searchBaseURL}
                            />
                          </Grid.Column>
                        </Grid>
                        <EmptyResults
                          extraContent={
                            <NewButton
                              text="Create new request"
                              to={ILLRoutes.borrowingRequestCreate}
                            />
                          }
                        />
                        <Error />
                        <SearchControls
                          modelName={this.modelName}
                          withLayoutSwitcher={false}
                        />
                        <ResultsList
                          ListEntryElement={BorrowingRequestListEntry}
                        />
                        <SearchFooter />
                      </Grid.Column>
                    </ResultsLoader>
                  </Grid.Row>
                </Grid>
              </Container>
            </>
          </ReactSearchKit>
        </OverridableContext.Provider>
      </>
    );
  }
}
