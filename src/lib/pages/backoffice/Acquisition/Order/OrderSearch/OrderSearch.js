import { orderApi } from '@api/acquisition';
import { getSearchTotal } from '@api/utils';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import {
  invenioConfig,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitInitialQueryState,
  setReactSearchKitUrlHandler,
} from '@config';
import history from '@history';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { OrderListEntry } from '@pages/backoffice/Acquisition/Order/OrderSearch/OrderList';
import { AcquisitionRoutes } from '@routes/urls';
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

class OrderResponseSerializer {
  serialize(results) {
    const hits = results.hits.hits.map((hit) =>
      orderApi.serializer.fromJSON(hit)
    );
    return {
      aggregations: results.aggregations || {},
      hits: hits,
      total: getSearchTotal(results.hits),
    };
  }
}

export class OrderSearch extends Component {
  modelName = 'ACQ_ORDERS';

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
        name: 'provider',
        field: 'provider.name',
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

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString = setReactSearchKitDefaultSortingOnEmptyQueryString(
      this.modelName
    );
    const urlHandler = setReactSearchKitUrlHandler(this.modelName);
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
            urlHandlerApi={urlHandler}
            initialQueryState={initialState}
            defaultSortingOnEmptyQueryString={defaultSortingOnEmptyQueryString}
          >
            <>
              <Container fluid className="spaced">
                <SearchBar
                  placeholder="Search for orders..."
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Container fluid className="bo-search-body">
                <Grid>
                  <Grid.Row columns={2}>
                    <ResultsLoader>
                      <Grid.Column width={3} className="search-aggregations">
                        <Header content="Filter by" />
                        <SearchAggregationsCards modelName={this.modelName} />
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
                          modelName={this.modelName}
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
