import { literatureApi } from '@api/literature';
import {
  invenioConfig,
  setReactSearchKitInitialQueryState,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
} from '@config';
import history from '@history';
import { LiteratureSearchOverridesMap } from '@modules/Literature/LiteratureSearchOverrides';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsMobile } from '@modules/SearchControls/SearchControlsMobile';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import PropTypes from 'prop-types';
import React from 'react';
import { OverridableContext } from 'react-overridable';
import {
  EmptyResults,
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsLoader,
  ResultsMultiLayout,
  SearchBar,
} from 'react-searchkit';
import { Container, Divider, Loader, Responsive } from 'semantic-ui-react';
import { qsBuilderForSeries } from './RequestSerializer';
import { SeriesLiteratureSearchMobile } from './SeriesLiteratureSearchMobile';

export class SeriesLiteratureSearch extends React.Component {
  renderLoader = () => {
    return (
      <Loader active size="huge" inline="centered" className="full-height" />
    );
  };

  render() {
    const { metadata } = this.props;
    const api = new InvenioSearchApi({
      axios: {
        url: literatureApi.searchBaseURL,
        withCredentials: true,
      },
      invenio: {
        requestSerializer: qsBuilderForSeries(metadata),
      },
    });

    const initialState = setReactSearchKitInitialQueryState('LITERATURE');
    const defaultSortingOnEmptyQueryString = setReactSearchKitDefaultSortingOnEmptyQueryString(
      'LITERATURE'
    );
    return (
      <>
        <Divider horizontal>
          Literature in this {metadata.mode_of_issuance.toUpperCase()}
        </Divider>
        <OverridableContext.Provider
          value={{
            ...SearchControlsOverridesMap,
            ...LiteratureSearchOverridesMap,
          }}
        >
          <ReactSearchKit
            searchApi={api}
            history={history}
            urlHandlerApi={{ enabled: false }}
            initialQueryState={initialState}
            defaultSortingOnEmptyQueryString={defaultSortingOnEmptyQueryString}
          >
            <>
              <Container className="series-details-search-container">
                <SearchBar
                  placeholder="Search for volumes or issues..."
                  {...invenioConfig.APP.SEARCH_BAR_PROPS}
                />
              </Container>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <ResultsLoader renderElement={this.renderLoader}>
                  <EmptyResults />

                  <Error />

                  <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                    <SearchControls modelName="LITERATURE" />
                    <ResultsMultiLayout />
                  </Responsive>
                  <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                    <SearchControlsMobile modelName="LITERATURE" />
                  </Responsive>
                  <SearchFooter />
                </ResultsLoader>
              </Responsive>
              <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                <SeriesLiteratureSearchMobile metadata={metadata} />
              </Responsive>
            </>
          </ReactSearchKit>
        </OverridableContext.Provider>
      </>
    );
  }
}

SeriesLiteratureSearch.propTypes = {
  metadata: PropTypes.object.isRequired,
};
