import React, { Component } from 'react';
import { ResultsPerPage } from 'react-searchkit';
import { getSearchConfig } from '@config';
import PropTypes from 'prop-types';

export default class SearchResultsPerPage extends Component {
  render() {
    const { modelName } = this.props;
    const searchConfig = getSearchConfig(modelName);
    return (
      <ResultsPerPage
        values={searchConfig.RESULTS_PER_PAGE}
        defaultValue={searchConfig.RESULTS_PER_PAGE[0].value}
        label={cmp => <> Show {cmp} results per page</>}
      />
    );
  }
}

SearchResultsPerPage.propTypes = {
  modelName: PropTypes.string.isRequired,
};
