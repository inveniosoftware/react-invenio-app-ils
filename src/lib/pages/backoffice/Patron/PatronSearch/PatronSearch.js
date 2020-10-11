import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { PatronResultsList } from './PatronResultsList';
import React, { Component } from 'react';
import { OverridableContext } from 'react-overridable';
import { Grid, Container, Header } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  Error,
  EmptyResults,
  InvenioSearchApi,
} from 'react-searchkit';
import { patronApi } from '@api/patrons';
import { responseRejectInterceptor } from '@api/base';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';

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
                  {...invenioConfig.APP.searchBarRSKProps}
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
