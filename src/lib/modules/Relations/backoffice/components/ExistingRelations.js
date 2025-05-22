import { Pagination } from '@components/Pagination';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ExistingRelations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  onPageChange = (page) => {
    this.setState({ activePage: page });
  };

  render() {
    const { rows, showMaxRows, columns, emptyMessage } = this.props;
    const { activePage } = this.state;

    return (
      <ResultsTable
        data={rows}
        columns={columns}
        totalHitsCount={rows.length}
        showMaxRows={showMaxRows}
        currentPage={activePage}
        renderEmptyResultsElement={() => emptyMessage}
        paginationComponent={
          <Pagination
            currentPage={activePage}
            currentSize={showMaxRows}
            totalResults={rows.length}
            onPageChange={this.onPageChange}
          />
        }
      />
    );
  }
}

ExistingRelations.propTypes = {
  rows: PropTypes.array.isRequired,
  showMaxRows: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  emptyMessage: PropTypes.object.isRequired,
};
