import { LoanListEntry } from '@modules/Loan/backoffice/LoanList/LoanListEntry';
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
  EmptyResults,
  InvenioSearchApi,
} from 'react-searchkit';
import { responseRejectInterceptor } from '@api/base';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { loanApi } from '@api/loans';
import { BackOfficeRoutes } from '@routes/urls';
import history from '@history';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { setReactSearchKitInitialQueryState } from '@config';
import { SearchDateRange } from './SearchDateRange';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { invenioConfig } from '@config';

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
                  {...invenioConfig.APP.searchBarRSKProps}
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
