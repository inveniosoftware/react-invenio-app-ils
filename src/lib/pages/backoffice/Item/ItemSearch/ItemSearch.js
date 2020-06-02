import React, { Component } from 'react';
import { Grid, Item, Header, Container } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  Error,
  InvenioSearchApi,
} from 'react-searchkit';
import { getSearchConfig } from '@config';
import { Error as IlsError } from '@components/Error';
import { SearchBar as ItemsSearchBar } from '@components/SearchBar';
import { itemApi } from '@api/items';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { BackOfficeRoutes } from '@routes/urls';
import { ItemListEntry } from './ItemListEntry';
import history from '@history';
import { responseRejectInterceptor } from '@api/base';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { SearchControls } from '@modules/SearchControls/SearchControls';

export class ItemSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: itemApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });
  searchConfig = getSearchConfig('items');

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    const helperFields = [
      {
        name: 'Barcode',
        field: 'barcode',
        defaultValue: '"1234567"',
      },
      {
        name: 'ISBN',
        field: 'isbn',
        defaultValue: '"1234567"',
      },
      {
        name: 'Shelf',
        field: 'shelf',
        defaultValue: '"Cw-Ax-Bs"',
      },
      {
        name: 'created',
        field: '_created',
      },
    ];
    return (
      <ItemsSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for physical copies..."
        queryHelperFields={helperFields}
      />
    );
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderItemList = results => {
    const entries = results.map(res => (
      <ItemListEntry item={res} key={res.id} />
    ));
    return (
      <Item.Group divided className="bo-item-search">
        {entries}
      </Item.Group>
    );
  };

  renderEmptyResultsExtra = () => {
    return <NewButton text="Add item" to={BackOfficeRoutes.itemCreate} />;
  };

  render() {
    return (
      <>
        <Header as="h2">Physical copies</Header>
        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <Container fluid className="spaced">
            <SearchBar renderElement={this.renderSearchBar} />
          </Container>

          <Container fluid className="bo-search-body">
            <Grid>
              <Grid.Row columns={2}>
                <ResultsLoader>
                  <Grid.Column width={3} className="search-aggregations">
                    <Header content="Filter by" />
                    <SearchAggregationsCards modelName="items" />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Grid columns={2}>
                      <Grid.Column width={8}>
                        <NewButton
                          text="Add physical copy"
                          to={BackOfficeRoutes.itemCreate}
                        />
                      </Grid.Column>
                      <Grid.Column width={8} textAlign="right">
                        <ExportReactSearchKitResults
                          exportBaseUrl={itemApi.searchBaseURL}
                        />
                      </Grid.Column>
                    </Grid>
                    <SearchEmptyResults extras={this.renderEmptyResultsExtra} />
                    <Error renderElement={this.renderError} />
                    <SearchControls
                      modelName="items"
                      withLayoutSwitcher={false}
                    />
                    <ResultsList renderElement={this.renderItemList} />
                    <SearchFooter />
                  </Grid.Column>
                </ResultsLoader>
              </Grid.Row>
            </Grid>
          </Container>
        </ReactSearchKit>
      </>
    );
  }
}
