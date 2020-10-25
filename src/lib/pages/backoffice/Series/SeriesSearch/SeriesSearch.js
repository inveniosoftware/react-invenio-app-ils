import { responseRejectInterceptor } from '@api/base';
import { seriesApi } from '@api/series/series';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
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
import { SeriesListEntry } from './SeriesListEntry';

export class SeriesSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: seriesApi.searchBaseURL,
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
        to={BackOfficeRoutes.seriesDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  render() {
    const helperFields = [
      {
        name: 'author',
        field: 'authors.full_name',
        defaultValue: '"Doe, John"',
      },
      {
        name: 'created',
        field: '_created',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState('SERIES');

    return (
      <>
        <Header as="h2">Series</Header>
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
                  placeholder="Search for series"
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Grid>
                <Grid.Row columns={2}>
                  <ResultsLoader>
                    <Grid.Column width={3} className="search-aggregations">
                      <Header content="Filter by" />
                      <SearchAggregationsCards modelName="SERIES" />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <Grid columns={2}>
                        <Grid.Column width={8}>
                          <NewButton
                            text="New series"
                            to={BackOfficeRoutes.seriesCreate}
                          />
                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                          <ExportReactSearchKitResults
                            exportBaseUrl={seriesApi.searchBaseURL}
                          />
                        </Grid.Column>
                      </Grid>
                      <EmptyResults />
                      <Error />
                      <SearchControls
                        modelName="SERIES"
                        withLayoutSwitcher={false}
                      />
                      <ResultsList ListEntryElement={SeriesListEntry} />
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
