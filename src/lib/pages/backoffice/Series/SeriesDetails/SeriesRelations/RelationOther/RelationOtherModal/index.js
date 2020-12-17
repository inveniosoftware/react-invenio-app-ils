import { connect } from 'react-redux';

import RelationOtherModalComponent from './RelationOtherModal';

const mapStateToProps = (state) => ({
  seriesDetails: state.seriesDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationOtherModal = connect(
  mapStateToProps,
  null
)(RelationOtherModalComponent);
