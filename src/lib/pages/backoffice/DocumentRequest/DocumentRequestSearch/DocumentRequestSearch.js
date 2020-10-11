import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { DocumentRequestListEntry } from './DocumentRequestListEntry';
import { OverridableContext } from 'react-overridable';
import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  Error,
  InvenioSearchApi,
  EmptyResults,
} from 'react-searchkit';
import { documentRequestApi } from '@api/documentRequests';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import history from '@history';
import { responseRejectInterceptor } from '@api/base';

export class DocumentRequestSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: documentRequestApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  render() {
    const helperFields = [
      {
        name: 'document PID',
        field: 'document_pid',
        defaultValue: '1',
      },
      {
        name: 'title',
        field: 'title',
        defaultValue: 'Harry Potter',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState(
      'DOCUMENT_REQUESTS'
    );

    return (
      <>
        <Header as="h2">Requests for new literature</Header>
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
                  placeholder="Search for document requests"
                  {...invenioConfig.APP.searchBarRSKProps}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Grid>
                <Grid.Row columns={2}>
                  <ResultsLoader>
                    <Grid.Column width={3} className="search-aggregations">
                      <Header content="Filter by" />
                      <SearchAggregationsCards modelName="DOCUMENT_REQUESTS" />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <Grid columns={2}>
                        <Grid.Column width={8} />
                        <Grid.Column width={8} textAlign="right">
                          <ExportReactSearchKitResults
                            exportBaseUrl={documentRequestApi.searchBaseURL}
                          />
                        </Grid.Column>
                      </Grid>
                      <EmptyResults />
                      <Error />
                      <SearchControls
                        modelName="DOCUMENT_REQUESTS"
                        withLayoutSwitcher={false}
                      />
                      <ResultsList
                        ListEntryElement={DocumentRequestListEntry}
                      />
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
