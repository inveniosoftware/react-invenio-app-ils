import { connect } from 'react-redux';
import DocumentCirculationComponent from './DocumentCirculation';
import { showTab } from '../actions';
import { getUserLoans } from './actions';

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.loansForUser.isLoading || ownProps.isLoading,
  loans: state.loansForUser.data,
  loanRequestIsLoading: state.loanRequestForm.isLoading,
});

const mapDispatchToProps = dispatch => ({
  showTab: activeIndex => dispatch(showTab(activeIndex)),
  fetchLoans: documentPid => dispatch(getUserLoans(documentPid)),
});

export const DocumentCirculation = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentCirculationComponent);
