import { recordToPidType } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { SearchBar } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { ItemsResultsList } from './ItemsResultsList';
import _isEmpty from 'lodash/isEmpty';

export default class ItemsSearch extends Component {
  constructor(props) {
    super(props);
    // this state is needed for the paste action,
    // because components gets updated via input change
    // but we need altered behaviour for the paste action
    // and in this way the state from before update is preserved
    // eslint-disable-next-line react/no-unused-state
    this.state = { prevSearchQuery: '', executedSearch: false };
  }

  componentWillUnmount = () => {
    const { clearResults } = this.props;
    clearResults();
  };

  executeSearch = queryString => {
    const { queryString: propsQueryString, fetchItems } = this.props;
    queryString = queryString || propsQueryString;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ prevSearchQuery: queryString, executedSearch: true });
    fetchItems(queryString);
  };

  onPasteHandler = async event => {
    const { checkoutItem, patronDetails } = this.props;
    const { prevSearchQuery } = this.state;
    let queryString = event.clipboardData.getData('Text');
    const sameQueryString = prevSearchQuery === queryString;

    if (queryString && !sameQueryString) {
      await this.executeSearch(queryString);
      const {
        items: { hits },
      } = this.props;

      const hasOneHit =
        !_isEmpty(hits) &&
        hits.length === 1 &&
        hits[0].metadata.status === 'CAN_CIRCULATE';

      if (hasOneHit) {
        const documentPid = hits[0].metadata.document.pid;
        const itemPid = {
          type: recordToPidType(hits[0]),
          value: hits[0].metadata.pid,
        };
        await checkoutItem(documentPid, itemPid, patronDetails.user_pid, true);
      }
      // eslint-disable-next-line react/no-unused-state
      this.setState({ prevSearchQuery: '', executedSearch: true });
    }
  };

  onKeyPressHandler = e => {
    const { queryString } = this.props;
    this.setState({ executedSearch: false });
    if (e.key === 'Enter' && queryString) {
      this.executeSearch();
    }
  };

  onSearchClickHandler = event => this.executeSearch();

  renderResultsList = results => {
    const { patronDetails, clearResults, isLoadingSearch } = this.props;
    const { executedSearch } = this.state;
    return (
      <ItemsResultsList
        patronPid={patronDetails.user_pid}
        clearResults={clearResults}
        results={results}
        isLoading={isLoadingSearch}
        executedSearch={executedSearch}
        clearSearchQuery={this.clearSearchQuery}
      />
    );
  };

  clearSearchQuery = () => {
    const { clearResults } = this.props;

    // eslint-disable-next-line react/no-unused-state
    this.setState({ prevSearchQuery: '' });
    clearResults();
  };

  render() {
    const {
      items,
      isLoading,
      error,
      queryString,
      updateQueryString,
    } = this.props;
    return (
      <>
        <Container className="spaced">
          <SearchBar
            action={{
              icon: 'search',
              onClick: this.onSearchClickHandler,
            }}
            currentQueryString={queryString}
            updateQueryOnChange
            executeSearch={this.executeSearch}
            onKeyPressHandler={this.onKeyPressHandler}
            updateQueryString={updateQueryString}
            placeholder="Type or paste to search for physical copies..."
            onPaste={e => this.onPasteHandler(e)}
          />
        </Container>
        <Grid columns={1} stackable relaxed>
          <Grid.Column width={16}>
            <Loader isLoading={isLoading}>
              <Error error={error}>
                {_isEmpty(queryString) && _isEmpty(items)
                  ? null
                  : this.renderResultsList(items)}
              </Error>
            </Loader>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

ItemsSearch.propTypes = {
  checkoutItem: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  error: PropTypes.object,
  fetchItems: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isLoadingSearch: PropTypes.bool,
  items: PropTypes.object,
  patronDetails: PropTypes.object.isRequired,
  queryString: PropTypes.string.isRequired,
  updateQueryString: PropTypes.func.isRequired,
};

ItemsSearch.defaultProps = {
  error: null,
  isLoading: false,
  isLoadingSearch: false,
  items: null,
};
