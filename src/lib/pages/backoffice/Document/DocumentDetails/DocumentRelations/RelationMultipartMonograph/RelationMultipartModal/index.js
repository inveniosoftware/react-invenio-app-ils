import { connect } from 'react-redux';
import RelationMultipartModalComponent from './RelationMultipartModal';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationMultipartModal = connect(
  mapStateToProps,
  null
)(RelationMultipartModalComponent);
