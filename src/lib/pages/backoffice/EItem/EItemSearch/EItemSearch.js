import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import EItemListEntry from './EItemListEntry';
import { OverridableContext } from 'react-overridable';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Container } from 'semantic-ui-react';
import {
  ReactSearchKit,
  SearchBar,
  ResultsList,
  ResultsLoader,
  EmptyResults,
  Error,
  InvenioSearchApi,
} from 'react-searchkit';
import { invenioConfig, setReactSearchKitInitialQueryState } from '@config';
import { eItemApi } from '@api/eitems';
import { responseRejectInterceptor } from '@api/base';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { BackOfficeRoutes } from '@routes/urls';
import history from '@history';

export class EItemSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: eItemApi.searchBaseURL,
      withCredentials: true,
    },
    interceptors: {
      response: { reject: responseRejectInterceptor },
    },
  });

  viewDetails = ({ row }) => {
    return (
      <Button
        as={Link}
        to={BackOfficeRoutes.eitemDetailsFor(row.metadata.pid)}
        compact
        icon="info"
        data-test={row.metadata.pid}
      />
    );
  };

  render() {
    const helperFields = [
      {
        name: 'title',
        field: 'document.title',
      },
      {
        name: 'author',
        field: 'authors.full_name',
        defaultValue: '"Doe, John"',
      },
      {
        name: 'created',
        field: '_created',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState('EITEMS');

    return (
      <>
        <Header as="h2">Electronic items</Header>
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
                  placeholder="Search for eitems..."
                  {...invenioConfig.APP.searchBarRSKProps}
                />
                <QueryBuildHelper fields={helperFields} />
              </Container>
              <Grid>
                <Grid.Row columns={2}>
                  <ResultsLoader>
                    <Grid.Column width={3} className="search-aggregations">
                      <Header content="Filter by" />
                      <SearchAggregationsCards modelName="EITEMS" />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <Grid columns={2}>
                        <Grid.Column width={8}>
                          <NewButton
                            text="Add electronic item"
                            to={BackOfficeRoutes.eitemCreate}
                          />
                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                          <ExportReactSearchKitResults
                            exportBaseUrl={eItemApi.searchBaseURL}
                          />
                        </Grid.Column>
                      </Grid>
                      <Error />
                      <SearchControls
                        modelName="EITEMS"
                        withLayoutSwitcher={false}
                      />
                      <EmptyResults
                        extraContent={
                          <NewButton
                            text="Add electronic item"
                            to={BackOfficeRoutes.eitemCreate}
                          />
                        }
                      />
                      <ResultsList ListEntryElement={EItemListEntry} />
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
