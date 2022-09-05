import { literatureApi } from '@api/literature';
import { Media } from '@components/Media';
import {
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitInitialQueryState,
  setReactSearchKitUrlHandler,
} from '@config';
import history from '@history';
import { LiteratureSearchOverridesMap } from '@modules/Literature/LiteratureSearchOverrides';
import { SearchControls } from '@modules/SearchControls/SearchControls';
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
  withState,
} from 'react-searchkit';
import { Container, Divider, Popup } from 'semantic-ui-react';
import { SearchBarOverridesMap } from '@components/SearchBar/SearchBarOverrides';
import { qsBuilderForSeries } from './RequestSerializer';
import { SeriesLiteratureSearchMobile } from './SeriesLiteratureSearchMobile';
import { SearchBarILS } from '@components/SearchBar';

export class SeriesLiteratureSearch extends React.Component {
  modelName = 'LITERATURE';

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
    const defaultSortingOnEmptyQueryString =
      setReactSearchKitDefaultSortingOnEmptyQueryString(this.modelName);
    const urlHandler = setReactSearchKitUrlHandler(this.modelName, false);
    return (
      <>
        <Divider horizontal>Volumes in this series</Divider>
        <OverridableContext.Provider
          value={{
            ...SearchControlsOverridesMap,
            ...LiteratureSearchOverridesMap,
            ...SearchBarOverridesMap,
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
                <SeriesDetailsSearch />
              </Container>
              <Media greaterThanOrEqual="computer">
                <ResultsLoader>
                  <EmptyResults />
                  <Error />
                  <SearchControls modelName={this.modelName} />
                  <ResultsMultiLayout />
                  <SearchFooter />
                </ResultsLoader>
              </Media>
              <Media lessThan="computer">
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

const SeriesDetailsSearch = withState(
  ({ updateQueryState, currentQueryState }) => {
    const onBtnSearchClick = (queryString) => {
      updateQueryState({ ...currentQueryState, queryString: queryString });
    };

    return (
      <Popup
        trigger={
          <SearchBarILS
            onSearchHandler={onBtnSearchClick}
            placeholder="Search for volumes or issues..."
            focusOnRender={false}
          />
        }
        content="You can search by volume using volume field (e.g., volume:1)"
        on="focus"
      />
    );
  }
);
