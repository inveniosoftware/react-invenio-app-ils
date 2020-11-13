import { responseRejectInterceptor } from '@api/base';
import { itemApi } from '@api/items';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { Error as IlsError } from '@components/Error';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import {
  invenioConfig,
  setReactSearchKitInitialQueryState,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitUrlHandler,
} from '@config';
import history from '@history';
import { ItemListEntry } from '@modules/Items/backoffice';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { BackOfficeRoutes } from '@routes/urls';
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

export class ItemSearch extends Component {
  modelName = 'ITEMS';

  searchApi = new InvenioSearchApi({
    axios: {
      url: itemApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  renderError = error => {
    return <IlsError error={error} />;
  };

  render() {
    const helperFields = [
      {
        name: 'Barcode',
        field: 'barcode',
        defaultValue: '"1234567"',
      },
      {
        name: 'ISBN',
        field: 'isbn',
        defaultValue: '"1234567"',
      },
      {
        name: 'Shelf',
        field: 'shelf',
        defaultValue: '"Cw-Ax-Bs"',
      },
      {
        name: 'created',
        field: '_created',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString = setReactSearchKitDefaultSortingOnEmptyQueryString(
      this.modelName
    );
    const urlHandler = setReactSearchKitUrlHandler(this.modelName);
    return (
      <>
        <Header as="h2">Physical copies</Header>
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
                  placeholder="Search for physical copies..."
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
                              text="Add physical copy"
                              to={BackOfficeRoutes.itemCreate}
                            />
                          </Grid.Column>
                          <Grid.Column width={8} textAlign="right">
                            <ExportReactSearchKitResults
                              exportBaseUrl={itemApi.searchBaseURL}
                            />
                          </Grid.Column>
                        </Grid>
                        <EmptyResults
                          extraContent={
                            <NewButton
                              text="Add item"
                              to={BackOfficeRoutes.itemCreate}
                            />
                          }
                        />
                        <Error />
                        <SearchControls
                          modelName={this.modelName}
                          withLayoutSwitcher={false}
                        />
                        <ResultsList ListEntryElement={ItemListEntry} />
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
