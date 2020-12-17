import { connect } from 'react-redux';
import RelationEditionComponent from './RelationEdition';

const mapStateToProps = (state) => ({
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationEdition = connect(
  mapStateToProps,
  null
)(RelationEditionComponent);
