import { connect } from 'react-redux';

import { fetchLocationDetails, deleteLocation } from './state/actions';
import LocationDetailsComponent from './LocationDetails';

const mapStateToProps = state => ({
  data: state.LocationDetails.data,
  isLoading: state.LocationDetails.isLoading,
  error: state.LocationDetails.error,
  hasError: state.LocationDetails.hasError,
});

const mapDispatchToProps = dispatch => ({
  fetchLocationDetails: LocationPid =>
    dispatch(fetchLocationDetails(LocationPid)),
  deleteLocation: locationPid => dispatch(deleteLocation(locationPid)),
});

export const LocationDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailsComponent);
