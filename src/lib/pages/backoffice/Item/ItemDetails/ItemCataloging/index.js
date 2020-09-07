import { connect } from 'react-redux';

import ItemCatalogingComponent from './ItemCataloging';

const mapStateToProps = state => ({
  isLoading: state.itemDetails.isLoading,
  error: state.itemDetails.error,
  itemDetails: state.itemDetails.data,
});

export const ItemCataloging = connect(
  mapStateToProps,
  null
)(ItemCatalogingComponent);
