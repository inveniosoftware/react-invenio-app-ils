import { connect } from 'react-redux';
import ItemsSearchComponent from './ItemsSearch';
import { checkin, updateQueryString, clearSearchBar } from './state/actions';

const mapDispatchToProps = dispatch => ({
  checkin: barcode => dispatch(checkin(barcode)),
  updateQueryString: qs => dispatch(updateQueryString(qs)),
  clearSearchBar: () => dispatch(clearSearchBar()),
});

const mapStateToProps = state => ({
  queryString: state.itemsCheckIn.itemCheckInQueryString,
  loans: state.itemsCheckIn.data,
});

export const ItemsSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsSearchComponent);
