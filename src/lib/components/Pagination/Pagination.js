import { invenioConfig } from '@config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Pagination as Paginator } from 'semantic-ui-react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.showFirstAndLastNav = false;
  }

  render() {
    const {
      totalResults,
      currentPage,
      onPageChange,
      currentSize = invenioConfig.APP.defaultResultsSize,
    } = this.props;
    const pages = Math.ceil(totalResults / currentSize);
    return (
      <div className="pagination">
        <Paginator
          firstItem={this.showFirstAndLastNav}
          lastItem={this.showFirstAndLastNav}
          activePage={currentPage}
          totalPages={pages}
          onPageChange={(event, { activePage }) => onPageChange(activePage)}
        />
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number,
  totalResults: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Overridable.component('Pagination', Pagination);
