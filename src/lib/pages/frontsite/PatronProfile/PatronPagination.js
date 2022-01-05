import React from 'react';
import { Pagination } from '@components/Pagination';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

export const PatronPagination = ({
  currentPage,
  currentSize,
  loading,
  onPageChange,
  items,
}) => {
  const allHits = items.total === items.hits.length ? true : false;
  return (
    !allHits && (
      <Container textAlign="center">
        <Pagination
          currentPage={currentPage}
          currentSize={currentSize}
          loading={loading}
          onPageChange={onPageChange}
          totalResults={items.total}
        />
      </Container>
    )
  );
};

PatronPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentSize: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  items: PropTypes.object.isRequired,
};

PatronPagination.defaultProps = {
  currentSize: 5,
  loading: false,
};
