import React, { Component } from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  Error,
  InvenioSearchApi,
} from 'react-searchkit';
import { responseRejectInterceptor } from '@api/base';
import { Error as IlsError } from '@components/Error';
import { SearchBar as LoansSearchBar } from '@components/SearchBar';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { loanApi } from '@api/loans';
import { BackOfficeRoutes } from '@routes/urls';
import history from '@history';
import LoanList from './LoanList';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';

import { SearchDateRange } from './SearchDateRange';

export class LoanSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: { url: loanApi.searchBaseURL, withCredentials: true },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
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

    return (
      <LoansSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for loans"
        queryHelperFields={helperFields}
      />
    );
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderEmptyResultsExtra = () => {
    return (
      <NewButton text="Add document" to={BackOfficeRoutes.documentCreate} />
    );
  };

  renderLoanList = results => {
    return <LoanList hits={results} />;
  };

  render() {
    return (
      <>
        <Header as="h2">Loans and requests</Header>

        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <Container fluid className="spaced">
            <SearchBar renderElement={this.renderSearchBar} />
          </Container>
          <Grid>
            <Grid.Row columns={2}>
              <ResultsLoader>
                <Grid.Column width={3} className="search-aggregations">
                  <Header content="Filter by" />
                  <SearchAggregationsCards modelName="loans" />
                  <SearchDateRange />
                </Grid.Column>
                <Grid.Column width={13}>
                  <SearchEmptyResults extras={this.renderEmptyResultsExtra} />
                  <Error renderElement={this.renderError} />
                  <SearchControls
                    modelName="loans"
                    withLayoutSwitcher={false}
                  />
                  <ResultsList renderElement={this.renderLoanList} />
                  <SearchFooter />
                </Grid.Column>
              </ResultsLoader>
            </Grid.Row>
          </Grid>
        </ReactSearchKit>
      </>
    );
  }
}
