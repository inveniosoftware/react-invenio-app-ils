import { connect } from 'react-redux';

import {
  clearItemDetails,
  deleteItem,
  fetchItemDetails,
} from './state/actions';
import ItemDetailsComponent from './ItemDetails';

const mapStateToProps = (state) => ({
  isLoading: state.itemDetails.isLoading,
  error: state.itemDetails.error,
  data: state.itemDetails.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemDetails: (itemPid) => dispatch(fetchItemDetails(itemPid)),
  deleteItem: (itemPid) => dispatch(deleteItem(itemPid)),
  clearItemDetails: () => dispatch(clearItemDetails()),
});

export const ItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailsComponent);
