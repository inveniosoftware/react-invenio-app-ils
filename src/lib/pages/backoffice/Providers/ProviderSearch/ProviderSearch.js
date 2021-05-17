import { responseRejectInterceptor } from '@api/base';
import { providerApi } from '@api/providers';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import {
  invenioConfig,
  setReactSearchKitInitialQueryState,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitUrlHandler,
} from '@config';
import history from '@history';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { ProviderRoutes } from '@routes/urls';
import React, { Component } from 'react';
import { OverridableContext } from 'react-overridable';
import { Link } from 'react-router-dom';
import {
  EmptyResults,
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsList,
  ResultsLoader,
  SearchBar,
} from 'react-searchkit';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import ProviderListEntry from './ProviderListEntry';

export class ProviderSearch extends Component {
  modelName = 'PROVIDERS';

  searchApi = new InvenioSearchApi({
    axios: {
      url: providerApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={ProviderRoutes.providerDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  render() {
    const helperFields = [
      {
        name: 'name',
        field: 'name',
        defaultValue: 'Safari',
      },
      {
        name: 'email',
        field: 'email',
        defaultValue: 'library@test.ch',
      },
      {
        name: 'created',
        field: '_created',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString =
      setReactSearchKitDefaultSortingOnEmptyQueryString(this.modelName);
    const urlHandler = setReactSearchKitUrlHandler(this.modelName);
    return (
      <>
        <Header as="h2">Providers</Header>
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
                  placeholder="Search for providers..."
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
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
                            text="Add provider"
                            to={ProviderRoutes.providerCreate}
                          />
                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                          <ExportReactSearchKitResults
                            exportBaseUrl={providerApi.searchBaseURL}
                          />
                        </Grid.Column>
                      </Grid>
                      <Error />
                      <SearchControls
                        modelName={this.modelName}
                        withLayoutSwitcher={false}
                      />
                      <EmptyResults
                        extraContent={
                          <NewButton
                            text="Add provider"
                            to={ProviderRoutes.providerCreate}
                          />
                        }
                      />
                      <ResultsList ListEntryElement={ProviderListEntry} />
                      <SearchFooter />
                    </Grid.Column>
                  </ResultsLoader>
                </Grid.Row>
              </Grid>
            </>
          </ReactSearchKit>
        </OverridableContext.Provider>
      </>
    );
  }
}
