import { recordToPidType } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { SearchBar } from '@components/SearchBar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
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
    this.state = { prevSearchQuery: '' };
  }

  onInputChange = queryString => {
    const { updateQueryString } = this.props;
    updateQueryString(queryString);
  };

  executeSearch = queryString => {
    const { queryString: propsQueryString, fetchItems } = this.props;
    queryString = queryString || propsQueryString;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ prevSearchQuery: queryString });
    return fetchItems(queryString);
  };

  onPasteHandler = async event => {
    const { checkoutItem, patronDetails } = this.props;
    let queryString = event.clipboardData.getData('Text');

    if (queryString) {
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
        checkoutItem(documentPid, itemPid, patronDetails.user_pid, true);
      }
      // eslint-disable-next-line react/no-unused-state
      this.setState({ prevSearchQuery: '' });
    }
  };

  onKeyPressHandler = e => {
    const { queryString } = this.props;
    if (e.key === 'Enter' && queryString) {
      this.executeSearch();
    }
  };

  onSearchClickHandler = event => this.executeSearch();

  renderResultsList = results => {
    const { patronDetails } = this.props;
    const { clearResults } = this.props;
    return (
      <div className="results-list">
        <ItemsResultsList
          patronPid={patronDetails.user_pid}
          clearResults={clearResults}
          results={results}
          clearSearchQuery={this.clearSearchQuery}
        />
      </div>
    );
  };

  clearSearchQuery = () => {
    const { clearResults } = this.props;

    // eslint-disable-next-line react/no-unused-state
    this.setState({ prevSearchQuery: '' });
    clearResults();
  };

  renderSearchPrompt = () => {
    return (
      <Segment placeholder textAlign="center">
        <Header icon>
          <Icon name="search" />
          No barcode provided.
        </Header>
        <div className="empty-results-current">
          Type or paste the barcode to search for items
        </div>
      </Segment>
    );
  };

  render() {
    const { items, isLoading, error, queryString } = this.props;
    return (
      <>
        <Container className="search-bar spaced">
          <SearchBar
            action={{
              icon: 'search',
              onClick: this.onSearchClickHandler,
            }}
            currentQueryString={queryString}
            onInputChange={this.onInputChange}
            executeSearch={this.executeSearch}
            placeholder="Type or paste to search for physical copies..."
            onPaste={e => {
              this.onPasteHandler(e);
            }}
          />
        </Container>
        <Grid columns={1} stackable relaxed className="items-search-container">
          <Grid.Column width={16}>
            <Loader isLoading={isLoading}>
              <Error error={error}>
                {_isEmpty(queryString) && _isEmpty(items)
                  ? this.renderSearchPrompt()
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
  updateQueryString: PropTypes.func.isRequired,
  queryString: PropTypes.string.isRequired,
  items: PropTypes.object,
  fetchItems: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  checkoutItem: PropTypes.func.isRequired,
  patronDetails: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

ItemsSearch.defaultProps = {
  items: null,
  isLoading: false,
  error: null,
};
