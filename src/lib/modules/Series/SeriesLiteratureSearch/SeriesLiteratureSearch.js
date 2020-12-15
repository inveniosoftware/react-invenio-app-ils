import { literatureApi } from '@api/literature';
import { Media } from '@components/Media';
import {
  invenioConfig,
  setReactSearchKitInitialQueryState,
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitUrlHandler,
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
import { Container, Divider, Loader } from 'semantic-ui-react';
import { qsBuilderForSeries } from './RequestSerializer';
import { SeriesLiteratureSearchMobile } from './SeriesLiteratureSearchMobile';

export class SeriesLiteratureSearch extends React.Component {
  modelName = 'LITERATURE';

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

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString = setReactSearchKitDefaultSortingOnEmptyQueryString(
      this.modelName
    );
    const urlHandler = setReactSearchKitUrlHandler(this.modelName, false);
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
            urlHandlerApi={urlHandler}
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
              <Media greaterThanOrEqual="tablet">
                <ResultsLoader renderElement={this.renderLoader}>
                  <EmptyResults />

                  <Error />

                  <Media greaterThanOrEqual="tablet">
                    <SearchControls modelName={this.modelName} />
                    <ResultsMultiLayout />
                  </Media>
                  <Media lessThan="computer">
                    <SearchControlsMobile modelName={this.modelName} />
                  </Media>
                  <SearchFooter />
                </ResultsLoader>
              </Media>
              <Media lessThan="tablet">
                <SeriesLiteratureSearchMobile metadata={metadata} />
              </Media>
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
