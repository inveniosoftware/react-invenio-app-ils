import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { SearchBarILS } from '@components/SearchBar';
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

  executeSearch = async (queryString, patronPid) => {
    const {
      queryString: propsQueryString,
      patronDetails,
      fetchAndCheckoutIfOne,
    } = this.props;
    queryString = queryString || propsQueryString;
    patronPid = patronPid || patronDetails.user_pid;

    // eslint-disable-next-line react/no-unused-state
    this.setState({ prevSearchQuery: queryString, executedSearch: true }, () =>
      fetchAndCheckoutIfOne(queryString, patronPid)
    );
  };

  onPasteHandler = async (event) => {
    const { prevSearchQuery } = this.state;
    const { patronDetails } = this.props;

    // Disable enter key
    event.preventDefault();

    let queryString = event.clipboardData.getData('Text');

    const sameQueryString = prevSearchQuery === queryString;

    if (queryString && !sameQueryString) {
      await this.executeSearch(queryString, patronDetails.user_pid);

      // eslint-disable-next-line react/no-unused-state
      this.setState({ prevSearchQuery: '', executedSearch: true });
    }
  };

  renderResultsList = (results) => {
    const { patronDetails, clearResults, isLoadingSearch } = this.props;
    const { executedSearch } = this.state;
    return (
      <ItemsResultsList
        patronPid={patronDetails.user_pid}
        clearResults={clearResults}
        results={results}
        isLoading={isLoadingSearch}
        executedSearch={executedSearch}
      />
    );
  };

  render() {
    const { items, isLoading, error, queryString } = this.props;
    return (
      <>
        <Container className="spaced">
          <SearchBarILS
            onSearchHandler={this.executeSearch}
            placeholder="Type or paste to search for physical copies..."
            onPasteHandler={this.onPasteHandler}
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
  fetchAndCheckoutIfOne: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  isLoadingSearch: PropTypes.bool,
  items: PropTypes.object,
  patronDetails: PropTypes.object.isRequired,
  queryString: PropTypes.string.isRequired,
};

ItemsSearch.defaultProps = {
  error: null,
  isLoading: false,
  isLoadingSearch: false,
  items: null,
};
