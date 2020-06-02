import { acqOrderApi } from '@api/acquisition';
import { Error as IlsError } from '@components/Error';
import { SearchBar as OrdersSearchBar } from '@components/SearchBar';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import history from '@history';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { AcquisitionRoutes } from '@routes/urls';
import React, { Component } from 'react';
import {
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsList,
  ResultsLoader,
  SearchBar,
} from 'react-searchkit';
import { Container, Grid, Header } from 'semantic-ui-react';
import { OrderList } from './OrderList';

class OrderResponseSerializer {
  serialize(results) {
    const hits = results.hits.hits.map(hit =>
      acqOrderApi.serializer.fromJSON(hit)
    );
    return {
      aggregations: results.aggregations || {},
      hits: hits,
      total: results.hits.total,
    };
  }
}

export class OrderSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: acqOrderApi.searchBaseURL,
      withCredentials: true,
    },
    invenio: {
      responseSerializer: OrderResponseSerializer,
    },
  });

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    const helperFields = [
      {
        name: 'vendor',
        field: 'vendor.name',
        defaultValue: '"Dolor"',
      },
      {
        name: 'recipient',
        field: 'order_lines.recipient',
        defaultValue: 'PATRON',
      },
      {
        name: 'patron id',
        field: 'order_lines.patron_pid',
        defaultValue: '1',
      },
    ];
    return (
      <OrdersSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for orders"
        queryHelperFields={helperFields}
      />
    );
  };

  renderEmptyResultsExtra = () => {
    return <NewButton text="Add order" to={AcquisitionRoutes.orderCreate} />;
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderOrderList = results => {
    return <OrderList hits={results} />;
  };

  render() {
    return (
      <>
        <Header as="h2">Purchase Orders</Header>
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
                    <SearchAggregationsCards modelName="acqOrders" />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Grid columns={2}>
                      <Grid.Column width={8}>
                        <NewButton
                          text="Add order"
                          to={AcquisitionRoutes.orderCreate}
                        />
                      </Grid.Column>
                      <Grid.Column width={8} textAlign="right">
                        <ExportReactSearchKitResults
                          exportBaseUrl={acqOrderApi.searchBaseURL}
                        />
                      </Grid.Column>
                    </Grid>
                    <SearchEmptyResults extras={this.renderEmptyResultsExtra} />
                    <Error renderElement={this.renderError} />
                    <SearchControls
                      modelName="acqOrders"
                      withLayoutSwitcher={false}
                    />
                    <ResultsList renderElement={this.renderOrderList} />
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
