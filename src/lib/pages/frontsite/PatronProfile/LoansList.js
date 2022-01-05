import { PatronPagination } from './PatronPagination';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

export default class LoansList extends Component {
  render() {
    const {
      loans,
      renderListEntry,
      noLoansCmp,
      patronShowLink,
      onPageChange,
      activePage,
      rowsPerPage,
      isLoading,
    } = this.props;

    return loans.total > 0 ? (
      <>
        <PatronPagination
          currentPage={activePage}
          currentSize={rowsPerPage}
          loading={isLoading}
          onPageChange={onPageChange}
          items={loans}
        />
        {patronShowLink}
        <Item.Group divided>
          {loans.hits.map((loan) => (
            <React.Fragment key={loan.metadata.pid}>
              {renderListEntry(loan)}
            </React.Fragment>
          ))}
        </Item.Group>
        <PatronPagination
          currentPage={activePage}
          currentSize={rowsPerPage}
          loading={isLoading}
          onPageChange={onPageChange}
          items={loans}
        />
      </>
    ) : (
      noLoansCmp
    );
  }
}

LoansList.propTypes = {
  activePage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loans: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  renderListEntry: PropTypes.func.isRequired,
  noLoansCmp: PropTypes.element.isRequired,
  patronShowLink: PropTypes.element,
};

LoansList.defaultProps = {
  patronShowLink: null,
};
