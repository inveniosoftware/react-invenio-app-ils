import { connect } from 'react-redux';

import DocumentPurchaseOrdersComponent from './DocumentPurchaseOrders';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetails.data,
});


export const DocumentPurchaseOrders = connect(
  mapStateToProps,
  null
)(DocumentPurchaseOrdersComponent);
