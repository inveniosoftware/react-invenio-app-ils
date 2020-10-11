import { vendorApi } from '@api/acquisition';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import history from '@history';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { QueryBuildHelper } from '@components/SearchBar/QueryBuildHelper';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import { AcquisitionRoutes } from '@routes/urls';
import VendorListEntry from './VendorListEntry';
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
import { setReactSearchKitInitialQueryState } from '@config';
import { Container, Grid, Header } from 'semantic-ui-react';
import { invenioConfig } from '@config';

export class VendorSearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: vendorApi.searchBaseURL,
      withCredentials: true,
    },
  });

  render() {
    const helperFields = [
      {
        name: 'name',
        field: 'name',
        defaultValue: '"Vendor Name"',
      },
      {
        name: 'email',
        field: 'email',
        defaultValue: '"info@vendor.com"',
      },
      {
        name: 'address',
        field: 'address',
        defaultValue: '"Vendor Address"',
      },
    ];

    const initialState = setReactSearchKitInitialQueryState('ACQ_VENDORS');

    return (
      <>
        <Header as="h2">Vendors</Header>
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
                  placeholder="Search for vendors..."
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
                              text="Add vendor"
                              to={AcquisitionRoutes.vendorCreate}
                            />
                          </Grid.Column>
                          <Grid.Column width={8} textAlign="right">
                            <ExportReactSearchKitResults
                              exportBaseUrl={vendorApi.searchBaseURL}
                            />
                          </Grid.Column>
                        </Grid>
                        <EmptyResults
                          extraContent={
                            <NewButton
                              text="Add vendor"
                              to={AcquisitionRoutes.vendorCreate}
                            />
                          }
                        />
                        <Error />
                        <SearchControls
                          modelName="ACQ_VENDORS"
                          withLayoutSwitcher={false}
                        />
                        <ResultsList
                          overridableId="VendorSearch"
                          ListEntryElement={VendorListEntry}
                        />
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
