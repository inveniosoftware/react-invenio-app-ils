import { libraryApi } from '@api/ill';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import history from '@history';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { ILLRoutes } from '@routes/urls';
import { LibraryListEntry } from './LibraryList';
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
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';

export class LibrarySearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: libraryApi.searchBaseURL,
      withCredentials: true,
    },
  });

  render() {
    const helperFields = [
      {
        name: 'name',
        field: 'name',
        defaultValue: '"Test library"',
      },
      {
        name: 'email',
        field: 'email',
        defaultValue: '"info@library.com"',
      },
      {
        name: 'address',
        field: 'address',
        defaultValue: '"Geneva"',
      },
    ];
    const initialState = setReactSearchKitInitialQueryState('ILL_LIBRARIES');

    return (
      <>
        <Header as="h2">Libraries</Header>
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
                  placeholder="Search for libaries..."
                  {...invenioConfig.APP.searchBarRSKProps}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Container fluid className="bo-search-body">
                <Grid>
                  <Grid.Row columns={2}>
                    <ResultsLoader>
                      <Grid.Column width={16}>
                        <Grid columns={2}>
                          <Grid.Column width={8}>
                            <NewButton
                              text="Add library"
                              to={ILLRoutes.libraryCreate}
                            />
                          </Grid.Column>
                          <Grid.Column width={8} textAlign="right">
                            <ExportReactSearchKitResults
                              exportBaseUrl={libraryApi.searchBaseURL}
                            />
                          </Grid.Column>
                        </Grid>
                        <EmptyResults
                          extraContent={
                            <NewButton
                              text="Add library"
                              to={ILLRoutes.libraryCreate}
                            />
                          }
                        />
                        <Error />
                        <SearchControls
                          modelName="ILL_LIBRARIES"
                          withLayoutSwitcher={false}
                        />
                        <ResultsList ListEntryElement={LibraryListEntry} />
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
