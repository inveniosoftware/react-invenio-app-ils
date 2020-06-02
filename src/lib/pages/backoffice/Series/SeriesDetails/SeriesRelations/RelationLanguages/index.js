import { connect } from 'react-redux';
import RelationLanguagesComponent from './RelationLanguages';

const mapStateToProps = state => ({
  seriesDetails: state.seriesDetails.data,
  error: state.recordRelations.error,
  isLoading: state.recordRelations.isLoading,
  relations: state.recordRelations.data,
});

export const RelationLanguages = connect(
  mapStateToProps,
  null
)(RelationLanguagesComponent);
