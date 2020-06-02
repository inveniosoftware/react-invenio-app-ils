import { connect } from 'react-redux';

import RelationSequenceComponent from './RelationSequence';

const mapStateToProps = state => ({
  seriesDetails: state.seriesDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationSequence = connect(
  mapStateToProps,
  null
)(RelationSequenceComponent);
