import { SearchAggregationsCards } from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchEmptyResults } from '@modules/SearchControls/SearchEmptyResults';
import { SearchFooter } from '@modules/SearchControls/SearchFooter';
import DocumentRequestList from './DocumentRequestList';
import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  Error,
  InvenioSearchApi,
} from 'react-searchkit';
import { Error as IlsError } from '@components/Error';
import { SearchBar as DocumentRequestsSearchBar } from '@components/SearchBar';
import { documentRequestApi } from '@api/documentRequests';
import { getSearchConfig } from '@config';
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

  searchConfig = getSearchConfig('documentRequests');

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
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
    return (
      <DocumentRequestsSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for document requests"
        queryHelperFields={helperFields}
      />
    );
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderResultsList = results => {
    return <DocumentRequestList hits={results} />;
  };

  render() {
    return (
      <>
        <Header as="h2">Requests for new literature</Header>

        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <Container fluid className="spaced">
            <SearchBar renderElement={this.renderSearchBar} />
          </Container>
          <Grid>
            <Grid.Row columns={2}>
              <ResultsLoader>
                <Grid.Column width={3} className="search-aggregations">
                  <Header content="Filter by" />
                  <SearchAggregationsCards modelName="documentRequests" />
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
                  <SearchEmptyResults />
                  <Error renderElement={this.renderError} />
                  <SearchControls
                    modelName="documentRequests"
                    withLayoutSwitcher={false}
                  />
                  <ResultsList renderElement={this.renderResultsList} />
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
