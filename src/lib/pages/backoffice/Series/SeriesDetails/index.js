import { connect } from 'react-redux';
import { fetchSeriesDetails, clearSeriesDetails } from './state/actions';
import SeriesDetailsComponent from './SeriesDetails';

const mapStateToProps = (state) => ({
  isLoading: state.seriesDetails.isLoading,
  error: state.seriesDetails.error,
  data: state.seriesDetails.data,
  relations: state.seriesRelations.data,
  documentsInSeries: state.seriesDocuments.data,
  multipartMonographsInSeries: state.seriesMultipartMonographs.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSeriesDetails: (seriesPid) => dispatch(fetchSeriesDetails(seriesPid)),
  clearSeriesDetails: () => dispatch(clearSeriesDetails()),
});

export const SeriesDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesDetailsComponent);
