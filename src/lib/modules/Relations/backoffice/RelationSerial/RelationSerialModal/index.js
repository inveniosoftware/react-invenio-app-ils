import { connect } from 'react-redux';

import RelationSerialModalComponent from './RelationSerialModal';

const mapStateToProps = state => ({
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationSerialModal = connect(
  mapStateToProps,
  null
)(RelationSerialModalComponent);
