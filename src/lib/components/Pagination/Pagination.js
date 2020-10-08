import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Pagination as Paginator } from 'semantic-ui-react';

class Pagination extends Component {
  render() {
    const {
      totalResults,
      currentPage,
      currentSize = invenioConfig.APP.defaultResultsSize,
      onPageChange,
      loading,
      simple,
      firstItem,
      lastItem,
      totalPages: _,
      ...extraParams
    } = this.props;
    // Maximum number of pages allowed (backend window limitation)
    const maximumWindowPages = Math.floor(
      invenioConfig.APP.MAX_RESULTS_WINDOW / currentSize
    );
    // Theoretical number of pages for this search result
    const totalPages = Math.ceil(totalResults / currentSize);
    // Actual number of pages displayed
    const totalDisplayedPages = Math.min(totalPages, maximumWindowPages);
    return (
      !loading && (
        <div className="pagination">
          <Paginator
            activePage={currentPage}
            totalPages={totalDisplayedPages}
            firstItem={simple ? null : firstItem}
            lastItem={simple ? null : lastItem}
            onPageChange={(event, { activePage }) => onPageChange(activePage)}
            {...extraParams}
          />
        </div>
      )
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  simple: PropTypes.bool,
  firstItem: PropTypes.any,
  lastItem: PropTypes.any,
};

Pagination.defaultProps = {
  simple: false,
};

export default Overridable.component('Pagination', Pagination);
