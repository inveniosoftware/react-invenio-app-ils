import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import { Pagination as Paginator } from 'semantic-ui-react';
import { invenioConfig } from '@config';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.showFirstAndLastNav = false;
  }

  render() {
    const { totalResults, currentPage, currentSize, onPageChange } = this.props;
    const pages = Math.ceil(totalResults / currentSize);
    return (
      <div id="pagination">
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

Pagination.defaultProps = {
  currentSize: invenioConfig.defaultResultsSize,
};

export default Overridable.component('Pagination', Pagination);
