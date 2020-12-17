import { connect } from 'react-redux';
import RelationOtherModalComponent from './RelationOtherModal';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationOtherModal = connect(
  mapStateToProps,
  null
)(RelationOtherModalComponent);
