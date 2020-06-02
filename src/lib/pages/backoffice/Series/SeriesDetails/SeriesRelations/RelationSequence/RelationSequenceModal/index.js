import { connect } from 'react-redux';

import RelationSequenceModalComponent from './RelationSequenceModal';

const mapStateToProps = state => ({
  seriesDetails: state.seriesDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationSequenceModal = connect(
  mapStateToProps,
  null
)(RelationSequenceModalComponent);
