import { responseRejectInterceptor } from '@api/base';
import { loanApi } from '@api/loans';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
import history from '@history';
import { LoanListEntry } from '@modules/Loan/backoffice/LoanList/LoanListEntry';
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
import { SearchDateRange } from './SearchDateRange';

export class LoanSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: { url: loanApi.searchBaseURL, withCredentials: true },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  render() {
    const helperFields = [
      {
        name: 'patron',
        field: 'patron.name',
        defaultValue: '"Doe, John"',
      },
      {
        name: 'title',
        field: 'document.title',
        defaultValue: '"Little Prince"',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState('LOANS');

    return (
      <>
        <Header as="h2">Loans and requests</Header>
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
                  placeholder="Search for loans"
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Grid>
                <Grid.Row columns={2}>
                  <ResultsLoader>
                    <Grid.Column width={3} className="search-aggregations">
                      <Header content="Filter by" />
                      <SearchAggregationsCards modelName="LOANS" />
                      <SearchDateRange />
                    </Grid.Column>
                    <Grid.Column width={13}>
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
                        modelName="LOANS"
                        withLayoutSwitcher={false}
                      />
                      <ResultsList ListEntryElement={LoanListEntry} />
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
