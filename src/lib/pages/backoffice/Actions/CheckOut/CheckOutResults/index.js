import { connect } from 'react-redux';
import CheckOutResultsComponent from './CheckOutResults';
import { clearResults } from '../state/actions';

const mapDispatchToProps = dispatch => ({
  clearResults: () => dispatch(clearResults()),
});

const mapStateToProps = state => ({
  itemList: state.checkOut.itemList,
  patronList: state.checkOut.patronList,
  isLoading: state.checkOut.isLoading,
});

export const CheckOutResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutResultsComponent);
