import React, { Component } from 'react';
import SearchAggregationsCards from '@modules/SearchControls/SearchAggregationsCards';
import { Header } from 'semantic-ui-react';
import { withState } from 'react-searchkit';
import PropTypes from 'prop-types';

class SearchAggregation extends Component {
  render() {
    const { currentResultsState, modelName } = this.props;
    const totalResults = currentResultsState.data.total;

    if (totalResults != 0) {
      return (
        <>
          <Header content="Filter by" />
          <SearchAggregationsCards modelName={modelName} />
        </>
      );
    } else {
      return null;
    }
  }
}

SearchAggregation.propTypes = {
  currentResultsState: PropTypes.object.isRequired,
  modelName: PropTypes.string.isRequired,
};

export default withState(SearchAggregation);
