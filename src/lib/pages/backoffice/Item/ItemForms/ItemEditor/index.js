import { connect } from 'react-redux';

import { fetchPastLoans } from '../../ItemDetails/ItemPastLoans/state/actions';
import ItemEditorComponent from './ItemEditor';

const mapStateToProps = (state) => ({
  itemPastLoans: state.itemPastLoans.data.total,
  isLoadingPastLoans: state.itemPastLoans.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPastLoans: (itemPid) => dispatch(fetchPastLoans(itemPid)),
});

export const ItemEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemEditorComponent);
