import { connect } from 'react-redux';
import RelationOtherComponent from './RelationOther';

const mapStateToProps = (state) => ({
  documentDetails: state.documentDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationOther = connect(
  mapStateToProps,
  null
)(RelationOtherComponent);
