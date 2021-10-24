import { connect } from 'react-redux';
import PatronBulkExtendLoansComponent from './PatronBulkExtendLoans';
import { bulkLoanExtension } from './actions';

const mapStateToProps = (state) => ({
  isLoading: state.bulkLoanExtend.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  bulkLoanExtension: (patronPid) => dispatch(bulkLoanExtension(patronPid)),
});

export const PatronBulkExtendLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronBulkExtendLoansComponent);
