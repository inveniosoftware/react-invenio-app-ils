import { connect } from 'react-redux';
import PatronDetailsComponent from './PatronDetails';
import { fetchPatronDetails, clearPatronDetails } from './state/actions';

const mapStateToProps = (state) => ({
  isLoading: state.patronDetails.isLoading,
  error: state.patronDetails.error,
  hasError: state.patronDetails.hasError,
  data: state.patronDetails.data,
  currentLoans: state.patronCurrentLoans.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPatronDetails: (patronPid) => dispatch(fetchPatronDetails(patronPid)),
  clearPatronDetails: () => dispatch(clearPatronDetails()),
});

export const PatronDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronDetailsComponent);
