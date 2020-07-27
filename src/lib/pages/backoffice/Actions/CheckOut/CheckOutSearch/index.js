import { connect } from 'react-redux';
import CheckOutSearchComponent from './CheckOutSearch';
import {
  checkOutSearch,
  clearSearch,
  updateQueryString,
} from '../state/actions';

const mapDispatchToProps = dispatch => ({
  checkOutSearch: term => dispatch(checkOutSearch(term)),
  updateQueryString: qs => dispatch(updateQueryString(qs)),
  clearSearch: () => dispatch(clearSearch()),
});

const mapStateToProps = state => ({
  queryString: state.checkOut.queryString,
  item: state.checkOut.item,
  patron: state.checkOut.patron,
  isLoading: state.checkOut.isLoading,
  error: state.checkOut.error,
});

export const CheckOutSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutSearchComponent);
