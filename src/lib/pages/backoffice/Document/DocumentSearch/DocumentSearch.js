import { DocumentListEntry } from '@modules/Document/backoffice/DocumentList';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import React, { Component } from 'react';
import { OverridableContext } from 'react-overridable';
import { Container, Grid, Header } from 'semantic-ui-react';
import {
  Error,
  ResultsList,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
  InvenioSearchApi,
  EmptyResults,
} from 'react-searchkit';
import { documentApi } from '@api/documents';
import { setReactSearchKitInitialQueryState } from '@config';
import { BackOfficeRoutes } from '@routes/urls';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { invenioConfig } from '@config';
import history from '@history';

export class DocumentSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: documentApi.searchBaseURL,
      withCredentials: true,
    },
  });

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
      {
        name: 'published',
        field: 'imprint.date',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState('DOCUMENTS');

    return (
      <>
        <Header as="h2">Documents</Header>
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
                  placeholder="Search for documents..."
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
                        <SearchAggregationsCards modelName="DOCUMENTS" />
                      </Grid.Column>
                      <Grid.Column width={13}>
                        <Grid columns={2}>
                          <Grid.Column width={8}>
                            <NewButton
                              text="Add document"
                              to={BackOfficeRoutes.documentCreate}
                            />
                          </Grid.Column>
                          <Grid.Column width={8} textAlign="right">
                            <ExportReactSearchKitResults
                              exportBaseUrl={documentApi.searchBaseURL}
                            />
                          </Grid.Column>
                        </Grid>
                        <EmptyResults
                          extraContent={
                            <NewButton
                              text="Add document"
                              to={BackOfficeRoutes.documentCreate}
                            />
                          }
                        />
                        <Error />
                        <SearchControls
                          modelName="DOCUMENTS"
                          withLayoutSwitcher={false}
                        />
                        <ResultsList ListEntryElement={DocumentListEntry} />
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
