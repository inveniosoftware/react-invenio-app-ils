import { responseRejectInterceptor } from '@api/base';
import { eItemApi } from '@api/eitems';
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
import { BackOfficeRoutes } from '@routes/urls';
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
import EItemListEntry from './EItemListEntry';

export class EItemSearch extends Component {
  modelName = 'EITEMS';

  searchApi = new InvenioSearchApi({
    axios: {
      url: eItemApi.searchBaseURL,
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
        to={BackOfficeRoutes.eitemDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  render() {
    const helperFields = [
      {
        name: 'title',
        field: 'document.title',
      },
      {
        name: 'author',
        field: 'authors.full_name',
        defaultValue: '"Doe, John"',
      },
      {
        name: 'created',
        field: '_created',
      },
      {
        name: 'source',
        field: 'source.text',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString =
      setReactSearchKitDefaultSortingOnEmptyQueryString(this.modelName);
    const urlHandler = setReactSearchKitUrlHandler(this.modelName);
    return (
      <>
        <Header as="h2">E-items</Header>
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
                  placeholder="Search for eitems..."
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
                            text="Add e-item"
                            to={BackOfficeRoutes.eitemCreate}
                          />
                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                          <ExportReactSearchKitResults
                            exportBaseUrl={eItemApi.searchBaseURL}
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
                            text="Add e-item"
                            to={BackOfficeRoutes.eitemCreate}
                          />
                        }
                      />
                      <ResultsList ListEntryElement={EItemListEntry} />
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
