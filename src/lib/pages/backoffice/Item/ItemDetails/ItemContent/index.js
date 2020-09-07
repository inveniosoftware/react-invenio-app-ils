import { connect } from 'react-redux';

import ItemContentComponent from './ItemContent';

const mapStateToProps = state => ({
  isLoading: state.itemDetails.isLoading,
  error: state.itemDetails.error,
  itemDetails: state.itemDetails.data,
});

export const ItemContent = connect(mapStateToProps, null)(ItemContentComponent);
