import { connect } from 'react-redux';
import CheckedInItemsComponent from './CheckedInItems';
import { clearResults } from '../ItemsSearch/state/actions';

const mapDispatchToProps = dispatch => ({
  clearResults: () => dispatch(clearResults()),
});

const mapStateToProps = state => ({
  items: state.itemsCheckIn.items,
});

export const CheckedInItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckedInItemsComponent);
