import { literatureApi } from '@api/literature';
import { Error as IlsError } from '@components/Error';
import { SearchBar as LiteratureSearchBar } from '@components/SearchBar';
import { SearchControls } from '@modules/SearchControls';
import { SearchEmptyResults } from '@modules/SearchEmptyResults';
import { SearchFooter } from '@modules/SearchFooter';
import { SearchControlsMobile } from '@modules/SearchControlsMobile';
import history from '@history';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
  ResultsMultiLayout,
} from 'react-searchkit';
import { Container, Divider, Loader, Responsive } from 'semantic-ui-react';
import { qsBuilderForSeries } from './RequestSerializer';
import { LiteratureSearchResultsList } from '@modules/Literature/LiteratureSearchResultsList';
import { LiteratureSearchResultsGrid } from '@modules/Literature/LiteratureSearchResultsGrid';
import { SeriesLiteratureSearchMobile } from './SeriesLiteratureSearchMobile';

export class SeriesLiteratureSearch extends React.Component {
  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    return (
      <LiteratureSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for volumes or issues..."
      />
    );
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

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
    return (
      <>
        <Divider horizontal>
          Literature in this {metadata.mode_of_issuance.toUpperCase()}
        </Divider>
        <ReactSearchKit
          searchApi={api}
          history={history}
          urlHandlerApi={{ enabled: false }}
        >
          <Container className="series-details-search-container">
            <SearchBar renderElement={this.renderSearchBar} />
          </Container>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <ResultsLoader renderElement={this.renderLoader}>
              <SearchEmptyResults />

              <Error renderElement={this.renderError} />

              <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                <SearchControls modelName="literature" />
                <ResultsMultiLayout
                  resultsListCmp={() => <LiteratureSearchResultsList />}
                  resultsGridCmp={() => <LiteratureSearchResultsGrid />}
                />
              </Responsive>
              <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                <SearchControlsMobile modelName="literature" />
              </Responsive>
              <SearchFooter />
            </ResultsLoader>
          </Responsive>
          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <SeriesLiteratureSearchMobile metadata={metadata} />
          </Responsive>
        </ReactSearchKit>
      </>
    );
  }
}

SeriesLiteratureSearch.propTypes = {
  metadata: PropTypes.object.isRequired,
};
