import { orderApi } from '@api/acquisition';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import history from '@history';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { AcquisitionRoutes } from '@routes/urls';
import { OrderListEntry } from '@pages/backoffice/Acquisition/Order/OrderSearch/OrderList';
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

class OrderResponseSerializer {
  serialize(results) {
    const hits = results.hits.hits.map(hit =>
      orderApi.serializer.fromJSON(hit)
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
      url: orderApi.searchBaseURL,
      withCredentials: true,
    },
    invenio: {
      responseSerializer: OrderResponseSerializer,
    },
  });

  render() {
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

    const initialState = setReactSearchKitInitialQueryState('ACQ_ORDERS');

    return (
      <>
        <Header as="h2">Purchase Orders</Header>
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
                  placeholder="Search for orders..."
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
                        <SearchAggregationsCards modelName="ACQ_ORDERS" />
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
                              exportBaseUrl={orderApi.searchBaseURL}
                            />
                          </Grid.Column>
                        </Grid>
                        <EmptyResults
                          extraContent={
                            <NewButton
                              text="Add order"
                              to={AcquisitionRoutes.orderCreate}
                            />
                          }
                        />
                        <Error />
                        <SearchControls
                          modelName="ACQ_ORDERS"
                          withLayoutSwitcher={false}
                        />
                        <ResultsList ListEntryElement={OrderListEntry} />
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
