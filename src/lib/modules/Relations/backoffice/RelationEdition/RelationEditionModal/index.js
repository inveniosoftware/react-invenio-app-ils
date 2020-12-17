import { connect } from 'react-redux';
import RelationEditionModalComponent from './RelationEditionModal';

const mapStateToProps = (state) => ({
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationEditionModal = connect(
  mapStateToProps,
  null
)(RelationEditionModalComponent);
