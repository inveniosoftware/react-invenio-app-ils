import { connect } from 'react-redux';
import { deleteSeries } from '../state/actions';
import SeriesActionMenuComponent from './SeriesActionMenu';

const mapStateToProps = (state) => ({
  isLoading: state.seriesDetails.isLoading,
  error: state.seriesDetails.error,
  data: state.seriesDetails.data,
  relations: state.seriesRelations.data,
  documentsInSeries: state.seriesDocuments.data,
  multipartMonographsInSeries: state.seriesMultipartMonographs.data,
});

const mapDeleteDispatch = (dispatch) => ({
  deleteSeries: (seriesPid) => dispatch(deleteSeries(seriesPid)),
});

export const SeriesActionMenu = connect(
  mapStateToProps,
  mapDeleteDispatch
)(SeriesActionMenuComponent);
