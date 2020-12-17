import { connect } from 'react-redux';
import RelationMultipartComponent from './RelationMultipart';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationMultipart = connect(
  mapStateToProps,
  null
)(RelationMultipartComponent);
