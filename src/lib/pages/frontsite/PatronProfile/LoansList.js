import { Pagination } from '@components/Pagination';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Item } from 'semantic-ui-react';

export default class LoansList extends Component {
  render() {
    const {
      activePage,
      isLoading,
      onPageChange,
      loans,
      rowsPerPage,
      renderListEntry,
      noLoansCmp,
    } = this.props;
    return loans.total > 0 ? (
      <>
        <Item.Group divided>
          {loans.hits.map((loan) => (
            <React.Fragment key={loan.metadata.pid}>
              {renderListEntry(loan)}
            </React.Fragment>
          ))}
        </Item.Group>
        <Container textAlign="center">
          <Pagination
            currentPage={activePage}
            currentSize={rowsPerPage}
            loading={isLoading}
            onPageChange={onPageChange}
            totalResults={loans.total}
          />
        </Container>
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
};
