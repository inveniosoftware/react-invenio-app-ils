import { ItemListEntry } from '@modules/Items/backoffice';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import React, { Component } from 'react';
import { OverridableContext } from 'react-overridable';
import { Grid, Header, Container } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  Error,
  InvenioSearchApi,
  EmptyResults,
} from 'react-searchkit';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
import { Error as IlsError } from '@components/Error';
import { itemApi } from '@api/items';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { BackOfficeRoutes } from '@routes/urls';
import history from '@history';
import { responseRejectInterceptor } from '@api/base';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';

export class ItemSearch extends Component {
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

    const initialState = setReactSearchKitInitialQueryState('ITEMS');

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
            initialQueryState={initialState}
          >
            <>
              <Container fluid className="spaced">
                <SearchBar
                  placeholder="Search for physical copies..."
                  {...invenioConfig.APP.searchBarRSKProps}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>

              <Container fluid className="bo-search-body">
                <Grid>
                  <Grid.Row columns={2}>
                    <ResultsLoader>
                      <Grid.Column width={3} className="search-aggregations">
                        <Header content="Filter by" />
                        <SearchAggregationsCards modelName="ITEMS" />
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
                          modelName="ITEMS"
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
