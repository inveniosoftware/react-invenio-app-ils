import { responseRejectInterceptor } from '@api/base';
import { patronApi } from '@api/patrons';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
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
import { PatronResultsList } from './PatronResultsList';

export class PatronSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: patronApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  render() {
    const helperFields = [
      {
        name: 'name',
        field: 'name',
        defaultValue: '"Doe, John"',
      },
      {
        name: 'e-mail',
        field: 'email',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState('PATRONS');

    return (
      <>
        <Header as="h2">Patrons</Header>
        <OverridableContext.Provider
          value={{
            ...SearchControlsOverridesMap,
            ResultsList: PatronResultsList,
          }}
        >
          <ReactSearchKit
            searchApi={this.searchApi}
            initialQueryState={initialState}
          >
            <>
              <Container fluid className="spaced">
                <SearchBar
                  placeholder="Search for patrons"
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Grid>
                <Grid.Row columns={2}>
                  <ResultsLoader>
                    <Grid.Column width={3}>
                      <Header content="Filter by" />
                      <SearchAggregationsCards modelName="PATRONS" />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <Grid columns={1}>
                        <Grid.Column textAlign="right">
                          <ExportReactSearchKitResults
                            exportBaseUrl={patronApi.searchBaseURL}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Error />
                          <SearchControls
                            modelName="PATRONS"
                            withLayoutSwitcher={false}
                          />
                          <ResultsList
                            renderEmptyResultsElement={() => <EmptyResults />}
                          />
                          <SearchFooter />
                        </Grid.Column>
                      </Grid>
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
