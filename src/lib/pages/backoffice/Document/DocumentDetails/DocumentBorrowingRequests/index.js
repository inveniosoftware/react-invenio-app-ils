import { connect } from 'react-redux';

import DocumentBorrowingRequestsComponent from './DocumentBorrowingRequests';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetails.data,
});

export const DocumentBorrowingRequests = connect(
  mapStateToProps,
  null
)(DocumentBorrowingRequestsComponent);
